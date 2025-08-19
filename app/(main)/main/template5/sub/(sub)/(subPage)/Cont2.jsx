"use client";
import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { WidgetContext } from "../../App";

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";

// Vercel 빌드 문제를 해결하기 위해 언어를 명시적으로 등록합니다.
SyntaxHighlighter.registerLanguage('markup', markup);

// 문제 해결 2: 중첩 테이블을 지원하도록 함수 수정
const cleanTableHtml = (htmlString) => {
    if (!htmlString) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // --- 1. 전역 클리닝: 허용되지 않은 태그와 속성을 먼저 정리합니다. ---
    const allowedTags = new Set(['table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'a']);
    const allowedAttributes = new Set(['rowspan', 'colspan', 'href']);

    const allElements = tempDiv.querySelectorAll('*');

    for (let i = allElements.length - 1; i >= 0; i--) {
        const el = allElements[i];
        const tagName = el.tagName.toLowerCase();

        if (!allowedTags.has(tagName)) {
            el.replaceWith(...el.childNodes);
            continue;
        }

        const attributes = Array.from(el.attributes);
        attributes.forEach(attr => {
            if (!allowedAttributes.has(attr.name.toLowerCase())) {
                el.removeAttribute(attr.name);
            }
        });
    }

    // --- 2. 테이블 구조화: 모든 테이블에 thead, th, caption을 적용합니다. ---
    const applyTableSemantics = (tableElement) => {
        if (tableElement.hasAttribute('data-processed')) return;

        // ==========================================================
        // ## 추가된 기능 ##
        // 현재 테이블이 다른 테이블의 셀(td, th) 안에 있는지 확인합니다.
        const parentCell = tableElement.closest('td, th');
        
        // 중첩된 테이블이고, 아직 div로 감싸여 있지 않다면 div로 감싸줍니다.
        if (parentCell && !tableElement.parentElement.classList.contains('tbl_st1')) {
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'tbl_st1';
            // wrapper를 테이블 앞에 삽입하고
            tableElement.parentNode.insertBefore(wrapperDiv, tableElement);
            // 테이블을 wrapper 안으로 이동시킵니다.
            wrapperDiv.appendChild(tableElement);
        }
        // ==========================================================
        
        const newThead = document.createElement('thead');
        const newTbody = document.createElement('tbody');
        const allRows = Array.from(tableElement.rows);
        
        let headerRowCount = 1;
        if (allRows.length > 0 && allRows[0].cells.length > 0) {
            const firstRowCells = Array.from(allRows[0].cells);
            const maxRowspan = Math.max(...firstRowCells.map(cell => parseInt(cell.getAttribute('rowspan')) || 1));
            headerRowCount = Math.min(maxRowspan, allRows.length);
        }

        allRows.forEach((row, index) => {
            if (index < headerRowCount) {
                row.querySelectorAll('td').forEach(td => {
                    const th = document.createElement('th');
                    th.innerHTML = td.innerHTML;
                    for (const attr of td.attributes) { th.setAttribute(attr.name, attr.value); }
                    td.replaceWith(th);
                });
                newThead.appendChild(row);
            } else {
                newTbody.appendChild(row);
            }
        });
        
        while (tableElement.firstChild) {
            tableElement.removeChild(tableElement.firstChild);
        }
        
        if (newThead.rows.length > 0) {
            const caption = document.createElement('caption');
            const headerTexts = Array.from(newThead.querySelectorAll('th')).map(th => th.textContent.trim());
            caption.textContent = `표: ${headerTexts.join(', ')}`;
            tableElement.appendChild(caption);
        }

        if (newThead.childNodes.length > 0) tableElement.appendChild(newThead);
        if (newTbody.childNodes.length > 0) tableElement.appendChild(newTbody);
        
        // tableElement.setAttribute('data-processed', 'true');
    };

    const allTables = Array.from(tempDiv.querySelectorAll('table'));
    allTables.reverse().forEach(table => applyTableSemantics(table));

    const sourceTable = tempDiv.querySelector('table');
    return sourceTable ? sourceTable.outerHTML : '';
};
const WysiwygTableEditor = ({ rawContent, onContentChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        // 외부에서 rawContent가 변경되었을 때(예: '내용 삭제' 버튼 클릭) 에디터 내용을 동기화
        if (editorRef.current && editorRef.current.innerHTML !== rawContent) {
            editorRef.current.innerHTML = rawContent;
        }
    }, [rawContent]);

    const handlePaste = useCallback((e) => {
        e.preventDefault();
        const pastedHtml = e.clipboardData.getData('text/html');
        if (pastedHtml && pastedHtml.includes('<table')) {
            const cleanedHtml = cleanTableHtml(pastedHtml);
            onContentChange(cleanedHtml);
        } else {
            const pastedText = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, pastedText);
        }
    }, [onContentChange]);

    const handleInput = useCallback((e) => {
        const newContent = e.currentTarget.innerHTML;
        onContentChange(newContent);
    }, [onContentChange]);

    return (
        <div
            ref={editorRef}
            contentEditable={true}
            onPaste={handlePaste}
            onInput={handleInput}
            className="tableArea mgt20 tbl_st1"
            style={{ width: "100%", minHeight: "5rem", maxHeight: "10rem", overflowY: "auto", background: '#fff', border: '1px solid #ccc' }}
            data-placeholder="여기에 엑셀, 한글, 웹페이지 등의 표를 붙여넣으세요..."
        />
    );
};

export default function TableEditorApp() {
    const [tableHtml, setTableHtml] = useState('');
    const [formattedHtml, setFormattedHtml] = useState('...');
    const [copyButtonText, setCopyButtonText] = useState('복사');
    const { subContent } = useContext(WidgetContext);
    
    // 최적화 3: 디바운싱을 위한 ref 추가
    const debounceTimeout = useRef(null);

    // 최적화: tableHtml이 변경될 때마다 Prettier를 실행하되, 디바운싱을 적용하여 성능 향상
    useEffect(() => {
        if (!tableHtml) {
            setFormattedHtml('...');
            return;
        }

        // 기존 타이머가 있으면 제거
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // 500ms 후에 포매팅 실행
        debounceTimeout.current = setTimeout(async () => {
            try {
                const formatted = await prettier.format(tableHtml, {
                    parser: "html",
                    plugins: [htmlParser],
                    // 추가: Prettier 옵션으로 가독성 향상
                    htmlWhitespaceSensitivity: "css",
                    tabWidth: 2,
                });
                setFormattedHtml(formatted);
            } catch (error) {
                console.error("HTML 포매팅 실패:", error);
                setFormattedHtml(tableHtml); // 포매팅 실패 시 원본 HTML 표시
            }
        }, 500);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [tableHtml]);


    const handleCopy = useCallback(() => {
        if (!tableHtml) {
            alert('복사할 내용이 없습니다.');
            return;
        }
        navigator.clipboard.writeText(formattedHtml).then(() => { // 포매팅된 코드를 복사
            setCopyButtonText('복사 완료!');
            setTimeout(() => setCopyButtonText('복사'), 2000);
        }).catch(err => {
            console.error('복사 실패:', err);
            alert('복사에 실패했습니다.');
        });
    }, [tableHtml, formattedHtml]);

    const handleClear = useCallback(() => {
        setTableHtml('');
    }, []);

    return (
        <div className={subContent}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 className="tit2">테이블 에디터</h4>
                <button onClick={handleClear} className="btn_red">내용 삭제</button>
            </div>
            <p className="bu_ment">아래 입력란에 엑셀, 웹페이지 등의 표를 붙여넣으세요.</p>
            <WysiwygTableEditor
                rawContent={tableHtml}
                onContentChange={setTableHtml}
            />
            
            <div className="mgt20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 className="tit2" style={{marginBottom:"0"}}>저장될 HTML (State)</h4>
                <button onClick={handleCopy} className="btn_Dbl">
                    {copyButtonText}
                </button>
            </div>
            
            <SyntaxHighlighter language="markup" style={vscDarkPlus} wrapLines={true} customStyle={{ minHeight: '10rem', margin: '1rem 0 0', maxHeight: "20rem", overflowY: "auto" }}>
                {formattedHtml}
            </SyntaxHighlighter>

            <h4 className="tit2">렌더링 결과</h4>
            <div className="tbl_st1" dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>
    );
}
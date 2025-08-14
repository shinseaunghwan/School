"use client";
import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { WidgetContext } from "../../App";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";

// 'cleanTableHtml'와 'WysiwygTableEditor' 컴포넌트는 이전과 동일합니다.
const cleanTableHtml = (htmlString) => {
    if (!htmlString) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const sourceTable = tempDiv.querySelector('table');
    if (!sourceTable) return '';

    const allowedAttributes = ['rowspan', 'colspan'];
    [sourceTable, ...sourceTable.querySelectorAll('*')].forEach(el => {
        const attributes = Array.from(el.attributes);
        attributes.forEach(attr => {
            if (!allowedAttributes.includes(attr.name.toLowerCase())) {
                el.removeAttribute(attr.name);
            }
        });
    });

    const newTable = document.createElement('table');
    const newThead = document.createElement('thead');
    const newTbody = document.createElement('tbody');
    const sourceRows = Array.from(sourceTable.rows);
    
    let headerRowCount = 1;
    if (sourceRows.length > 0) {
        const firstRowCells = Array.from(sourceRows[0].cells);
        const maxRowspan = Math.max(...firstRowCells.map(cell => parseInt(cell.getAttribute('rowspan')) || 1));
        headerRowCount = Math.min(maxRowspan, sourceRows.length);
    }

    sourceRows.forEach((row, index) => {
        const newRow = row.cloneNode(true);
        if (index < headerRowCount) {
            newRow.querySelectorAll('td').forEach(td => {
                const th = document.createElement('th');
                th.innerHTML = td.textContent.trim();
                for (const attr of Array.from(td.attributes)) {
                    th.setAttribute(attr.name, attr.value);
                }
                td.replaceWith(th);
            });
            newThead.appendChild(newRow);
        } else {
            newRow.querySelectorAll('td').forEach(cell => {
                cell.innerHTML = cell.textContent.trim();
            });
            newTbody.appendChild(newRow);
        }
    });

    if (newThead.rows.length > 0) {
        const caption = document.createElement('caption');
        const headerTexts = Array.from(newThead.querySelectorAll('th')).map(th => th.textContent.trim());
        caption.textContent = headerTexts.join(', ');
        newTable.appendChild(caption);
    }
    
    if (newThead.childNodes.length > 0) newTable.appendChild(newThead);
    if (newTbody.childNodes.length > 0) newTable.appendChild(newTbody);
    
    return newTable.outerHTML;
};

const WysiwygTableEditor = ({ rawContent, onContentChange }) => {
    const editorRef = useRef(null);
    useEffect(() => {
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

    const handleInput = (e) => {
        const newContent = e.currentTarget.innerHTML;
        onContentChange(newContent);
    };

    return (
        <div
            ref={editorRef}
            contentEditable={true}
            onPaste={handlePaste}
            onInput={handleInput}
            className="tableArea mgt20"
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

    useEffect(() => {
        if (!tableHtml) {
            setFormattedHtml('...');
            return;
        }
        const formatCode = async () => {
            try {
                const formatted = await prettier.format(tableHtml, {
                    parser: "html",
                    plugins: [htmlParser],
                });
                setFormattedHtml(formatted);
            } catch (error) {
                console.error("HTML 포매팅 실패:", error);
                setFormattedHtml(tableHtml);
            }
        };

        formatCode();
    }, [tableHtml]);

    const handleCopy = () => {
        if (!tableHtml) {
            alert('복사할 내용이 없습니다.');
            return;
        }
        navigator.clipboard.writeText(tableHtml).then(() => {
            setCopyButtonText('복사 완료!');
            setTimeout(() => setCopyButtonText('복사'), 2000);
        }).catch(err => {
            console.error('복사 실패:', err);
            alert('복사에 실패했습니다.');
        });
    };

    // 1. 내용을 지우는 핸들러 함수를 추가합니다.
    const handleClear = () => {
        setTableHtml('');
    };

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
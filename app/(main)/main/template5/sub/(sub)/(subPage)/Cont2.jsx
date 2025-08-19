"use client";
import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { WidgetContext } from "../../App";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";

SyntaxHighlighter.registerLanguage('markup', markup);

const cleanTableHtml = (htmlString) => {
    if (!htmlString) return '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    const tableElement = tempDiv.querySelector('table');
    if (!tableElement) {
        return '';
    }

    const removeComments = (element) => {
        for (let i = element.childNodes.length - 1; i >= 0; i--) {
            const node = element.childNodes[i];
            if (node.nodeType === 8) {
                node.parentNode.removeChild(node);
            } else if (node.nodeType === 1) {
                removeComments(node);
            }
        }
    };
    removeComments(tableElement);
    
    const allowedTags = new Set(['table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'a', 'br', 'p']);
    const allowedAttributes = new Set(['rowspan', 'colspan', 'href']);

    const allElements = tableElement.querySelectorAll('*');
    for (let i = allElements.length - 1; i >= 0; i--) {
        const el = allElements[i];
        const tagName = el.tagName.toLowerCase();
        const tagPrefix = tagName.split(':')[0];

        if (['v', 'w', 'o'].includes(tagPrefix)) {
            el.parentNode.removeChild(el);
            continue;
        }

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

    const tableAttributes = Array.from(tableElement.attributes);
    tableAttributes.forEach(attr => {
        if (!allowedAttributes.has(attr.name.toLowerCase())) {
            tableElement.removeAttribute(attr.name);
        }
    });

    const replaceParagraphsWithBreaks = (cell) => {
        let paragraphs = Array.from(cell.querySelectorAll('p'));
        paragraphs = paragraphs.filter(p => {
            const trimmedHtml = p.innerHTML.trim();
            if (trimmedHtml === '' || trimmedHtml === '&nbsp;') {
                p.remove();
                return false;
            }
            return true;
        });

        paragraphs.forEach((p, index) => {
            const fragment = document.createDocumentFragment();
            while (p.firstChild) {
                fragment.appendChild(p.firstChild);
            }
            if (index < paragraphs.length - 1) {
                fragment.appendChild(document.createElement('br'));
            }
            p.replaceWith(fragment);
        });
    };

    const applyTableSemantics = (table) => {
        if (table.hasAttribute('data-processed')) return;

        if (!table.parentElement || !table.parentElement.classList.contains('tbl_st1')) {
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'tbl_st1';
            table.parentNode.insertBefore(wrapperDiv, table);
            wrapperDiv.appendChild(table);
        }
        
        const newThead = document.createElement('thead');
        const newTbody = document.createElement('tbody');
        const allRows = Array.from(table.rows);
        
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
        
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        
        if (newThead.rows.length > 0) {
            const caption = document.createElement('caption');
            const headerTexts = Array.from(newThead.querySelectorAll('th')).map(th => th.textContent.trim());
            caption.textContent = `표: ${headerTexts.join(', ')}`;
            table.appendChild(caption);
        }

        if (newThead.childNodes.length > 0) table.appendChild(newThead);
        if (newTbody.childNodes.length > 0) table.appendChild(newTbody);
        
        table.setAttribute('data-processed', 'true');
    };

    const tablesToProcess = [tableElement, ...Array.from(tableElement.querySelectorAll('table'))];
    tablesToProcess.reverse();
    
    tablesToProcess.forEach(table => {
        const cells = table.querySelectorAll('th, td');
        cells.forEach(cell => {
            if (cell.closest('table') === table) {
                replaceParagraphsWithBreaks(cell);
            }
        });
        applyTableSemantics(table);
    });
    
    // [수정] 모든 처리가 끝난 후, 최종 HTML에 남지 않도록 임시 속성을 제거합니다.
    tablesToProcess.forEach(table => {
        table.removeAttribute('data-processed');
    });

    return tableElement.parentElement ? tableElement.parentElement.outerHTML : tableElement.outerHTML;
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
        if (pastedHtml) {
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
            className="tableArea mgt"
            style={{ width: "100%", minHeight: "15rem", maxHeight: "15rem", overflowY: "auto", background: '#fff', border: '1px solid #ccc', padding:"0.5rem" }}
            data-placeholder="여기에 엑셀, 한글, 웹페이지 등의 표를 붙여넣으세요..."
        />
    );
};


export default function TableEditorApp() {
    const [tableHtml, setTableHtml] = useState('');
    const [contentShow, setContentShow] = useState(false);
    const [formattedHtml, setFormattedHtml] = useState('');
    const [copyButtonText, setCopyButtonText] = useState('복사');
    const { subContent } = useContext(WidgetContext);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        if (!tableHtml) {
            setFormattedHtml('');
            return;
        }

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            try {
                const formatted = await prettier.format(tableHtml, {
                    parser: "html",
                    plugins: [htmlParser],
                    htmlWhitespaceSensitivity: "css",
                    tabWidth: 2,
                });
                setFormattedHtml(formatted);
            } catch (error) {
                console.error("HTML 포매팅 실패:", error);
                setFormattedHtml(tableHtml);
            }
        }, 500);

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
        navigator.clipboard.writeText(formattedHtml).then(() => {
            setCopyButtonText('복사 완료!');
            setTimeout(() => setCopyButtonText('복사'), 2000);
        }).catch(err => {
            console.error('복사 실패:', err);
            alert('복사에 실패했습니다.');
        });
    }, [formattedHtml]);

    const handleClear = useCallback(() => {
        setTableHtml('');
    }, []);
    const handleShow = () => {
        setContentShow(!contentShow);
    }
    return (
        <div className={subContent}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 className="tit2">테이블 에디터</h4>
                <button onClick={handleClear} className="btn_red">내용 삭제</button>
            </div>
            <p className="bu_ment">아래 입력란에 엑셀,한글, 웹페이지 등의 표를 붙여넣으세요.</p>
            <WysiwygTableEditor
                rawContent={tableHtml}
                onContentChange={setTableHtml}
            />
            
            <div className="mgt20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 className="tit2" style={{marginBottom:"0"}}>HTML 마크업</h4>
                <button onClick={handleCopy} className="btn_Dbl">
                    {copyButtonText}
                </button>
            </div>
            
            <SyntaxHighlighter language="markup" style={vscDarkPlus} wrapLines={true} customStyle={{ minHeight: '10rem', margin: '1rem 0 0', maxHeight: "20rem", overflowY: "auto" }}>
                {formattedHtml}
            </SyntaxHighlighter>

 <div className="mgt20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
<h4 className="tit2">렌더링 결과</h4>
 <button onClick={handleShow} className="btn_red">내용 보기</button>
 </div>
           {contentShow === true ? (
               <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
           ) : ""} 
         
        </div>
    );
}
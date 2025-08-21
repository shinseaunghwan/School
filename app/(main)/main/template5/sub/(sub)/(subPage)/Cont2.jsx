"use client";
import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import modal from "../../../../../../../styles/modalPop.module.css";
import { WidgetContext } from "../../App"; 
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import * as prettier from "prettier/standalone";
import * as htmlParser from "prettier/parser-html";

SyntaxHighlighter.registerLanguage('markup', markup);

const cleanTableHtml = (htmlString, wrapperClass, ulClass) => {
    if (!htmlString) return '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    const tableElement = tempDiv.querySelector('table');
    if (!tableElement) {
        return '';
    }

    const allowedTags = new Set(['table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'colgroup', 'col', 'a', 'br', 'p', 'ul', 'li']);
    const allowedAttributes = new Set(['rowspan', 'colspan', 'href']);

    // ✨ 최적화된 클리닝 함수 (로직 보강)
    const traverseAndClean = (element) => {
        // 1. 자식 노드부터 재귀적으로 정리 (후위 순회 방식)
        for (let i = element.childNodes.length - 1; i >= 0; i--) {
            const node = element.childNodes[i];

            // 주석 노드 제거
            if (node.nodeType === 8) { // Node.COMMENT_NODE
                node.remove();
                continue;
            }

            // 엘리먼트 노드인 경우 재귀 호출
            if (node.nodeType === 1) { // Node.ELEMENT_NODE
                traverseAndClean(node);
            }
        }
        
        // 2. 자식 노드 정리가 끝난 후, 현재 엘리먼트 자체를 정리
        // (최상위 table 태그 자체도 이 로직을 통해 처리됨)
        const tagName = element.tagName.toLowerCase();
        const tagPrefix = tagName.split(':')[0];

        // MS Office 관련 태그 제거
        if (['v', 'w', 'o'].includes(tagPrefix)) {
            element.parentNode.removeChild(element);
            return;
        }

        // 허용되지 않은 태그는 제거하고 자식 노드만 남김 (unwrap)
        if (!allowedTags.has(tagName)) {
            element.replaceWith(...element.childNodes);
            return;
        }

        // 허용되지 않은 속성 제거 (border, style, width, cellpadding 등)
        const attributes = Array.from(element.attributes);
        attributes.forEach(attr => {
            if (!allowedAttributes.has(attr.name.toLowerCase())) {
                element.removeAttribute(attr.name);
            }
        });
    };
    
    // 클리닝 함수 실행
    traverseAndClean(tableElement);
    
    const cleanWrapperCell = (cell) => {
        const emptyParagraphs = cell.querySelectorAll('p');
        emptyParagraphs.forEach(p => {
            if (p.innerHTML.trim() === '' || p.innerHTML.trim() === '&nbsp;') {
                p.remove();
            }
        });
    };
    
    const processCellContent = (cell, currentUlClass, createLists = true) => { 
        const listLikeRegex = /^\s*(?:(?:[가-힣]|\d{1,3})[.)]|[-•*·□■△▲○●◎◇◆㉮-㉻㉠-㉭ⓐ-ⓩ①-⑮Ⅰ-Ⅻⅰ-ⅻ])/;
        const annotationRegex = /^\s*※/;
        
        const linesHtml = cell.innerHTML
            .replace(/<p[^>]*>/gi, '')
            .replace(/<\/p>/gi, '<br>');

        const lines = linesHtml.split(/<br\s*\/?>/gi).filter(line => line.trim() !== '' && line.trim() !== '&nbsp;');
        
        if (lines.length === 0) return;

        const newNodes = [];
        let currentUl = null;

        lines.forEach(lineHtml => {
            const tempLineDiv = document.createElement('div');
            tempLineDiv.innerHTML = lineHtml;
            const text = tempLineDiv.textContent || '';

            const isListItem = createLists && listLikeRegex.test(text);
            const isAnnotation = createLists && annotationRegex.test(text);

            if (isListItem) {
                if (!currentUl) {
                    currentUl = document.createElement('ul');
                    if (currentUlClass) {
                        currentUl.className = currentUlClass;
                    }
                    newNodes.push(currentUl);
                }
                const li = document.createElement('li');
                while(tempLineDiv.firstChild) {
                    li.appendChild(tempLineDiv.firstChild);
                }
                currentUl.appendChild(li);

            } else if (isAnnotation && currentUl && currentUl.lastElementChild) {
                const lastLi = currentUl.lastElementChild;
                lastLi.appendChild(document.createElement('br'));
                while(tempLineDiv.firstChild) {
                    lastLi.appendChild(tempLineDiv.firstChild);
                }

            } else {
                currentUl = null;
                const fragment = document.createDocumentFragment();
                 while(tempLineDiv.firstChild) {
                    fragment.appendChild(tempLineDiv.firstChild);
                }
                newNodes.push(fragment);
                newNodes.push(document.createElement('br'));
            }
        });

        if (newNodes.length > 0) {
            const lastNode = newNodes[newNodes.length - 1];
            if (lastNode.nodeType === 1 && lastNode.tagName === 'BR') {
                newNodes.pop();
            }
        }

        cell.innerHTML = '';
        newNodes.forEach(node => cell.appendChild(node));
    };

    const applyTableSemantics = (table, wClass) => {
        if (!table.parentElement || !table.parentElement.classList.contains(wClass)) {
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = wClass;
            table.parentNode.insertBefore(wrapperDiv, table);
            wrapperDiv.appendChild(table);
        }
    
        const newThead = document.createElement('thead');
        const newTbody = document.createElement('tbody');
        const allRows = Array.from(table.rows);
    
        let headerRowCount = 1;
        if (allRows.length > 0 && allRows[0].cells.length > 0) {
            const firstRowCells = Array.from(allRows[0].cells).filter(cell => cell.closest('table') === table);
            if (firstRowCells.length > 0) {
                const maxRowspan = Math.max(...firstRowCells.map(cell => parseInt(cell.getAttribute('rowspan')) || 1));
                headerRowCount = Math.min(maxRowspan, allRows.length);
            }
        }
    
        allRows.forEach((row, index) => {
            if (row.closest('table') === table) {
                const isHeaderRow = index < headerRowCount;
    
                if (isHeaderRow) {
                    row.querySelectorAll('td').forEach(td => {
                        if (td.closest('table') === table && !td.querySelector('table')) {
                            const th = document.createElement('th');
                            
                            while (td.firstChild) {
                                th.appendChild(td.firstChild);
                            }
                            
                            for (const attr of td.attributes) {
                                th.setAttribute(attr.name, attr.value);
                            }
                            td.replaceWith(th);
                        }
                    });
                    newThead.appendChild(row);
                } else {
                    newTbody.appendChild(row);
                }
            }
        });
    
        table.querySelectorAll('thead, tbody, caption').forEach(el => {
            if (el.parentElement === table) {
                el.remove();
            }
        });
    
        if (newThead.rows.length > 0) {
            const caption = document.createElement('caption');
            const headerTexts = Array.from(newThead.querySelectorAll('th')).map(th => th.textContent.trim());
            caption.textContent = `${headerTexts.join(', ')}의 정보(을)를 포함한 표입니다.`;
            table.appendChild(caption);
        }
    
        if (newThead.childNodes.length > 0) table.appendChild(newThead);
        if (newTbody.childNodes.length > 0) table.appendChild(newTbody);
    };

    const tablesToProcess = [tableElement, ...Array.from(tableElement.querySelectorAll('table'))];
    tablesToProcess.reverse();

    tablesToProcess.forEach(table => {
        const rows = Array.from(table.rows);
        rows.forEach(row => {
            if (row.closest('table') === table) {
                const cells = Array.from(row.cells);
                cells.forEach((cell, cellIndex) => {
                    if (cell.querySelector('table')) {
                        cleanWrapperCell(cell);
                    } else {
                        if (cellIndex > 0) {
                            processCellContent(cell, ulClass, true);
                        } else {
                            processCellContent(cell, ulClass, false);
                        }
                    }
                });
            }
        });

        applyTableSemantics(table, wrapperClass);
    });

    return tableElement.parentElement ? tableElement.parentElement.outerHTML : tableElement.outerHTML;
};

const WysiwygTableEditor = ({ rawContent, onContentChange, customWrapperClass, customUlClass }) => {
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
            const cleanedHtml = cleanTableHtml(pastedHtml, customWrapperClass, customUlClass); 
            onContentChange(cleanedHtml);
        } else {
            const pastedText = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, pastedText);
        }
    }, [onContentChange, customWrapperClass, customUlClass]); 

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
            className="tableArea"
            style={{ width: "100%", minHeight: "15rem", maxHeight: "15rem", overflowY: "auto", background: '#fff', border: '1px solid #ccc', padding:"0.5rem" }}
            data-placeholder="여기에 엑셀, 한글, 웹페이지 등의 표를 붙여넣으세요..."
        />
    );
};

export default function TableEditorApp() {
    const [tableHtml, setTableHtml] = useState('');
    const [wrapperClassName, setWrapperClassName] = useState('tbl_st1');
    const [ulClassName, setUlClassName] = useState('list_st1 al');
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
    
    const handleRemoveWrapper = useCallback(() => {
        if (!tableHtml) {
            alert('제거할 내용이 없습니다.');
            return;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tableHtml;

        const allTables = tempDiv.querySelectorAll('table');

        for (let i = allTables.length - 1; i >= 0; i--) {
            const table = allTables[i];
            const parent = table.parentElement;

            if (parent && parent.tagName === 'DIV' && parent.childElementCount === 1) {
                const wrapperClass = parent.className;

                if (wrapperClass) {
                    wrapperClass.split(' ').forEach(cls => {
                        if (cls) table.classList.add(cls);
                    });
                }
                parent.replaceWith(...parent.childNodes);
            }
        }
        setTableHtml(tempDiv.innerHTML);
    }, [tableHtml]);

    const handleShow = () => {
        setContentShow(!contentShow);
    }

    return (
        <div className={subContent}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',gap: '0.5rem', flexWrap:'wrap' }}>
                    <h4 className="tit2">테이블 에디터</h4>
                     <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={handleShow} className="btn_grL">미리 보기</button>
                    <button onClick={handleClear} className="btn_red">내용 삭제</button>
                    </div>
                </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start',gap: '0.5rem 1.5rem', flexWrap:'wrap' }}>
                
    
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <label htmlFor="wrapperClassInput" style={{ flexShrink: 0 }}><h4 className="titT2">테이블 클래스</h4></label>
                    <input
                        id="wrapperClassInput"
                        type="text"
                        value={wrapperClassName}
                        onChange={(e) => setWrapperClassName(e.target.value)}
                        placeholder="예: tbl_st1"
                        style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px',  }}
                    />
                </div>
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <label htmlFor="ulClassInput" style={{ flexShrink: 0 }}><h4 className="titT2">ul 클래스</h4></label>
                <input
                    id="ulClassInput"
                    type="text"
                    value={ulClassName}
                    onChange={(e) => setUlClassName(e.target.value)}
                    placeholder="예: list_st1 al"
                    style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            </div>
           

            <p className="bu_ment">아래 입력란에 엑셀,한글, 웹페이지 등의 표를 붙여넣으세요.</p>
            <p className="bu_ment mgb10">ul.list1 하위 2 ~ 3 구조는 수정해주셔야합니다.</p>
            <WysiwygTableEditor
                rawContent={tableHtml}
                onContentChange={setTableHtml}
                customWrapperClass={wrapperClassName}
                customUlClass={ulClassName}
            />
            
            <div className="mgt20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',flexWrap:'wrap' }}>
                <h4 className="tit2" style={{marginBottom:"0"}}>HTML 마크업</h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={handleRemoveWrapper} className="btn_red">
                        상위 div 삭제(충남)
                    </button>
                    <button onClick={handleCopy} className="btn_Dbl">
                        {copyButtonText}
                    </button>
                </div>
            </div>
            
            <SyntaxHighlighter language="markup" style={vscDarkPlus} wrapLines={true} customStyle={{ minHeight: '10rem', margin: '1rem 0 0', maxHeight: "20rem", overflowY: "auto" }}>
                {formattedHtml}
            </SyntaxHighlighter>

            {contentShow === true ? (
                <div className={modal.modalPopWrap2}>
                    <div className={modal.modalPop2}>
                        <div className={modal.contWrap}>
                              <div className={modal.back}><button className="btn_gr" onClick={() => setContentShow(false)}>닫기</button></div>
                            <div style={{overflowX:"auto"}} dangerouslySetInnerHTML={{ __html: tableHtml }} />
                        </div>
                    </div>
                </div>
            ) : ""} 
        </div>
    );
}
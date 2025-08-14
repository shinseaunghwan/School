"use client";
import React, { useState, useEffect, useCallback, useMemo, useContext, useRef } from "react";
import modal from "../../../../../../../styles/modalPop.module.css";
import { WidgetContext } from "../../App";
import { v4 as uuidv4 } from "uuid";

const getClassNames = (...classes) => classes.filter(Boolean).join(' ');

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
                th.innerHTML = td.innerHTML;
                for (const attr of Array.from(td.attributes)) {
                    th.setAttribute(attr.name, attr.value);
                }
                td.replaceWith(th);
            });
            newThead.appendChild(newRow);
        } else {
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
    const { tableArea } = useContext(WidgetContext);
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
            className={`${tableArea} mgt20`}
            style={{ width: "100%", minHeight: "5rem", background: '#fff', border: '1px solid #ccc' }}
            data-placeholder={`여기에 엑셀, 한글, 웹페이지 등의 표를 붙여넣으세요.`}
        ></div>
    );
};

const useDocumentManager = (initialDocs = []) => {
    const [documents, setDocuments] = useState(initialDocs);
    const [documentName, setDocumentName] = useState("");
    const [currentDocumentId, setCurrentDocumentId] = useState(null);
    useEffect(() => {
        try {
            const stored = localStorage.getItem("editorDocuments");
            if (stored) setDocuments(JSON.parse(stored));
        } catch (e) { console.error("문서 로딩 실패:", e); }
    }, []);
    const saveToLocalStorage = (docs) => {
        localStorage.setItem("editorDocuments", JSON.stringify(docs));
    };
    const saveDocument = (blocks) => {
        if (!documentName.trim()) return alert("문서 이름을 입력하세요.");
        const doc = { id: currentDocumentId || uuidv4(), name: documentName, blocks };
        const newDocs = documents.some(d => d.id === doc.id)
            ? documents.map(d => d.id === doc.id ? doc : d)
            : [...documents, doc];
        setDocuments(newDocs);
        saveToLocalStorage(newDocs);
        return true;
    };
    const loadDocument = (docId) => {
        const doc = documents.find(d => d.id === docId);
        if (doc) {
            setDocumentName(doc.name);
            setCurrentDocumentId(doc.id);
            return doc.blocks;
        }
        return null;
    };
    const deleteDocument = (docId) => {
        const newDocs = documents.filter(d => d.id !== docId);
        setDocuments(newDocs);
        saveToLocalStorage(newDocs);
        if (docId === currentDocumentId) {
            return true;
        }
        return false;
    };
    return { documents, documentName, setDocumentName, currentDocumentId, setCurrentDocumentId, saveDocument, loadDocument, deleteDocument };
};

const RenderBlock = ({ block }) => {
    const classNames = getClassNames(block.tag, block.marginLeft, block.marginTop, block.color, block.bgColor, block.fontSize, block.fontWeight);
    switch (block.tag) {
        case 'tit1': return <h3 className={classNames}>{block.content}</h3>;
        case 'tit2': return <h4 className={classNames}>{block.content}</h4>;
        case 'tit3': return <h5 className={classNames}>{block.content}</h5>;
        case 'tbl_st1':
            return (
                <div
                    className={classNames}
                    dangerouslySetInnerHTML={{ __html: block.content }}
                />
            );
        default: return <p className={classNames}>{block.content}</p>;
    }
};

const RenderTree = ({ blocks = [] }) => {
    const renderTree = useMemo(() => {
        const tree = [];
        let i = 0;
        while (i < blocks.length) {
            const current = blocks[i];
            if (current.groupId) {
                const group = { id: current.groupId, type: 'group', boxClass: current.boxClass, children: [] };
                while (i < blocks.length && blocks[i].groupId === group.id) {
                    group.children.push(blocks[i]);
                    i++;
                }
                tree.push(group);
            } else if (current.tag?.startsWith('list_st')) {
                const listRoot = { id: uuidv4(), type: 'list', children: [] };
                const parentStack = [];
                let j = i;
                while (j < blocks.length && blocks[j].tag?.startsWith('list_st')) {
                    const level = parseInt(blocks[j].tag.slice(-1), 10);
                    const node = { block: blocks[j], children: [] };
                    while (parentStack.length >= level) parentStack.pop();
                    const parent = parentStack.length > 0 ? parentStack[parentStack.length - 1] : listRoot;
                    parent.children.push(node);
                    parentStack.push(node);
                    j++;
                }
                tree.push(listRoot);
                i = j;
            } else {
                tree.push({ id: current.id, type: 'block', block: current });
                i++;
            }
        }
        return tree;
    }, [blocks]);

    const buildList = (nodes) => (
        nodes.map(({ block, children }) => (
            <li key={block.id} className={getClassNames(block.marginLeft, block.marginTop, block.color, block.bgColor, block.fontSize, block.fontWeight)}>
                {block.content}
                {children.length > 0 && <ul className={block.tag.replace('list', 'ul').replace(/st(\d)/, 'list_st$1')}>{buildList(children)}</ul>}
            </li>
        ))
    );

    return renderTree.map(node => {
        if (node.type === 'group') {
            return <div key={node.id} className={node.boxClass}><div className="inner">{node.children.map(b => <RenderBlock key={b.id} block={b} />)}</div></div>;
        }
        if (node.type === 'list') {
            return <ul key={node.id} className="list_st1">{buildList(node.children)}</ul>;
        }
        if (node.type === 'block') {
            return <RenderBlock key={node.id} block={node.block} />;
        }
        return null;
    });
};

const tagOptions = [
    { value: "tit1", label: "제목1 (h3)" }, { value: "tit2", label: "제목2 (h4)" }, { value: "tit3", label: "제목3 (h5)" },
    { value: "bu_st1", label: "텍스트1" }, { value: "bu_st2", label: "텍스트2" }, { value: "bu_st3", label: "텍스트3" },
    { value: "list_st1", label: "리스트1" }, { value: "list_st2", label: "리스트2" }, { value: "list_st3", label: "리스트3" },
    { value: "bu_atte", label: "주의" }, { value: "bu_wnrn", label: "경고" }, { value: "bu_ment", "label": "말풍선 타입" },
    { value: "tbl_st1", label: "테이블" },
];

const styleOptions = {
    marginLeft: ["", "mgl10", "mgl20", "mgl30", "mgl40", "mgl50"],
    marginTop: ["", "mgt10", "mgt20", "mgt30", "mgt40", "mgt50"],
    color: ["", "pc_blue", "pc_red", "pc_navy", "pc_org", "pc_green", "pc_yellow", "pc_gray", "pc_black"],
    bgColor: ["", "bg_blue", "bg_red", "bg_navy", "bg_org", "bg_green", "bg_yellow", "bg_gray", "bg_black"],
    fontSize: ["", "fs12", "fs14", "fs16", "fs18", "fs20", "fs22", "fs24", "fs26"],
    fontWeight: ["", "Tline_b", "font_Fr", "font_Fm", "font_Fb"],
};

export default function SubWrap() {
    const { subContent, listBox, textAreaBox} = useContext(WidgetContext);
    const [blocks, setBlocks] = useState([]);
    const [content, setContent] = useState("");
    const [selectedTag, setSelectedTag] = useState("tit1");
    const [draftStyles, setDraftStyles] = useState({});
    const [boxMode, setBoxMode] = useState({ active: false, class: "box_st1", groupId: null });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { documents, documentName, setDocumentName, currentDocumentId, setCurrentDocumentId, saveDocument, loadDocument, deleteDocument } = useDocumentManager();

    const resetEditor = () => {
        setBlocks([]);
        setContent("");
        setDocumentName("");
        setCurrentDocumentId(null);
        setBoxMode({ active: false, class: "box_st1", groupId: null });
    };

    const addBlock = useCallback(() => {
        if (!content.trim()) return;
        const newBlock = {
            id: uuidv4(),
            tag: selectedTag,
            content,
            ...draftStyles,
            ...(boxMode.active && { groupId: boxMode.groupId, boxClass: boxMode.class }),
        };
        setBlocks(prev => [...prev, newBlock]);
        setContent("");
        setDraftStyles({});
    }, [content, selectedTag, draftStyles, boxMode]);

    const cycleStyle = (property) => {
        const classes = styleOptions[property];
        const current = draftStyles[property] || "";
        const nextIndex = (classes.indexOf(current) + 1) % classes.length;
        setDraftStyles(prev => ({ ...prev, [property]: classes[nextIndex] }));
    };

    const toggleBoxMode = () => {
        setBoxMode(prev => {
            const isActive = !prev.active;
            return { ...prev, active: isActive, groupId: isActive ? uuidv4() : null };
        });
    };

    const handleLoad = (docId) => {
        const loadedBlocks = loadDocument(docId);
        if (loadedBlocks) {
            setBlocks(loadedBlocks);
            setIsModalOpen(false);
        }
    };

    const handleDeleteDoc = (docId) => {
        const needsReset = deleteDocument(docId);
        if (needsReset) resetEditor();
    }

    const handleSave = () => {
       const finalBlocks = content.trim() ? [...blocks, { id: uuidv4(), tag: selectedTag, content, ...draftStyles, ...(boxMode.active && { groupId: boxMode.groupId, boxClass: boxMode.class }) }] : blocks;
       if (saveDocument(finalBlocks)) {
           resetEditor();
           alert("문서가 저장되었습니다.");
       }
    };

    const draftBlock = useMemo(() => {
        if (!content.trim() || selectedTag === 'tbl_st1') return null;
        return {
            id: 'draft-preview',
            tag: selectedTag,
            content: content,
            ...draftStyles
        };
    }, [content, selectedTag, draftStyles]);

    return (
        <div className={subContent}>
            <RenderTree blocks={blocks} />
            {draftBlock && <RenderBlock block={draftBlock} />}
            <div className="box_st1 mgt20">
                <div className="inner">
                    <input type="text" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="컨텐츠 제목을 입력하세요." style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
                    <div className={listBox}>
                        <select value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
                            {tagOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <button className="btn_pur" onClick={() => cycleStyle('marginLeft')}>왼쪽간격</button>
                        <button className="btn_pur" onClick={() => cycleStyle('marginTop')}>상단간격</button>
                        <button className="btn_pur" onClick={() => cycleStyle('color')}>색상</button>
                        <button className="btn_pur" onClick={() => cycleStyle('bgColor')}>배경</button>
                        <button className="btn_pur" onClick={() => cycleStyle('fontSize')}>크기</button>
                        <button className="btn_pur" onClick={() => cycleStyle('fontWeight')}>굵기</button>
                        <button className={getClassNames("btn_org", boxMode.active && "active")} onClick={toggleBoxMode}>박스</button>
                    </div>
                    <div className={textAreaBox}>
                        {selectedTag === 'tbl_st1' ? (
                            <WysiwygTableEditor rawContent={content} onContentChange={setContent} />
                        ) : (
                            <textarea
                                style={{ width: "100%", minHeight: "5rem", resize: "none" }}
                                className="txtArea mgt20"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addBlock(); } }}
                                placeholder="내용 입력"
                            />
                        )}
                    </div>
                    <div className="btns ar">
                        <button className="btn_gr" onClick={() => setIsModalOpen(true)}>목록</button>
                        <button className="btn_Dbl" onClick={addBlock} disabled={!content.trim()}>등록</button>
                        <button className="btn_Dbl" onClick={handleSave}>저장</button>
                        <button className="btn_red" onClick={() => setBlocks(p => p.slice(0, -1))}>삭제</button>
                        <button className="btn_red" onClick={resetEditor}>전부 삭제</button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className={modal.modalPopWrap}>
                    <div className={modal.modalPop}>
                        <div className={modal.contWrap}>
                            <h5 className="tit3">저장된 컨텐츠 목록</h5>
                            {documents.length === 0 ? <p>저장된 컨텐츠가 없습니다.</p> : (
                                <ul className={modal.contList}>
                                    {documents.map(doc => (
                                        <li key={doc.id}>
                                            <span>{doc.name}</span>
                                            <div className={modal.buttonWrap}>
                                                <button className="btn_Dbl mini" onClick={() => handleLoad(doc.id)}>불러오기</button>
                                                <button className="btn_red mini" onClick={() => handleDeleteDoc(doc.id)} style={{ marginLeft: "5px" }}>삭제</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className={modal.back}><button className="btn_gr" onClick={() => setIsModalOpen(false)}>닫기</button></div>
                    </div>
                </div>
            )}
        </div>
    );
}
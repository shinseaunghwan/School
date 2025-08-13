"use client";
import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import modal from "../../../../../../styles/modalPop.module.css";
import { WidgetContext } from "../App";
import { v4 as uuidv4 } from "uuid";

// 헬퍼 함수: 클래스 이름 배열 생성 (중복 제거를 위해 추출)
const getClassNames = (styles) => styles.filter(Boolean).join(" ").trim();

// 태그 매핑: HTML 요소와 스타일을 정의 (table 추가)
const tagMap = {
  tit1: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h3 className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </h3>
  ),
  tit2: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h4 className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </h4>
  ),
  tit3: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h5 className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </h5>
  ),
  bu_st1: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </p>
  ),
  bu_st2: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </p>
  ),
  bu_st3: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </p>
  ),
  bu_atte: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </p>
  ),
  bu_wnrn: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </p>
  ),
  bu_ment: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={getClassNames([className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight])}>
      {content}
    </p>
  ),
  list_st1: (content, marginLeft, marginTop, color, bgColor, fontSize, fontWeight, children) => (
    <ul className="list_st1">
      <li className={getClassNames([marginLeft, marginTop, color, bgColor, fontSize, fontWeight]) || undefined}>
        {content}
        {children}
      </li>
    </ul>
  ),
  list_st2: (content, marginLeft, marginTop, color, bgColor, fontSize, fontWeight, children) => (
    <ul className="list_st2">
      <li className={getClassNames([marginLeft, marginTop, color, bgColor, fontSize, fontWeight]) || undefined}>
        {content}
        {children}
      </li>
    </ul>
  ),
  list_st3: (content, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <ul className="list_st3">
      <li className={getClassNames([marginLeft, marginTop, color, bgColor, fontSize, fontWeight]) || undefined}>
        {content}
      </li>
    </ul>
  ),
tbl_st1: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => {
  // 입력 데이터 정규화
  const cleanedContent = content.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n'); // 개행 문자 통일
  if (!cleanedContent) return null;

  // 데이터가 단일 열로 보이는 경우, 4열로 재구성
  const parseSingleColumnToTable = (text, columns = 4) => {
    const rows = [];
    const lines = text.split('\n').map(line => line.trim()).filter(line => line); // 빈 줄 제거
    for (let i = 0; i < lines.length; i += columns) {
      const row = lines.slice(i, i + columns);
      // 열 수가 부족하면 빈 문자열로 채움
      while (row.length < columns) {
        row.push('');
      }
      rows.push(row);
    }
    return rows;
  };

  // 탭 구분자 우선 시도
  const parseTSVWithQuotes = (text) => {
    const rows = [];
    let currentRow = [];
    let currentCell = "";
    let insideQuotes = false;
    let i = 0;

    while (i < text.length) {
      const char = text[i];

      if (char === '"') {
        insideQuotes = !insideQuotes;
        i++;
        continue;
      }

      if (insideQuotes) {
        currentCell += char;
        i++;
        continue;
      }

      if (char === "\t") {
        currentRow.push(currentCell.trim());
        currentCell = "";
        i++;
        continue;
      }

      if (char === "\n" && !insideQuotes) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = "";
        i++;
        continue;
      }

      currentCell += char;
      i++;
    }

    // 마지막 셀과 행 추가
    if (currentCell || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
    }

    // 빈 행 필터링 및 열 수 정규화
    const filteredRows = rows.filter((row) => row.some((cell) => cell));
    if (filteredRows.length === 0) return [];

    const maxColumns = Math.max(...filteredRows.map((row) => row.length));
    return filteredRows.map((row) =>
      row.length < maxColumns ? [...row, ...Array(maxColumns - row.length).fill("")] : row
    );
  };

  // 탭 구분자 우선 시도
  let parsedRows = parseTSVWithQuotes(cleanedContent);

  // 탭 파싱이 실패하거나 단일 열로만 나오면 다른 구분자 시도
  if (parsedRows.length === 0 || parsedRows.every((row) => row.length <= 1)) {
    const tryDelimiters = [
      { delimiter: /,/, name: "comma" },
      { delimiter: /\s{2,}/, name: "spaces" },
      { delimiter: /\|/, name: "pipe" },
    ];

    for (const { delimiter } of tryDelimiters) {
      parsedRows = cleanedContent
        .split("\n")
        .map((row) => row.split(delimiter).map((cell) => cell.trim()).filter(Boolean))
        .filter((row) => row.length > 0);
      const maxColumns = Math.max(...parsedRows.map((row) => row.length));
      if (maxColumns > 1) break;
    }

    // 여전히 단일 열로 보이면, 4열로 재구성
    if (parsedRows.length === 0 || parsedRows.every((row) => row.length <= 1)) {
      parsedRows = parseSingleColumnToTable(cleanedContent, 4); // 4열로 가정
    }
  }

  // 유효한 테이블이 없으면 렌더링하지 않음
  if (parsedRows.length === 0 || parsedRows.every((row) => row.length === 0)) return null;

  // 클래스 이름 생성
  const classNames = getClassNames([
    className || "tbl_st1",
    marginLeft,
    marginTop,
    color,
    bgColor,
    fontSize,
    fontWeight,
  ]);

  return (
    <div className={classNames}>
      <table>
        <thead>
          <tr>
            {parsedRows[0].map((cell, idx) => (
              <th key={idx}>{cell || `Column ${idx + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parsedRows.slice(1).map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} dangerouslySetInnerHTML={{ __html: cell.replace(/\n/g, "<br />") }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
},
}

// 태그 선택 옵션 (table 추가)
const tagOptions = [
  { value: "tit1", label: "제목1 (h3)" },
  { value: "tit2", label: "제목2 (h4)" },
  { value: "tit3", label: "제목3 (h5)" },
  { value: "bu_st1", label: "텍스트1" },
  { value: "bu_st2", label: "텍스트2" },
  { value: "bu_st3", label: "텍스트3" },
  { value: "list_st1", label: "리스트1" },
  { value: "list_st2", label: "리스트2" },
  { value: "list_st3", label: "리스트3" },
  { value: "bu_atte", label: "주의" },
  { value: "bu_wnrn", label: "경고" },
  { value: "bu_ment", label: "말풍선 타입" },
  { value: "tbl_st1", label: "테이블" },
];

export default function SubWrap() {
  const { subContent, listBox, textAreaBox } = useContext(WidgetContext);
  const [textareaContent, setTextareaContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("tit1");
  const [titleList, setTitleList] = useState([]);
  const [currentBoxClass, setCurrentBoxClass] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [contentList, setContentList] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [documentName, setDocumentName] = useState("");

  useEffect(() => {
    const storedDocs = localStorage.getItem("editorDocuments");
    if (storedDocs) {
      try {
        setDocuments(JSON.parse(storedDocs));
      } catch (error) {
        console.error("로컬 스토리지 파싱 에러:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (currentDocumentId && titleList.length > 0) {
      setDocuments((prevDocs) => {
        const updatedDocs = prevDocs.map((doc) =>
          doc.id === currentDocumentId ? { ...doc, content: titleList } : doc
        );
        localStorage.setItem("editorDocuments", JSON.stringify(updatedDocs));
        return updatedDocs;
      });
    }
  }, [titleList, currentDocumentId]);

  const getLastItemIndex = useCallback((list, tag) => list.slice().reverse().findIndex((item) => item.tag === tag), []);

  const updateListItem = useCallback((list, index, updates) => {
    const updatedList = [...list];
    updatedList[index] = { ...updatedList[index], ...updates };
    return updatedList;
  }, []);

  const groupByBoxClass = useCallback((list) => {
    const groups = [];
    let currentGroup = { boxClass: null, groupId: null, items: [] };
    list.forEach((item) => {
      if (item.boxClass !== currentGroup.boxClass || item.groupId !== currentGroup.groupId) {
        if (currentGroup.items.length) groups.push(currentGroup);
        currentGroup = { boxClass: item.boxClass, groupId: item.groupId, items: [] };
      }
      currentGroup.items.push(item);
    });
    if (currentGroup.items.length) groups.push(currentGroup);
    return groups;
  }, []);

  const handleTextareaChange = useCallback(
    ({ target: { value } }) => {
      setTextareaContent(value);
      if (!value.trim()) {
        setTitleList((prev) => {
          const index = getLastItemIndex(prev, selectedTag);
          return index === -1 || prev[prev.length - 1 - index].committed
            ? prev
            : prev.filter((_, i) => i !== prev.length - 1 - index);
        });
        return;
      }
      setTitleList((prev) => {
        const index = getLastItemIndex(prev, selectedTag);
        if (index !== -1) {
          const i = prev.length - 1 - index;
          if (!prev[i].committed) {
            return updateListItem(prev, i, {
              content: value,
              boxClass: currentBoxClass || null,
              groupId: currentGroupId,
            });
          }
        }
        return [
          ...prev,
          {
            id: uuidv4(),
            tag: selectedTag,
            content: value,
            committed: false,
            boxClass: currentBoxClass || null,
            groupId: currentGroupId,
            marginLeft: "",
            marginTop: "",
            color: "",
            bgColor: "",
            fontSize: "",
            fontWeight: "",
          },
        ];
      });
    },
    [selectedTag, currentBoxClass, currentGroupId, getLastItemIndex, updateListItem]
  );

  const handleTagChange = useCallback(({ target: { value } }) => {
    if (textareaContent.trim()) handleButtonClick();
    setSelectedTag(value);
  }, [textareaContent]);

  const handleButtonClick = useCallback(() => {
    if (!textareaContent.trim()) return;
    setTitleList((prev) => {
      const index = getLastItemIndex(prev, selectedTag);
      let updatedList = prev;
      let currentTag = selectedTag;
      let currentMarginLeft = "";
      let currentMarginTop = "";
      let currentColor = "";
      let currentBgColor = "";
      let currentFontSize = "";
      let currentFontWeight = "";
      if (index !== -1) {
        const i = prev.length - 1 - index;
        if (!prev[i].committed) {
          currentTag = prev[i].tag;
          currentMarginLeft = prev[i].marginLeft;
          currentMarginTop = prev[i].marginTop;
          currentColor = prev[i].color;
          currentBgColor = prev[i].bgColor;
          currentFontSize = prev[i].fontSize;
          currentFontWeight = prev[i].fontWeight;
          updatedList = prev.filter((_, idx) => idx !== i);
        }
      }
      return [
        ...updatedList,
        {
          id: uuidv4(),
          tag: currentTag,
          content: textareaContent,
          committed: true,
          boxClass: currentBoxClass || null,
          groupId: currentGroupId,
          marginLeft: currentMarginLeft,
          marginTop: currentMarginTop,
          color: currentColor,
          bgColor: currentBgColor,
          fontSize: currentFontSize,
          fontWeight: currentFontWeight,
        },
      ];
    });
    setTextareaContent("");
  }, [textareaContent, selectedTag, currentBoxClass, currentGroupId, getLastItemIndex]);

  const handleDelete = useCallback(() => {
    if (titleList.length) {
      setTitleList((prev) => prev.slice(0, -1));
      setTextareaContent("");
    }
  }, [titleList.length]);

  const handleAllDelete = useCallback(() => {
    setTitleList([]);
    setTextareaContent("");
  }, []);

  const cycleStyle = useCallback((prev, selectedTag, property, classes) => {
    const index = getLastItemIndex(prev, selectedTag);
    if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
    const i = prev.length - 1 - index;
    const currentValue = prev[i][property];
    const currentIndex = classes.indexOf(currentValue || "");
    const nextValue = classes[(currentIndex + 1) % classes.length];
    return updateListItem(prev, i, { [property]: nextValue });
  }, [getLastItemIndex, updateListItem]);

  const handleLeftSpacing = useCallback(() => {
    setTitleList((prev) => cycleStyle(prev, selectedTag, "marginLeft", ["", "mgl10", "mgl20", "mgl30", "mgl40", "mgl50"]));
  }, [selectedTag, cycleStyle]);

  const handleTopSpacing = useCallback(() => {
    setTitleList((prev) => cycleStyle(prev, selectedTag, "marginTop", ["", "mgt10", "mgt20", "mgt30", "mgt40", "mgt50"]));
  }, [selectedTag, cycleStyle]);

  const handleColorChanging = useCallback(() => {
    setTitleList((prev) => cycleStyle(prev, selectedTag, "color", ["", "pc_blue", "pc_red", "pc_navy", "pc_org", "pc_green", "pc_yellow", "pc_gray", "pc_black"]));
  }, [selectedTag, cycleStyle]);

  const handleBgColorChanging = useCallback(() => {
    setTitleList((prev) => cycleStyle(prev, selectedTag, "bgColor", ["", "bg_blue", "bg_red", "bg_navy", "bg_org", "bg_green", "bg_yellow", "bg_gray", "bg_black"]));
  }, [selectedTag, cycleStyle]);

  const handleFontSizeChanging = useCallback(() => {
    setTitleList((prev) => cycleStyle(prev, selectedTag, "fontSize", ["", "fs12", "fs14", "fs16", "fs18", "fs20", "fs22", "fs24", "fs26"]));
  }, [selectedTag, cycleStyle]);

  const handleFontWeightChanging = useCallback(() => {
    setTitleList((prev) => cycleStyle(prev, selectedTag, "fontWeight", ["", "Tline_b", "font_Fr", "font_Fm", "font_Fb"]));
  }, [selectedTag, cycleStyle]);

  const handleBox = useCallback(() => {
    const boxClasses = ["", "box_st1", "box_st2", "box_st3"];
    const nextBoxClass = boxClasses[(boxClasses.indexOf(currentBoxClass || "") + 1) % boxClasses.length];
    setCurrentBoxClass(nextBoxClass);
    setTitleList((prev) =>
      prev.map((item) => ({
        ...item,
        boxClass: item.committed ? item.boxClass : nextBoxClass,
        groupId: item.committed ? item.groupId : currentGroupId,
      }))
    );
  }, [currentBoxClass, currentGroupId]);

  const handleBoxCommit = useCallback(() => {
    if (textareaContent.trim()) handleButtonClick();
    setCurrentBoxClass("");
    setCurrentGroupId(uuidv4());
    setTextareaContent("");
  }, [textareaContent, handleButtonClick]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleButtonClick();
      }
    },
    [handleButtonClick]
  );

  const handleList = useCallback(() => {
    setContentList((prev) => !prev);
  }, []);

  const handleSaveDocument = useCallback(() => {
    if (textareaContent.trim()) handleButtonClick(); // 저장 전 임시 내용 자동 등록
    if (!documentName.trim() || titleList.length === 0) {
      alert("문서 이름과 콘텐츠를 입력하세요.");
      return;
    }
    const newDoc = {
      id: currentDocumentId || uuidv4(),
      name: documentName,
      content: titleList,
    };
    setDocuments((prev) => {
      let updatedDocs = currentDocumentId
        ? prev.map((doc) => (doc.id === currentDocumentId ? newDoc : doc))
        : [...prev, newDoc];
      localStorage.setItem("editorDocuments", JSON.stringify(updatedDocs));
      return updatedDocs;
    });
    setTitleList([]);
    setTextareaContent("");
    setCurrentBoxClass("");
    setCurrentGroupId(uuidv4());
    setDocumentName("");
    setCurrentDocumentId(null);
    setSelectedTag("tit1");
    setContentList(false);
    alert("문서가 저장되었습니다. 새로운 페이지를 작성할 수 있습니다.");
  }, [documentName, titleList, currentDocumentId, textareaContent, handleButtonClick]);

  const loadDocument = useCallback(
    (id) => {
      const doc = documents.find((d) => d.id === id);
      if (doc) {
        setTitleList(doc.content);
        setCurrentDocumentId(id);
        setDocumentName(doc.name);
        setTextareaContent("");
        setCurrentBoxClass("");
        setCurrentGroupId(uuidv4());
      }
    },
    [documents]
  );

  const deleteDocument = useCallback(
    (id) => {
      setDocuments((prev) => {
        const updatedDocs = prev.filter((d) => d.id !== id);
        localStorage.setItem("editorDocuments", JSON.stringify(updatedDocs));
        if (id === currentDocumentId) {
          setTitleList([]);
          setCurrentDocumentId(null);
          setDocumentName("");
          setTextareaContent("");
          setCurrentBoxClass("");
          setCurrentGroupId(null);
        }
        return updatedDocs;
      });
      alert("문서가 삭제되었습니다.");
    },
    [currentDocumentId]
  );

  const groupedTitleList = useMemo(() => groupByBoxClass(titleList), [titleList, groupByBoxClass]);

  const renderNestedList = useCallback((items, startIndex = 0) => {
    const result = [];
    let i = startIndex;
    while (i < items.length) {
      const item = items[i];
      const baseTag = item.tag;
      if (baseTag === "list_st1") {
        const list1Items = [];
        let j = i;
        while (j < items.length && items[j].tag === "list_st1") {
          const list1Item = items[j];
          const list2Items = [];
          let k = j + 1;
          while (k < items.length && items[k].tag === "list_st2") {
            const list2Item = items[k];
            const list3Items = [];
            let m = k + 1;
            while (m < items.length && items[m].tag === "list_st3") {
              list3Items.push(items[m]);
              m++;
            }
            list2Items.push({ ...list2Item, children: list3Items.length > 0 ? (
              <ul className="list_st3">
                {list3Items.map((list3Item) => (
                  <li key={list3Item.id} className={getClassNames([list3Item.marginLeft, list3Item.marginTop, list3Item.color, list3Item.bgColor, list3Item.fontSize, list3Item.fontWeight]) || undefined}>
                    {list3Item.content}
                  </li>
                ))}
              </ul>
            ) : null });
            k = m;
          }
          list1Items.push({ ...list1Item, children: list2Items.length > 0 ? (
            <ul className="list_st2">
              {list2Items.map((list2Item) => (
                <li key={list2Item.id} className={getClassNames([list2Item.marginLeft, list2Item.marginTop, list2Item.color, list2Item.bgColor, list2Item.fontSize, list2Item.fontWeight]) || undefined}>
                  {list2Item.content}
                  {list2Item.children}
                </li>
              ))}
            </ul>
          ) : null });
          j = k;
        }
        result.push(
          <ul key={`list-group-${i}`} className="list_st1">
            {list1Items.map((list1Item) => (
              <li key={list1Item.id} className={getClassNames([list1Item.marginLeft, list1Item.marginTop, list1Item.color, list1Item.bgColor, list1Item.fontSize, list1Item.fontWeight]) || undefined}>
                {list1Item.content}
                {list1Item.children}
              </li>
            ))}
          </ul>
        );
        i = j;
      } else {
        result.push(
          tagMap[baseTag](
            item.content,
            baseTag,
            item.marginLeft,
            item.marginTop,
            item.color,
            item.bgColor,
            item.fontSize,
            item.fontWeight
          )
        );
        i++;
      }
    }
    return result;
  }, []);

  return (
    <div className={subContent}>
      {groupedTitleList.map(({ boxClass, groupId, items }, index) => (
        <React.Fragment key={`${groupId}-${index}`}>
          {boxClass ? (
            <div className={boxClass}>
              <div className="inner">{renderNestedList(items)}</div>
            </div>
          ) : (
            renderNestedList(items)
          )}
        </React.Fragment>
      ))}

      <div className="box_st1">
        <div className="inner">
          <input
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            placeholder="컨텐츠 제목을 입력하세요."
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <div className={listBox}>
            <select value={selectedTag} onChange={handleTagChange}>
              {tagOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {selectedTag && (
              <>
                <button className="btn_gr" onClick={handleLeftSpacing}>
                  왼쪽 간격
                </button>
                <button className="btn_gr" onClick={handleTopSpacing}>
                  상단 간격
                </button>
                <button className="btn_pur" onClick={handleColorChanging}>
                  색상
                </button>
                <button className="btn_pur" onClick={handleBgColorChanging}>
                  텍스트 배경
                </button>
                <button className="btn_pur" onClick={handleFontSizeChanging}>
                  폰트 크기
                </button>
                <button className="btn_pur" onClick={handleFontWeightChanging}>
                  폰트 굵기
                </button>
                <button className="btn_org" onClick={handleBox}>
                  박스
                </button>
                {currentBoxClass && (
                  <button className="btn_org" onClick={handleBoxCommit}>
                    박스 등록
                  </button>
                )}
              </>
            )}
          </div>
          <div className={textAreaBox}>
            <textarea
              style={{ width: "100%", minHeight: "5rem" }}
              className="txtArea mgt20"
              value={textareaContent}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={`내용을 입력하세요 ${selectedTag === "tbl_st1" ? "(테이블: 한글이나 엑셀에서 데이터 붙여넣기)" : ""}`}
            />
          </div>
          <div className="btns ar">
            <button className="btn_gr" onClick={handleList}>
              목록
            </button>
            <button className="btn_Dbl" onClick={handleButtonClick} disabled={!textareaContent.trim()}>
              등록
            </button>
            <button className="btn_Dbl" onClick={handleSaveDocument}>
              저장
            </button>
            <button className="btn_red" onClick={handleDelete}>
              삭제
            </button>
            <button className="btn_red" onClick={handleAllDelete}>
              전부 삭제
            </button>
          </div>
        </div>
      </div>

      {contentList && (
        <div className={modal.modalPopWrap}>
          <div className={modal.modalPop}>
            <div className={modal.contWrap}>
              <h5 className="tit3">저장된 컨텐츠 목록</h5>
              {documents.length === 0 ? (
                <p className="bu_st1">저장된 컨텐츠가 없습니다.</p>
              ) : (
                <ul className={modal.contList}>
                  {documents.map((doc) => (
                    <li key={doc.id}>
                      <span>{doc.name}</span>
                      <div className={modal.buttonWrap}>
                        <button className="btn_Dbl mini" onClick={() => loadDocument(doc.id)}>
                          불러오기
                        </button>
                        <button
                          className="btn_red mini"
                          onClick={() => deleteDocument(doc.id)}
                          style={{ marginLeft: "5px" }}
                        >
                          삭제
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={modal.back}>
              <button className="btn_gr" onClick={handleList}>
                돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
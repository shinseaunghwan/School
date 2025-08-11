"use client";
import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { WidgetContext } from "../App";
import { v4 as uuidv4 } from "uuid";

// 태그 매핑: HTML 요소와 스타일을 정의
const tagMap = {
  tit1: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h3 className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </h3>
  ),
  tit2: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h4 className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </h4>
  ),
  tit3: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h5 className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </h5>
  ),
  bu_st1: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </p>
  ),
  bu_st2: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </p>
  ),
  bu_st3: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </p>
  ),
  bu_atte: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </p>
  ),
  bu_wnrn: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </p>
  ),
  bu_ment: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>
      {content}
    </p>
  ),
  list_st1: (content, marginLeft, marginTop, color, bgColor, fontSize, fontWeight, children) => {
    const classNames = [marginLeft, marginTop, color, bgColor, fontSize, fontWeight].filter(Boolean).join(" ").trim();
    return (
      <ul className="list_st1">
        <li className={classNames || undefined}>
          {content}
          {children}
        </li>
      </ul>
    );
  },
  list_st2: (content, marginLeft, marginTop, color, bgColor, fontSize, fontWeight, children) => {
    const classNames = [marginLeft, marginTop, color, bgColor, fontSize, fontWeight].filter(Boolean).join(" ").trim();
    return (
      <ul className="list_st2">
        <li className={classNames || undefined}>
          {content}
          {children}
        </li>
      </ul>
    );
  },
  list_st3: (content, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => {
    const classNames = [marginLeft, marginTop, color, bgColor, fontSize, fontWeight].filter(Boolean).join(" ").trim();
    return (
      <ul className="list_st3">
        <li className={classNames || undefined}>{content}</li>
      </ul>
    );
  },
};

// 태그 선택 옵션
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
];

export default function SubWrap() {
  const { subContent, listBox, textAreaBox } = useContext(WidgetContext);
  const [textareaContent, setTextareaContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("tit1");
  const [titleList, setTitleList] = useState([]); // 현재 편집 중인 콘텐츠
  const [currentBoxClass, setCurrentBoxClass] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [contentList, setContentList] = useState(false);
  // 새 상태: 문서 관리
  const [documents, setDocuments] = useState([]); // 로컬 스토리지의 문서 목록
  const [currentDocumentId, setCurrentDocumentId] = useState(null); // 현재 문서 ID
  const [documentName, setDocumentName] = useState(""); // 문서 이름 입력

  // 로컬 스토리지에서 문서 목록 불러오기 (마운트 시 한 번만)
  useEffect(() => {
    const storedDocs = localStorage.getItem("editorDocuments");
    if (storedDocs) {
      try {
        const parsedDocs = JSON.parse(storedDocs);
        setDocuments(parsedDocs);
      } catch (error) {
        console.error("로컬 스토리지 파싱 에러:", error);
      }
    }
  }, []);

  // titleList 변경 시 현재 문서에 자동 저장
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

  // 최적화: 함수 메모이제이션
  const getLastItemIndex = useCallback(
    (list, tag) => list.slice().reverse().findIndex((item) => item.tag === tag),
    []
  );

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
  }, [titleList]);

  const handleAllDelete = useCallback(() => {
    if (titleList.length) {
      setTitleList([]);
      setTextareaContent("");
    }
  }, [titleList]);

  const handleLeftSpacing = useCallback(() => {
    setTitleList((prev) => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentMarginLeft = prev[i].marginLeft;
      const marginClasses = ["", "mgl10", "mgl20", "mgl30", "mgl40", "mgl50"];
      const currentMarginIndex = marginClasses.indexOf(currentMarginLeft || "");
      const nextMarginClass = marginClasses[(currentMarginIndex + 1) % marginClasses.length];
      return updateListItem(prev, i, { marginLeft: nextMarginClass });
    });
  }, [selectedTag, getLastItemIndex, updateListItem]);

  const handleTopSpacing = useCallback(() => {
    setTitleList((prev) => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentMarginTop = prev[i].marginTop;
      const marginClasses = ["", "mgt10", "mgt20", "mgt30", "mgt40", "mgt50"];
      const currentMarginIndex = marginClasses.indexOf(currentMarginTop || "");
      const nextMarginClass = marginClasses[(currentMarginIndex + 1) % marginClasses.length];
      return updateListItem(prev, i, { marginTop: nextMarginClass });
    });
  }, [selectedTag, getLastItemIndex, updateListItem]);

  const handleColorChanging = useCallback(() => {
    setTitleList((prev) => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentColor = prev[i].color;
      const colorClasses = ["", "pc_blue", "pc_red", "pc_navy", "pc_org", "pc_green", "pc_yellow", "pc_gray", "pc_black"];
      const currentColorIndex = colorClasses.indexOf(currentColor || "");
      const nextColorClass = colorClasses[(currentColorIndex + 1) % colorClasses.length];
      return updateListItem(prev, i, { color: nextColorClass });
    });
  }, [selectedTag, getLastItemIndex, updateListItem]);

  const handleBgColorChanging = useCallback(() => {
    setTitleList((prev) => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentBgColor = prev[i].bgColor;
      const bgColorClasses = ["", "bg_blue", "bg_red", "bg_navy", "bg_org", "bg_green", "bg_yellow", "bg_gray", "bg_black"];
      const currentBgColorIndex = bgColorClasses.indexOf(currentBgColor || "");
      const nextBgColorClass = bgColorClasses[(currentBgColorIndex + 1) % bgColorClasses.length];
      return updateListItem(prev, i, { bgColor: nextBgColorClass });
    });
  }, [selectedTag, getLastItemIndex, updateListItem]);

  const handleFontSizeChanging = useCallback(() => {
    setTitleList((prev) => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentFontSize = prev[i].fontSize;
      const fontSizeClasses = ["", "fs12", "fs14", "fs16", "fs18", "fs20", "fs22", "fs24", "fs26"];
      const currentFontSizeIndex = fontSizeClasses.indexOf(currentFontSize || "");
      const nextFontSizeClass = fontSizeClasses[(currentFontSizeIndex + 1) % fontSizeClasses.length];
      return updateListItem(prev, i, { fontSize: nextFontSizeClass });
    });
  }, [selectedTag, getLastItemIndex, updateListItem]);

  const handleFontWeightChanging = useCallback(() => {
    setTitleList((prev) => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentFontWeight = prev[i].fontWeight;
      const fontWeightClasses = ["", "Tline_b", "font_Fr", "font_Fm", "font_Fb"];
      const currentFontWeightIndex = fontWeightClasses.indexOf(currentFontWeight || "");
      const nextFontWeightClass = fontWeightClasses[(currentFontWeightIndex + 1) % fontWeightClasses.length];
      return updateListItem(prev, i, { fontWeight: nextFontWeightClass });
    });
  }, [selectedTag, getLastItemIndex, updateListItem]);

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
    if (textareaContent.trim()) {
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
    }
    setCurrentBoxClass("");
    setCurrentGroupId(uuidv4());
    setTextareaContent("");
  }, [textareaContent, selectedTag, currentBoxClass, currentGroupId, getLastItemIndex]);

const handleKeyDown = useCallback(
  (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleButtonClick();
    }
  },
  [handleButtonClick]
);

const handleList = () => {
setContentList(!contentList);
}

  // 새 함수: 문서 저장
  const handleSaveDocument = useCallback(() => {
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
      let updatedDocs;
      if (currentDocumentId) {
        // 기존 문서 업데이트
        updatedDocs = prev.map((doc) => (doc.id === currentDocumentId ? newDoc : doc));
      } else {
        // 새 문서 추가
        updatedDocs = [...prev, newDoc];
      }
      localStorage.setItem("editorDocuments", JSON.stringify(updatedDocs));
      return updatedDocs;
    });

    setCurrentDocumentId(newDoc.id);
    setDocumentName("");
    alert(`문서 "${newDoc.name}"이(가) 저장되었습니다.`);
  }, [documentName, titleList, currentDocumentId]);

  // 새 함수: 문서 불러오기
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

  // 새 함수: 문서 삭제
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

  // 렌더링 최적화: 그룹화된 리스트 메모이제이션
  const groupedTitleList = useMemo(() => groupByBoxClass(titleList), [titleList, groupByBoxClass]);

  // 리스트 렌더링 함수 (useCallback으로 메모)
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

            list2Items.push({ ...list2Item, children: list3Items });
            k = m;
          }

          list1Items.push({ ...list1Item, children: list2Items });
          j = k;
        }

        if (list1Items.length) {
          const listContent = list1Items.map((list1Item) => {
            const classNames1 = [list1Item.marginLeft, list1Item.marginTop, list1Item.color, list1Item.bgColor, list1Item.fontSize, list1Item.fontWeight]
              .filter(Boolean)
              .join(" ")
              .trim();
            return (
              <li key={list1Item.id} className={classNames1 || undefined}>
                {list1Item.content}
                {list1Item.children.length > 0 && (
                  <ul className="list_st2">
                    {list1Item.children.map((list2Item) => {
                      const classNames2 = [list2Item.marginLeft, list2Item.marginTop, list2Item.color, list2Item.bgColor, list2Item.fontSize, list2Item.fontWeight]
                        .filter(Boolean)
                        .join(" ")
                        .trim();
                      return (
                        <li key={list2Item.id} className={classNames2 || undefined}>
                          {list2Item.content}
                          {list2Item.children.length > 0 && (
                            <ul className="list_st3">
                              {list2Item.children.map((list3Item) => {
                                const classNames3 = [
                                  list3Item.marginLeft,
                                  list3Item.marginTop,
                                  list3Item.color,
                                  list3Item.bgColor,
                                  list3Item.fontSize,
                                  list3Item.fontWeight,
                                ]
                                  .filter(Boolean)
                                  .join(" ")
                                  .trim();
                                return (
                                  <li key={list3Item.id} className={classNames3 || undefined}>
                                    {list3Item.content}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          });

          result.push(
            <ul key={`list-group-${i}`} className="list_st1">
              {listContent}
            </ul>
          );
        }

        i = j;
      } else {
        const classNames = [item.marginLeft, item.marginTop, item.color, item.bgColor, item.fontSize, item.fontWeight].filter(Boolean).join(" ").trim();
        result.push(tagMap[baseTag](item.content, baseTag, item.marginLeft, item.marginTop, item.color, item.bgColor, item.fontSize, item.fontWeight, classNames));
        i++;
      }
    }

    return result;
  }, []);

  return (
    <div className={subContent}>
      {/* 콘텐츠 렌더링 */}
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
          {contentList && (
  <>
    <h4>저장된 문서 목록</h4>
    {documents.length === 0 ? (
      <p>저장된 문서가 없습니다.</p>
    ) : (
      <ul className="">
        {documents.map((doc) => (
          <li key={doc.id}>
            <span style={{ marginRight: "10px" }}>&middot; {doc.name}</span>
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
          </li>
        ))}
      </ul>
    )}
  </>
)}
           <input
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            placeholder="문서 이름을 입력하세요"
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
              placeholder="내용을 입력하세요"
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
            {currentDocumentId ? "문서 업데이트" : "새 문서 저장"}
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
    </div>
  );
}
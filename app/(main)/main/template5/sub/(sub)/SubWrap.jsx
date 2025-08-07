"use client";
import React, { useContext, useState, useEffect } from "react";
import { WidgetContext } from "../App";
import { v4 as uuidv4 } from "uuid";

const tagMap = {
  tit1: (content, className) => <h3 className={className}>{content}</h3>,
  tit2: (content, className) => <h4 className={className}>{content}</h4>,
  tit3: (content, className) => <h5 className={className}>{content}</h5>,
  list_st1: (content, className) => <ul className={className}><li>{content}</li></ul>,
  list_st2: (content, className) => <ul className={className}><li>{content}</li></ul>,
  list_st3: (content, className) => <ul className={className}><li>{content}</li></ul>,
};

const tagOptions = [
  { value: "tit1", label: "제목1 (h3)" },
  { value: "tit2", label: "제목2 (h4)" },
  { value: "tit3", label: "제목3 (h5)" },
  { value: "list_st1", label: "리스트1" },
  { value: "list_st2", label: "리스트2" },
  { value: "list_st3", label: "리스트3" },
];

export default function SubWrap() {
  const { subContent, listBox, textAreaBox } = useContext(WidgetContext);
  const [textareaContent, setTextareaContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("tit1");
  const [titleList, setTitleList] = useState([]);
  const [currentBoxClass, setCurrentBoxClass] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState(null);

  useEffect(() => {
    if (titleList.length && titleList[titleList.length - 1].committed) {
      setTextareaContent("");
    }
  }, [titleList]);

  const getLastItemIndex = (list, tag) =>
    list.slice().reverse().findIndex(item => 
      item.tag === tag || item.tag.startsWith(`${tag} mgl`)
    );

  const updateListItem = (list, index, updates) => {
    const updatedList = [...list];
    updatedList[index] = { ...updatedList[index], ...updates };
    return updatedList;
  };

  const groupByBoxClass = (list) => {
    const groups = [];
    let currentGroup = { boxClass: null, groupId: null, items: [] };
    list.forEach(item => {
      if (item.boxClass !== currentGroup.boxClass || item.groupId !== currentGroup.groupId) {
        if (currentGroup.items.length) groups.push(currentGroup);
        currentGroup = { boxClass: item.boxClass, groupId: item.groupId, items: [] };
      }
      currentGroup.items.push(item);
    });
    if (currentGroup.items.length) groups.push(currentGroup);
    return groups;
  };

  const handleTextareaChange = ({ target: { value } }) => {
    setTextareaContent(value);
    if (!value.trim()) {
      setTitleList(prev => {
        const index = getLastItemIndex(prev, selectedTag);
        return index === -1 || prev[prev.length - 1 - index].committed 
          ? prev 
          : prev.filter((_, i) => i !== prev.length - 1 - index);
      });
      return;
    }

    setTitleList(prev => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index !== -1) {
        const i = prev.length - 1 - index;
        if (!prev[i].committed) {
          return updateListItem(prev, i, { content: value, boxClass: currentBoxClass || null, groupId: currentGroupId });
        }
      }
      return [
        ...prev,
        { id: uuidv4(), tag: selectedTag, content: value, committed: false, boxClass: currentBoxClass || null, groupId: currentGroupId },
      ];
    });
  };

  const handleTagChange = ({ target: { value } }) => {
    if (textareaContent.trim()) handleButtonClick();
    setSelectedTag(value);
  };

  const handleButtonClick = () => {
    if (!textareaContent.trim()) return;
    setTitleList(prev => {
      const index = getLastItemIndex(prev, selectedTag);
      let updatedList = prev;
      let currentTag = selectedTag;
      if (index !== -1) {
        const i = prev.length - 1 - index;
        if (!prev[i].committed) {
          currentTag = prev[i].tag;
          updatedList = prev.filter((_, idx) => idx !== i);
        }
      }
      return [
        ...updatedList,
        { id: uuidv4(), tag: currentTag, content: textareaContent, committed: true, boxClass: currentBoxClass || null, groupId: currentGroupId },
      ];
    });
    setTextareaContent("");
  };

  const handleDelete = () => {
    if (titleList.length) {
      setTitleList(prev => prev.slice(0, -1));
      setTextareaContent("");
    }
  };

  const handleAllDelete = () => {
    if (titleList.length) {
      setTitleList([]);
      setTextareaContent("");
    }
  };

  const handleLeftSpacing = () => {
    setTitleList(prev => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentTag = prev[i].tag;
      const marginClasses = ["", "mgl10", "mgl20", "mgl30"];
      const currentMarginIndex = marginClasses.findIndex(cls => 
        currentTag === selectedTag ? cls === "" : currentTag === `${selectedTag} ${cls}`
      );
      const nextMarginClass = marginClasses[(currentMarginIndex + 1) % marginClasses.length];
      return updateListItem(prev, i, { 
        tag: nextMarginClass ? `${selectedTag} ${nextMarginClass}` : selectedTag 
      });
    });
  };

  const handleBox = () => {
    const boxClasses = ["", "box_st1", "box_st2", "box_st3"];
    const nextBoxClass = boxClasses[(boxClasses.indexOf(currentBoxClass || "") + 1) % boxClasses.length];
    setCurrentBoxClass(nextBoxClass);
    setTitleList(prev => prev.map(item => ({
      ...item,
      boxClass: item.committed ? item.boxClass : nextBoxClass,
      groupId: item.committed ? item.groupId : currentGroupId,
    })));
  };

  const handleBoxCommit = () => {
    if (textareaContent.trim()) {
      setTitleList(prev => {
        const index = getLastItemIndex(prev, selectedTag);
        let updatedList = prev;
        let currentTag = selectedTag;
        if (index !== -1) {
          const i = prev.length - 1 - index;
          if (!prev[i].committed) {
            currentTag = prev[i].tag;
            updatedList = prev.filter((_, idx) => idx !== i);
          }
        }
        return [
          ...updatedList,
          { id: uuidv4(), tag: currentTag, content: textareaContent, committed: true, boxClass: currentBoxClass || null, groupId: currentGroupId },
        ];
      });
    }
    setCurrentBoxClass(""); // Reset boxClass for new content
    setCurrentGroupId(uuidv4()); // New group for next content
    setTextareaContent("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div className={subContent}>
      {groupByBoxClass(titleList).map(({ boxClass, groupId, items }, index) => (
        <React.Fragment key={`${groupId}-${index}`}>
          {boxClass ? (
            <div className={boxClass}>
              <div className="inner">
                {items.map(({ id, tag, content }) => {
                  const baseTag = tag.split(" ")[0];
                  const Element = tagMap[baseTag];
                  return Element ? <React.Fragment key={id}>{Element(content, tag)}</React.Fragment> : null;
                })}
              </div>
            </div>
          ) : (
            items.map(({ id, tag, content }) => {
              const baseTag = tag.split(" ")[0];
              const Element = tagMap[baseTag];
              return Element ? <React.Fragment key={id}>{Element(content, tag)}</React.Fragment> : null;
            })
          )}
        </React.Fragment>
      ))}
      <div className="box_st1">
        <div className="inner">
          <div className={listBox}>
            <select value={selectedTag} onChange={handleTagChange}>
              {tagOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {selectedTag && (
              <>
                <button className="btn_Dbl" onClick={handleLeftSpacing}>왼쪽 간격</button>
                <button className="btn_Dbl" onClick={handleBox}>박스</button>
                {currentBoxClass && (
                  <button 
                    className="btn_Dbl" 
                    onClick={handleBoxCommit}
                  >
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
              placeholder=""
            />
          </div>
          <div className="btns ar">
            <button
              className="btn_Dbl"
              onClick={handleButtonClick}
              disabled={!textareaContent.trim()}
            >
              등록
            </button>
            <button className="btn_red" onClick={handleDelete}>삭제</button>
            <button className="btn_red" onClick={handleAllDelete}>전부 삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}
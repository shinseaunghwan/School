"use client";
import React, { useContext, useState, useEffect } from "react";
import { WidgetContext } from "../App";
import { v4 as uuidv4 } from "uuid";

const tagMap = {
  tit1: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h3 className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</h3>
  ),
  tit2: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h4 className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</h4>
  ),
  tit3: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <h5 className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</h5>
  ),
  bu_st1: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</p>
  ),
  bu_st2: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</p>
  ),
  bu_st3: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</p>
  ),
  bu_atte: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</p>
  ),
  bu_wnrn: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</p>
  ),
  bu_ment: (content, className, marginLeft, marginTop, color, bgColor, fontSize, fontWeight) => (
    <p className={`${className} ${marginLeft || ""} ${marginTop || ""} ${color || ""} ${bgColor || ""} ${fontSize || ""} ${fontWeight || ""}`.trim()}>{content}</p>
  ),
  list_st1: (content, marginLeft, marginTop, color, bgColor, fontSize, fontWeight, children) => {
    const classNames = [marginLeft, marginTop, color, bgColor, fontSize, fontWeight].filter(Boolean).join(" ").trim();
    return (
      <ul className="list_st1">
        <li className={classNames || undefined}>{content}{children}</li>
      </ul>
    );
  },
  list_st2: (content, marginLeft, marginTop, color, bgColor, fontSize, fontWeight, children) => {
    const classNames = [marginLeft, marginTop, color, bgColor, fontSize, fontWeight].filter(Boolean).join(" ").trim();
    return (
      <ul className="list_st2">
        <li className={classNames || undefined}>{content}{children}</li>
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
  const [titleList, setTitleList] = useState([]);
  const [currentBoxClass, setCurrentBoxClass] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState(null);

  useEffect(() => {
    if (titleList.length && titleList[titleList.length - 1].committed) {
      setTextareaContent("");
    }
  }, [titleList]);

  const getLastItemIndex = (list, tag) =>
    list.slice().reverse().findIndex(item => item.tag === tag);

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
      const currentMarginLeft = prev[i].marginLeft;
      const marginClasses = ["", "mgl10", "mgl20", "mgl30", "mgl40", "mgl50"];
      const currentMarginIndex = marginClasses.indexOf(currentMarginLeft || "");
      const nextMarginClass = marginClasses[(currentMarginIndex + 1) % marginClasses.length];
      return updateListItem(prev, i, { marginLeft: nextMarginClass });
    });
  };

  const handleTopSpacing = () => {
    setTitleList(prev => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentMarginTop = prev[i].marginTop;
      const marginClasses = ["", "mgt10", "mgt20", "mgt30", "mgt40", "mgt50"];
      const currentMarginIndex = marginClasses.indexOf(currentMarginTop || "");
      const nextMarginClass = marginClasses[(currentMarginIndex + 1) % marginClasses.length];
      return updateListItem(prev, i, { marginTop: nextMarginClass });
    });
  };

  const handleColorChanging = () => {
    setTitleList(prev => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentColor = prev[i].color;
      const colorClasses = ["", "pc_blue", "pc_red", "pc_navy", "pc_org", "pc_green", "pc_yellow", "pc_gray", "pc_black"];
      const currentColorIndex = colorClasses.indexOf(currentColor || "");
      const nextColorClass = colorClasses[(currentColorIndex + 1) % colorClasses.length];
      return updateListItem(prev, i, { color: nextColorClass });
    });
  };

  const handleBgColorChanging = () => {
    setTitleList(prev => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentBgColor = prev[i].bgColor;
      const bgColorClasses = ["", "bg_blue", "bg_red", "bg_navy", "bg_org", "bg_green", "bg_yellow", "bg_gray", "bg_black"];
      const currentBgColorIndex = bgColorClasses.indexOf(currentBgColor || "");
      const nextBgColorClass = bgColorClasses[(currentBgColorIndex + 1) % bgColorClasses.length];
      return updateListItem(prev, i, { bgColor: nextBgColorClass });
    });
  };

  const handleFontSizeChanging = () => {
    setTitleList(prev => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentFontSize = prev[i].fontSize;
      const fontSizeClasses = ["", "fs12", "fs14", "fs16", "fs18", "fs20", "fs22", "fs24", "fs26"];
      const currentFontSizeIndex = fontSizeClasses.indexOf(currentFontSize || "");
      const nextFontSizeClass = fontSizeClasses[(currentFontSizeIndex + 1) % fontSizeClasses.length];
      return updateListItem(prev, i, { fontSize: nextFontSizeClass });
    });
  };

  const handleFontWeightChanging = () => {
    setTitleList(prev => {
      const index = getLastItemIndex(prev, selectedTag);
      if (index === -1 || prev[prev.length - 1 - index].committed) return prev;
      const i = prev.length - 1 - index;
      const currentFontWeight = prev[i].fontWeight;
      const fontWeightClasses = ["", "Tline_b", "font_Fr", "font_Fm", "font_Fb"];
      const currentFontWeightIndex = fontWeightClasses.indexOf(currentFontWeight || "");
      const nextFontWeightClass = fontWeightClasses[(currentFontWeightIndex + 1) % fontWeightClasses.length];
      return updateListItem(prev, i, { fontWeight: nextFontWeightClass });
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
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleButtonClick();
    }
  };

  const renderNestedList = (items, startIndex = 0) => {
    const result = [];
    let i = startIndex;

    while (i < items.length) {
      const item = items[i];
      const baseTag = item.tag;

      if (baseTag === "list_st1") {
        const list1Items = [];
        let j = i;

        // list_st1 그룹 수집
        while (j < items.length && items[j].tag === "list_st1") {
          const list1Item = items[j];
          const list2Items = [];
          let k = j + 1;

          // list_st2 항목 수집
          while (k < items.length && items[k].tag === "list_st2") {
            const list2Item = items[k];
            const list3Items = [];
            let m = k + 1;

            // list_st3 항목 수집
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

        // list_st1 렌더링
        if (list1Items.length) {
          const listContent = list1Items.map(list1Item => {
            const classNames1 = [list1Item.marginLeft, list1Item.marginTop, list1Item.color, list1Item.bgColor, list1Item.fontSize, list1Item.fontWeight].filter(Boolean).join(" ").trim();
            return (
              <li
                key={list1Item.id}
                className={classNames1 || undefined}
              >
                {list1Item.content}
                {list1Item.children.length > 0 && (
                  <ul className="list_st2">
                    {list1Item.children.map(list2Item => {
                      const classNames2 = [list2Item.marginLeft, list2Item.marginTop, list2Item.color, list2Item.bgColor, list2Item.fontSize, list2Item.fontWeight].filter(Boolean).join(" ").trim();
                      return (
                        <li
                          key={list2Item.id}
                          className={classNames2 || undefined}
                        >
                          {list2Item.content}
                          {list2Item.children.length > 0 && (
                            <ul className="list_st3">
                              {list2Item.children.map(list3Item => {
                                const classNames3 = [list3Item.marginLeft, list3Item.marginTop, list3Item.color, list3Item.bgColor, list3Item.fontSize, list3Item.fontWeight].filter(Boolean).join(" ").trim();
                                return (
                                  <li
                                    key={list3Item.id}
                                    className={classNames3 || undefined}
                                  >
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
  };

  return (
    <div className={subContent}>
      {groupByBoxClass(titleList).map(({ boxClass, groupId, items }, index) => (
        <React.Fragment key={`${groupId}-${index}`}>
          {boxClass ? (
            <div className={boxClass}>
              <div className="inner">
                {renderNestedList(items)}
              </div>
            </div>
          ) : (
            renderNestedList(items)
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
                <button className="btn_gr" onClick={handleLeftSpacing}>왼쪽 간격</button>
                <button className="btn_gr" onClick={handleTopSpacing}>상단 간격</button>
                <button className="btn_pur" onClick={handleColorChanging}>색상</button>
                <button className="btn_pur" onClick={handleBgColorChanging}>텍스트 배경</button>
                <button className="btn_pur" onClick={handleFontSizeChanging}>폰트 크기</button>
                <button className="btn_pur" onClick={handleFontWeightChanging}>폰트 굵기</button>
                <button className="btn_org" onClick={handleBox}>박스</button>
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
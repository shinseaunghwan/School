
"use client";
import React, { useContext, useState } from "react";
import { WidgetContext } from "../App";
import { v4 as uuidv4 } from "uuid";

export default function SubWrap() {
  const widget = useContext(WidgetContext);
  const [textareaContent, setTextareaContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("tit1");
  const [titleList, setTitleList] = useState([]);

  const handleTextareaChange = (event) => {
    const newValue = event.target.value;
    setTextareaContent(newValue);

    // Find the most recent item with tag matching selectedTag or selectedTag + " mgl10"
    setTitleList((prev) => {
      const lastItemIndex = prev
        .slice()
        .reverse()
        .findIndex(
          (item) => item.tag === selectedTag || item.tag === `${selectedTag} mgl10`
        );

      if (lastItemIndex === -1) return prev; // No matching item, keep titleList unchanged

      const index = prev.length - 1 - lastItemIndex;
      const updatedList = [...prev];
      updatedList[index] = {
        ...updatedList[index],
        content: newValue, // Update content of the most recent matching item
      };

      return updatedList;
    });
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
    // Update textareaContent to match the content of the most recent item with the new tag
    const lastItem = titleList
      .slice()
      .reverse()
      .find(
        (item) =>
          item.tag === event.target.value || item.tag === `${event.target.value} mgl10`
      );
    setTextareaContent(lastItem ? lastItem.content : "");
  };

  const handleButtonClick = () => {
    if (textareaContent.trim() === "") return;

    // Check if the most recent item already matches selectedTag or selectedTag + " mgl10"
    const lastItemIndex = titleList
      .slice()
      .reverse()
      .findIndex(
        (item) => item.tag === selectedTag || item.tag === `${selectedTag} mgl10`
      );

    if (lastItemIndex === -1) {
      // No matching item, add a new one
      setTitleList((prev) => [
        ...prev,
        { id: uuidv4(), tag: selectedTag, content: textareaContent },
      ]);
      setTextareaContent("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleButtonClick();
    }
  };

  const handleLeftSpacing = () => {
    setTitleList((prev) => {
      const lastItemIndex = prev
        .slice()
        .reverse()
        .findIndex(
          (item) => item.tag === selectedTag || item.tag === `${selectedTag} mgl10`
        );

      if (lastItemIndex === -1) return prev;

      const index = prev.length - 1 - lastItemIndex;
      const updatedList = [...prev];
      const currentTag = updatedList[index].tag;

      updatedList[index] = {
        ...updatedList[index],
        tag: currentTag === selectedTag ? `${selectedTag} mgl10` : selectedTag,
      };

      return updatedList;
    });
  };

  return (
    <div className={widget.subContent}>
      {titleList.map((item) => (
        <React.Fragment key={item.id}>
          {item.tag === "tit1" ? (
            <h3 className="tit1">{item.content}</h3>
          ) : item.tag === "tit1 mgl10" ? (
            <h3 className="tit1 mgl10">{item.content}</h3>
          ) : item.tag === "tit2" ? (
            <h4 className="tit2">{item.content}</h4>
          ) : item.tag === "tit2 mgl10" ? (
            <h4 className="tit2 mgl10">{item.content}</h4>
          ) : item.tag === "tit3" ? (
            <h5 className="tit3">{item.content}</h5>
          ) : item.tag === "tit3 mgl10" ? (
            <h5 className="tit3 mgl10">{item.content}</h5>
          ) : item.tag === "list_st1" ? (
            <ul className="list_st1">
              <li>{item.content}</li>
            </ul>
          ) : item.tag === "list_st1 mgl10" ? (
            <ul className="list_st1 mgl10">
              <li>{item.content}</li>
            </ul>
          ) : item.tag === "list_st2" ? (
            <ul className="list_st2">
              <li>{item.content}</li>
            </ul>
          ) : item.tag === "list_st2 mgl10" ? (
            <ul className="list_st2 mgl10">
              <li>{item.content}</li>
            </ul>
          ) : item.tag === "list_st3" ? (
            <ul className="list_st3">
              <li>{item.content}</li>
            </ul>
          ) : item.tag === "list_st3 mgl10" ? (
            <ul className="list_st3 mgl10">
              <li>{item.content}</li>
            </ul>
          ) : null}
        </React.Fragment>
      ))}
      <div className="box_st1">
        <div className="inner">
          <div className={widget.listBox}>
            <select value={selectedTag} onChange={handleTagChange}>
              <option value="tit1">제목1 (h3)</option>
              <option value="tit2">제목2 (h4)</option>
              <option value="tit3">제목3 (h5)</option>
              <option value="list_st1">리스트1</option>
              <option value="list_st2">리스트2</option>
              <option value="list_st3">리스트3</option>
            </select>
            {selectedTag === "tit1" && (
                <button className="btn_Dbl" onClick={handleLeftSpacing}>
                  왼쪽 간격
                </button>
            )}
          </div>
          <div className={widget.textAreaBox}>
            <textarea
              style={{ width: "100%", minHeight: "5rem" }}
              className="txtArea mgt20"
              value={textareaContent}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder=""
            ></textarea>
          </div>
          <div className="btns ar">
            <button className="btn_Dbl" onClick={handleButtonClick}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

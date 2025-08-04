"use client";
import React, { useContext } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/sub/App";

export default function Location({ items }) {
  const widget = useContext(WidgetContext);

  // menuId가 'menu1'인 항목만 필터링
  const filteredItems = items.filter((item) => item.menuId === "menu1");

  // items가 비어 있거나 필터링된 결과가 없으면 메시지 표시
  if (!items || !filteredItems.length) {
    return <div className={widget.subLoc}>메뉴 데이터가 없습니다.</div>;
  }

  return (
    <div className={widget.subLoc}>
      <ul>
        <li>
          <i className="xi-home" aria-hidden="true"></i>
        </li>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
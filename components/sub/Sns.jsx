"use client";
import React, { useContext, useState, useMemo } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/sub/App";

export default function Sns() {
  const widget = useContext(WidgetContext);
  const [isSnsOpen, setIsSnsOpen] = useState(false);

  // SNS 데이터 정의
  const snsItems = useMemo(
    () => [
      { href: "#", title: "페이스북(새창열기)", icon: "xi-facebook", label: "페이스북" },
      { href: "#", title: "트위터 공유(새창열기)", icon: "xi-twitter", label: "트위터" },
      { href: "#", title: "카카오 공유(새창열기)", icon: "xi-kakaotalk", label: "카카오" },
      { href: "#", title: "카카오스토리 공유(새창열기)", icon: "xi-kakaostory", label: "카카오스토리" }
    ],
    []
  );

  // SNS 공유 영역 토글
  const handleSnsToggle = (e) => {
    e.preventDefault();
    setIsSnsOpen((prev) => !prev);
  };
  
// 인쇄
const print = (e) => {
e.preventDefault();
 window.print();
};

  return (
    <div className={widget.snsBox}>
      <a
        href="#snsMore"
        title={isSnsOpen ? "SNS 공유영역 닫기" : "SNS 공유영역 펼치기"}
        onClick={handleSnsToggle}
      >
        <i className="xi-share-alt"></i>
      </a>
      <div
        className={`${widget.snsMore} ${isSnsOpen ? widget.active : ""}`}
        aria-hidden={!isSnsOpen}
      >
        {snsItems.map((sns, index) => (
          <a
            key={index}
            href={sns.href}
            title={sns.title}
            className={sns.className || ""}
          >
            {sns.icon && <i className={sns.icon}></i>}
            <em className="hid">{sns.label}</em>
          </a>
        ))}
      </div>
      <a href="#" className={widget.btnPrint} onClick={(e)=> print(e)}>
        <i className="xi-print"></i>
        <em className="hid">인쇄</em>
      </a>
    </div>
  );
}
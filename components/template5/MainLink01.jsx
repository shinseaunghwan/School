"use client";
import React, { useContext } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/App";
import Image from "next/image";
export default function MainLink01() {
  const widget = useContext(WidgetContext);
  const Items = [
    {
      url: "#",
      width:'91',
      height: '86',
      class: widget.blue,
      src: "/images/template/T0005/main/ico_01.png",
      tit: "예약확인 및 취소",
      id: 1,
    },
    {
      url: "#",
      width:'132',
      height: '100',
      class: widget.green,
      src: "/images/template/T0005/main/ico_02.png",
      tit: "이용안내",
      id: 2,
    },
  ];

  return (
    <div className={widget.mLink}>
      <h2 className={widget.hid}>바로가기</h2>
      <ul>
        {Items.map((item) => (
          <li key={item.id} className={item.class}>
            <a href={item.url}>
              <p className={widget.img}><Image src={item.src} alt="" width={item.width} height={item.height} /></p>
              <p className={widget.tit}>{item.tit}</p>
              <span className={widget.button}>자세히보기<i className="xi-long-arrow-right" aria-hidden="true"></i></span>

            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

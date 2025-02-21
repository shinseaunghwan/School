"use client"

import React from 'react';
// import widget from "../../styles/template2/T0002_widget.module.css"
export default function MainLink01({widget}) {
  const Items = [
    { url: '#', src: './../images/template/T0002/main/0002_icn01_link01.png', name: "교육목표", id: 1},
    { url: '#', src: './../images/template/T0002/main/0002_icn01_link02.png', name: "학습자료", id: 2},
    { url: '#', src: './../images/template/T0002/main/0002_icn01_link03.png', name: "운영위원회", id: 3},
    { url: '#', src: './../images/template/T0002/main/0002_icn01_link04.png', name: "유치원알리미", id: 4},
    { url: '#', src: './../images/template/T0002/main/0002_icn01_link05.png', name: "방과후학교", id: 5},
    { url: '#', src: './../images/template/T0002/main/0002_icn01_link06.png', name: "정보공개", id: 6},
  ];

  return (
    <div className={widget.M_link0002}>
      <ul>
        {Items.map((item) => (
          <li key={item.id}>
            <a href={item.url}>
            <div className={widget.img_box}>
                                    <span class={widget.img}><img src={item.src} alt={item.alt}/></span>
                                </div>
              <p>{item.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
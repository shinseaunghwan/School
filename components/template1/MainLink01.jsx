"use client"

import React from 'react';
import Title from "./Title"

export default function MainLink01() {
  const Items = [
    { url: './../images/template/T0030/main/0030_link01_01.png', src: './../images/template/T0030/main/0030_link01_01.png', name: "교육목표", id: 1 },
    { url: './../images/template/T0030/main/0030_link01_02.png', src: './../images/template/T0030/main/0030_link01_02.png', name: "학교알리미", id: 2 },
    { url: './../images/template/T0030/main/0030_link01_03.png', src: './../images/template/T0030/main/0030_link01_03.png', name: "방과후학교", id: 3 },
    { url: './../images/template/T0030/main/0030_link01_04.png', src: './../images/template/T0030/main/0030_link01_04.png', name: "학생소통방", id: 4 }
  ];

  return (
    <div className="M_link0030">
      <Title className="hid">바로가기</Title>
      <p className="title">
        <img src="./../images/template/T0030/main/0030_ico01_link01.png" alt="" />
        <em>학교소개</em>
      </p>
      <ul>
        {Items.map((item) => (
          <li key={item.id}>
            <a href={item.url}>
              <p className="img"><img src={item.src} alt={item.alt} /></p>
              <p className="txt"><em>{item.name}</em></p>
              <i className="xi-angle-right" aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
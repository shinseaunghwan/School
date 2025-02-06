"use client"

import React from 'react';

export default function MainLink01() {
  const Items = [
    { url: './../images/template/T0002/main/0002_icn01_link01.png', src: './../images/template/T0002/main/0002_icn01_link01.png', name: "교육목표", id: 376534561 },
    { url: './../images/template/T0002/main/0002_icn01_link02.png', src: './../images/template/T0002/main/0002_icn01_link02.png', name: "학습자료", id: 287986567 },
    { url: './../images/template/T0002/main/0002_icn01_link03.png', src: './../images/template/T0002/main/0002_icn01_link03.png', name: "운영위원회", id: 346908987 },
    { url: './../images/template/T0002/main/0002_icn01_link04.png', src: './../images/template/T0002/main/0002_icn01_link04.png', name: "유치원알리미", id: 2464487 },
    { url: './../images/template/T0002/main/0002_icn01_link05.png', src: './../images/template/T0002/main/0002_icn01_link05.png', name: "방과후학교", id: 5345224 },
    { url: './../images/template/T0002/main/0002_icn01_link06.png', src: './../images/template/T0002/main/0002_icn01_link06.png', name: "정보공개", id: 625432455423 },
  ];

  return (
    <div className="M_link0002">
      <ul>
        {Items.map((item) => (
          <li key={item.id}>
            <a href={item.url}>
            <div class="img_box">
                                    <span class="img"><img src={item.src} alt={item.alt}/></span>
                                </div>
              <p>{item.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
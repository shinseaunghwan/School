"use client"

import React from 'react';
import Title from "./Title"
import Image from 'next/image';

export default function MainLink01({widget}) {
  const Items = [
    { url: '#', src: '/images/template/T0030/main/0030_link01_01.png', name: "교육목표", id: 1 },
    { url: '#', src: '/images/template/T0030/main/0030_link01_02.png', name: "학교알리미", id: 2 },
    { url: '#', src: '/images/template/T0030/main/0030_link01_03.png', name: "방과후학교", id: 3 },
    { url: '#', src: '/images/template/T0030/main/0030_link01_04.png', name: "학생소통방", id: 4 }
  ];

  return (
    <div className={widget.M_link0030}>
      <Title className={widget.hid}>바로가기</Title>
      <p className={widget.title}>
        <Image src="/images/template/T0030/main/0030_ico01_link01.png" alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/>
        <em>학교소개</em>
      </p>
      <ul>
        {Items.map((item) => (
          <li key={item.id}>
            <a href={item.url}>
              <p className={widget.img}><Image src={item.src} alt={item.alt} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/></p>
              <p className={widget.txt}><em>{item.name}</em></p>
              <i className="xi-angle-right" aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
"use client"
import React,{ useContext } from 'react';
import { WidgetContext } from '../../app/(main)/main/template3/App';
import Image from 'next/image';

export default function MainLink01() {
  const widget = useContext(WidgetContext);
  const Items = [
    { url: '#', src: '/images/template/T0003/main/0003_icn01_link01.png', name: "학교알리미", id: 1},
    { url: '#', src: '/images/template/T0003/main/0003_icn01_link02.png', name: "교육목표", id: 2},
    { url: '#', src: '/images/template/T0003/main/0003_icn01_link03.png', name: "방과후학교", id: 3},
    { url: '#', src: '/images/template/T0003/main/0003_icn01_link04.png', name: "정보공개", id: 4},
    { url: '#', src: '/images/template/T0003/main/0003_icn01_link05.png', name: "운영위원회", id: 5},
    { url: '#', src: '/images/template/T0003/main/0003_icn01_link06.png', name: "학습자료", id: 6},
    { url: '#', src: '/images/template/T0003/main/0003_icn01_link07.png', name: "찾아오시는길", id: 7},
    { url: '#', src: '/images/template/T0003/main/0003_icn01_link08.png', name: "독서교육시스템", id: 8}
  ];

  return (
    <div className={widget.M_link0003}>
      <ul>
        {Items.map((item) => (
          <li key={item.id}>
            <a href={item.url}>
            <div className={widget.img_box}><span class={widget.img}><Image src={item.src} alt={item.alt} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/></span></div>
              <p>{item.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
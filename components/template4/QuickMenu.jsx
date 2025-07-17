"use client";
import React, { useContext } from 'react';
import { WidgetContext } from '../../app/(main)/main/template4/App';
import Title from './Title';
import Image from 'next/image';

export default function QuickMenu() {
  const widget = useContext(WidgetContext);

  const Items = [
    { url: '#', src: '/images/template/T0004/main/Quick_ico01.png', name: "학사일정", type: "ico", id: 1 },
    { url: '#', src: '/images/template/T0004/main/Quick_ico02.png', name: "오늘의 식단", type: "ico", id: 2 },
    { url: '#', name: "DBpia", type: "link", id: 3 },
    { url: '#', name: "한국지식콘텐츠", type: "link", id: 4 },
    { url: '#', name: "교보전자도서관", type: "link", id: 5 },
    { url: '#', name: "한국학술정보(KISS)", type: "link", id: 6 },
    { url: '#', name: "표절검사(copy killer)", type: "link", id: 7 },
    { url: '#', name: "학생현황관리시스템", type: "link", id: 8 },
    { url: '#', name: "학교알리미", type: "link", id: 9 },
    { url: '#', name: "분석기기사용신청", type: "link", id: 10 },
  ];

  return (
    <div className={widget.quickMenu}>
      <Title className={widget.titleWrap} tit1="Quick" tit2="Menu" tit3="편리한 바로가기 서비스" />
      <div className={widget.quickListWrap}>
        <ul className={widget.quickList}>
          {Items.map((item) => (
            <li key={item.id}>
              <a href={item.url} className={item.type === 'ico' ? widget.ico : widget.link}>
                <p>{item.name}</p>
                {item.type === 'ico' && (
                  <span>
                    <Image src={item.src} alt={item.name} width={0} height={0} sizes="100vw" style={{ width: '2.05rem', height: 'auto' }}/>
                  </span>
                )}
                {item.type === 'link' && (
                  <i className="ri-external-link-line"></i>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
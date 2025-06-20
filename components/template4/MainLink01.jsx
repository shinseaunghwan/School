"use client"
import React,{ useContext } from 'react';
import { WidgetContext } from '../../app/(main)/main/template4/App';
export default function MainLink01() {
  const widget = useContext(WidgetContext);
  const Items = [
    { url: '#', src: './../images/template/T0004/main/mlink_01.png', txt1: "CURRICULUM", txt2:"교육과정",id: 1},
    { url: '#', src: './../images/template/T0004/main/mlink_02.png', txt1: "ACADEMIC COUNSELLING", txt2:"진로/진학상담",id: 2},
    { url: '#', src: './../images/template/T0004/main/mlink_03.png', txt1: "RESEARCH PROGRAMS", txt2:"연구활동",id: 3},
    { url: '#', src: './../images/template/T0004/main/mlink_04.png', txt1: "COMMUNITY", txt2:"커뮤니티",id: 4}
  ];

  return (
 <div className={widget.mlink}>
      <h2 className={widget.hid}>바로가기</h2>
      <ul>
        {Items.map((item) => (
          <li key={item.id}>
            <a href={item.url}>
                                                      <p className={widget.txt1}>{item.txt1}</p>
                                        <p className={widget.txt2}>{item.txt2}</p>
                                        <span className={widget.ico}><img src={item.src} /></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
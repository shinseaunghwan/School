"use client"

import React from 'react';
import BannerSlider from "./BannerSlider";
import widget from "../../styles/template2/T0002_widget.module.css"
import main from "../../styles/template2/T0002.module.css"

export default function Banner() {
  const Items = [
    { url: './../images/template/T0002/main/ban_01.gif', src: './../images/template/T0002/main/ban_01.gif', text: "교육기부 바로가기", id: 114125153245325 },
    { url: './../images/template/T0002/main/ban_02.gif', src: './../images/template/T0002/main/ban_02.gif', text: "온라인행정심판 바로가기", id: 2234523626 },
    { url: './../images/template/T0002/main/ban_03.gif', src: './../images/template/T0002/main/ban_03.gif', text: "사랑티켓 바로가기", id: 325234546 },
    { url: './../images/template/T0002/main/ban_04.gif', src: './../images/template/T0002/main/ban_04.gif', text: "학부모On누리 바로가기",  id: 464562345234 },
    { url: './../images/template/T0002/main/ban_05.gif', src: './../images/template/T0002/main/ban_05.gif', text: "EBSi 바로가기",  id: 4345734566 },
    { url: './../images/template/T0002/main/ban_03.gif', src: './../images/template/T0002/main/ban_03.gif', text: "사랑티켓 바로가기",  id: 43458745654 },
  ];

  const controlButtonsOrder = ['prev', 'play', 'next','list'];

  return (
    <div className={widget.banner_zone}>
      <div className={widget.container}>
      <BannerSlider items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'배너'} />
      </div>

    </div>
  )
}

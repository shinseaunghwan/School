"use client"

import React from 'react';
import BannerSlider from "./BannerSlider";
import banner from "./Banner.module.css"

export default function Banner() {
  const Items = [
    { url: '#', src: './../images/template/T0002/main/ban_01.gif', text: "교육기부 바로가기", id: 1 },
    { url: '#', src: './../images/template/T0002/main/ban_02.gif', text: "온라인행정심판 바로가기", id: 2 },
    { url: '#', src: './../images/template/T0002/main/ban_03.gif', text: "사랑티켓 바로가기", id: 3 },
    { url: '#', src: './../images/template/T0002/main/ban_04.gif', text: "학부모On누리 바로가기",  id: 4 },
    { url: '#', src: './../images/template/T0002/main/ban_05.gif', text: "EBSi 바로가기",  id: 5 },
    { url: '#', src: './../images/template/T0002/main/ban_03.gif', text: "사랑티켓 바로가기",  id: 6 },
  ];

  const controlButtonsOrder = ['prev', 'play', 'next'];

  return (
    <div className={banner.banner_zone}>
      <div className={banner.bannerWrap}>
      <BannerSlider banner={banner} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'배너'} />
      </div>

    </div>
  )
}

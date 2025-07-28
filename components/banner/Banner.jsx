"use client"

import React from 'react';
import BannerSlider from "./BannerSlider";
import banner from "./Banner.module.css"

export default function Banner() {
  const Items = [
    { url: '#', src: '/images/template/T0002/main/ban_01.gif', alt: "교육기부 바로가기", id: 111 },
    { url: '#', src: '/images/template/T0002/main/ban_02.gif', alt: "온라인행정심판 바로가기", id: 222 },
    { url: '#', src: '/images/template/T0002/main/ban_03.gif', alt: "사랑티켓 바로가기", id: 333 },
    { url: '#', src: '/images/template/T0002/main/ban_04.gif', alt: "학부모On누리 바로가기",  id: 444 },
    { url: '#', src: '/images/template/T0002/main/ban_05.gif', alt: "EBSi 바로가기",  id: 555 },
    { url: '#', src: '/images/template/T0002/main/ban_03.gif', alt: "사랑티켓 바로가기",  id: 666 },
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

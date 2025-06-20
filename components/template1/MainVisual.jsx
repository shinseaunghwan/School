
import React from 'react';
import CustomSlider from "./CustomSlider";
// 메인비주얼
export default function MainVisual({widget}) {

  const Items = [
    { src: './../images/template/T0030/main/m_visual01.png', alt: '비주얼이미지1', id: 1 },
    { src: './../images/template/T0030/main/m_visual02.png', alt: '비주얼이미지2', id: 2 },
    { src: './../images/template/T0030/main/m_visual03.png', alt: '비주얼이미지3', id: 3 }
  ];

  const controlButtonsOrder = ['play', 'prev', 'pager', 'next'];

  return (
    <div className={widget.MVisual0030}>
      <CustomSlider widget={widget} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'비주얼'} />
    </div>
  );
};


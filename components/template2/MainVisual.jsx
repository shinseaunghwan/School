
import React from 'react';
import CustomSlider from "./CustomSlider";
import widget from "../../styles/template2/T0002_widget.module.css"
// 메인비주얼
export default function MainVisual() {
  
  const Items = [
    { src: './../images/template/T0002/main/m_visual.png', alt: '비주얼이미지1', id: 1143432658765 },
    { src: './../images/template/T0002/main/m_visual.png', alt: '비주얼이미지2', id: 23421524468 },
    { src: './../images/template/T0002/main/m_visual.png', alt: '비주얼이미지3', id: 31423543745 }
  ];

  const controlButtonsOrder = ['prev', 'play', 'next'];

  return (
    <div className={`${widget.MVisual0002} ${widget.visual}`}>
      <CustomSlider items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'비주얼'} />
    </div>
  );
};


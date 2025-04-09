
import React from 'react';
import CustomSlider from "./CustomSlider";

// 메인비주얼
export default function MainVisual({widget}) {
  
  const Items = [
    { src: './../images/template/T0003/main/m_visual3.png', alt: '비주얼이미지1', id: 1 },
    { src: './../images/template/T0003/main/m_visual3.png', alt: '비주얼이미지2', id: 2 },
    { src: './../images/template/T0003/main/m_visual3.png', alt: '비주얼이미지3', id: 3 }
  ];

  const controlButtonsOrder = [ 'play', 'prev','pager','next'];

  return (
    <>
    {/* <div className={widget.slogun}>
      <h2>우리 학교에 오신것을<br/>환영합니다.</h2>
      <p>우리 학교에 오신것을 환영합니다.</p>
    </div> */}
      <div className={widget.MVisual0003}>
        <CustomSlider widget={widget} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'비주얼'} />
      </div>
    </>
  );
};


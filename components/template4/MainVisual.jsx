
import React,{ useContext } from 'react';
import CustomSlider from "./CustomSlider";
import { WidgetContext } from '../../app/(main)/main/template4/App';

// 메인비주얼
export default function MainVisual() {
  
  const widget = useContext(WidgetContext);
  const Items = [
    { src: '/images/template/T0004/main/M_visual1.png', alt: '비주얼이미지1', id: 1 },
    { src: '/images/template/T0004/main/M_visual2.png', alt: '비주얼이미지2', id: 2 }
  ];

  const controlButtonsOrder = [ 'play'];

  return (
    <>
      <div className={widget.MVisual}>
        <CustomSlider widget={widget} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'비주얼'} />
      </div>
    </>
  );
};


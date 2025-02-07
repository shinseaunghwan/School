import React, { Fragment } from 'react';
import CustomSlider from "./CustomSlider";
import Title from "./Title"
import widget from "../../styles/template1/widget.module.css"
export default function MainPopup() {
  const Items = [
    { src: './../images/template/T0030/main/img_popup01.png', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 1 },
    { src: './../images/template/T0030/main/img_popup01.png', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 2 },
    { src: './../images/template/T0030/main/img_popup01.png', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 3 }
  ];

  const controlButtonsOrder = ['pager', 'prev', 'play', 'next'];

  return (
    <Fragment>
      <div className={widget.tit_Wrap}>
        <Title className={widget.heading}><span>팝업존</span></Title>
      </div>
      <div className={`${widget.pop0030} ${widget.popupZone}`}>
        <CustomSlider items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'팝업'} />
      </div>
    </Fragment>
  )
}
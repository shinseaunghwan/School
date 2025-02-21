import React, { Fragment } from 'react';
import PopupSlider from "./PopupSlider";
import Title from "./Title"
// import widget from "../../styles/template2/T0002_widget.module.css"
export default function MainPopup({widget}) {
  const Items = [
    { src: './../images/template/T0002/main/0002_popup_chr.jpg', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 154654761 },
    { src: './../images/template/T0002/main/0002_popup_chr.jpg', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 58583422 },
    { src: './../images/template/T0002/main/0002_popup_chr.jpg', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 35435648756 }
  ];

  const controlButtonsOrder = ['pager', 'prev', 'play', 'next'];

  return (
    <Fragment>
      <div className={widget.pop0002}>
        <Title className={widget.heading}>팝업존</Title>
        <PopupSlider widget={widget} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'팝업'} />
      </div>
    </Fragment>
  )
}
import React, { Fragment } from 'react';
import PopupSlider from "./PopupSlider";
export default function MainPopup({widget}) {
  const Items = [
    { src: './../images/template/T0003/main/0003_popup_chr.png', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 1},
    { src: './../images/template/T0003/main/0003_popup_chr.png', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 2},
    { src: './../images/template/T0003/main/0003_popup_chr.png', alt: "홈페이지 개편 안내, 홈페이지를 새롭게 단장하였습니다. 많은 이용 부탁드립니다.", id: 3}
  ];

  const controlButtonsOrder = [ 'prev', 'play', 'next', 'pager'];

  return (
    <Fragment>
      <div className={widget.pop0003}>
        <PopupSlider widget={widget} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'팝업'} />
      </div>
    </Fragment>
  )
}
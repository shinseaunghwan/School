"use client"
import React, { useState } from "react";
import layerPopup from "../../styles/layerPopup.module.css";
import LayerPopupSlider from "./LayerPopupSlider";
import Button from "../button/Button"
import intro from "../../styles/intro.module.css";

const LayerPopup = ({ tit1, tit2 }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = (event) => {
    event.preventDefault(); 
    setShowModal(true); 
  };

  const closeModal = (event) => {
    event.preventDefault(); 
    setShowModal(false); 

    
  };
  const Items = [
    { src: '/images/con_com/img.png', alt: '팝업이미지1', id: 1 },
    { src: '/images/con_com/img.png', alt: '팝업이미지2', id: 2 },
    { src: '/images/con_com/img.png', alt: '팝업이미지3', id: 3 },
    { src: '/images/con_com/img.png', alt: '팝업이미지4', id: 4 }
  ];

  const controlButtonsOrder = ['pager'];

  return (
    <>
    <Button text="레이어팝업" className={intro.button} onClick={openModal} />
      {showModal && (
        <div className={layerPopup.popupWrap}>
          <div className={layerPopup.layerPopup}>
            <h3><em>{tit1}</em> {tit2}</h3>
            <LayerPopupSlider items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'비주얼'} />
                        <div className={layerPopup.btns}>
                        <a onClick={closeModal} href="" className={layerPopup.today}>오늘하루열지않기<i className="xi-close" aria-hidden="true"></i></a> 
                        <a onClick={closeModal} href="" className={layerPopup.close}>닫기<i className="xi-close" aria-hidden="true"></i></a>
                        </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayerPopup;

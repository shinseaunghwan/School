"use client"
import React, { useState, useEffect, useRef, Fragment } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import layerPopup from "../../styles/layerPopup.module.css"

const LayerPopupSlider = ({ className, items, controlButtonsOrder, sliderName }) => {

    const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 인덱스 상태
    const [totalSlides, setTotalSlides] = useState(items.length); // 전체 슬라이드 수 상태
    const [isPlaying, setIsPlaying] = useState(true); // 재생 상태를 나타내는 상태
    let sliderRef = useRef(null);

    const play = () => {
        sliderRef.slickPlay();
    };
    const pause = () => {
        sliderRef.slickPause();
    };
    const prev = () => {
        sliderRef.slickPrev();
    };
    const next = () => {
        sliderRef.slickNext();
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying); // 재생 상태를 토글
        if (isPlaying) {
            pause(); // 재생 중이면 정지
        } else {
            play(); // 정지 중이면 재생
        }
    };

    useEffect(() => {
        setTotalSlides(items.length);
    }, [items]); // items 배열이 변경될 때마다 totalSlides를 업데이트

    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        arrows: false,
        beforeChange: (currentSlide, nextSlide) => {
            setCurrentSlide(nextSlide); // 슬라이드 변경 전 현재 슬라이드 인덱스 업데이트
        },
        responsive: [
            {
                breakpoint: 1024, // <= 1024px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // <= 768px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // <= 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    

    const ControlButton = ({ className, onClick, iconClass, text }) => (
        <button className={className} onClick={onClick}>
            <span className={layerPopup.hid}>{text}</span>
            <i className={iconClass} aria-hidden="true"></i>
        </button>
    );

    const SlideCounter = ({ currentSlide, totalSlides }) => (
            <div className={layerPopup.slickcounter}>
                <span className={layerPopup.current}>{currentSlide + 1}</span>
                /
                <span className={layerPopup.total}>{totalSlides}</span>
            </div>
    );

    const renderControlButtons = () => {
        return controlButtonsOrder.map((buttonName) => {
            switch (buttonName) {
                case 'pager':
                    return <SlideCounter currentSlide={currentSlide} totalSlides={totalSlides} />;
                case 'play':
                    return isPlaying ? (
                        <ControlButton className={layerPopup.stop} onClick={togglePlay} iconClass="xi-pause" text={sliderName + "정지"} />
                    ) : (
                        <ControlButton className={layerPopup.play} onClick={togglePlay} iconClass="xi-play" text={sliderName + "재생"} />
                    );
                case 'prev':
                    return <ControlButton className={layerPopup.prev} onClick={prev} iconClass="xi-angle-left" text={sliderName + " 이전"} />;
                case 'next':
                    return <ControlButton className={layerPopup.next} onClick={next} iconClass="xi-angle-right" text={sliderName + " 다음"} />;
                default:
                    return null;
            }
        })
    }

    return (
        <Fragment>
            <Slider className={layerPopup.popup_list} ref={slider => (sliderRef = slider)} {...settings}>
                {items.map((item) => (
                    <div className={layerPopup.item} key={item.id}>
                        <a href='#'><img src={item.src} alt={item.alt} /></a>
                    </div>
                ))}
            </Slider>
            <div className={layerPopup.counter}>
                {renderControlButtons()}
            </div>
        </Fragment>
    );
};

export default LayerPopupSlider;
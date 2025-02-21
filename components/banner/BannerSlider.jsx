"use client"
import React, { useState, useEffect, useRef, Fragment } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import widget from "../../styles/template2/T0002_banner.module.css"

const BannerSlider = ({ className, items, controlButtonsOrder, sliderName, banner }) => {
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
        const list = () => {
            sliderRef.slickGoTo(6);
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
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 500,
            arrows: false,
            responsive: [
              { breakpoint: 1024, settings: { slidesToShow: 4 }},
              { breakpoint: 768, settings: { slidesToShow: 3 }},
              { breakpoint: 560, settings: { slidesToShow: 2 }},
              { breakpoint: 420, settings: { slidesToShow: 1 }}
              ],
            beforeChange: (currentSlide, nextSlide) => {
                setCurrentSlide(nextSlide); // 슬라이드 변경 전 현재 슬라이드 인덱스 업데이트
            }
        };
    
        const ControlButton = ({ className, onClick, iconClass, text }) => (
            <button className={className} onClick={onClick}>
                <span className={banner.hid}>{text}</span>
                <i className={iconClass} aria-hidden="true"></i>
            </button>
        );
        const SlideCounter = ({ currentSlide, totalSlides }) => (
            <p className={banner.page}>
              <strong>{currentSlide + 1}</strong>
              <span>{totalSlides}</span>
            </p>
          );
      
      const renderControlButtons = () => {
        return controlButtonsOrder.map((buttonName) => {
            switch (buttonName) {
                case 'pager':
                    return <SlideCounter currentSlide={currentSlide} totalSlides={totalSlides} />;
                case 'play':
                    return isPlaying ? (
                        <ControlButton className={banner.stop} onClick={togglePlay} iconClass="xi-pause" text={sliderName + "정지"} />
                    ) : (
                        <ControlButton className={banner.play} onClick={togglePlay} iconClass="xi-play" text={sliderName + "재생"} />
                    );
                case 'prev':
                    return <ControlButton className={banner.prev} onClick={prev} iconClass="xi-angle-left" text={sliderName + " 이전"} />;
                case 'next':
                    return <ControlButton className={banner.next} onClick={next} iconClass="xi-angle-right" text={sliderName + " 다음"} />;
                    case 'list':
                    return <ControlButton className={banner.list} onClick={list} iconClass="xi-bars" text={sliderName + " 목록"} />;
                default:
                    return null;
            }
        })
    }
      

    return (
        <Fragment>
              <div className={banner.titWrap}>
                  <h2 className={banner.heading}>배너모음</h2>
                  <p className={banner.btn}>
                      {renderControlButtons()}
                  </p>
              </div>
              <Slider className={banner.bnWrap} ref={slider => (sliderRef = slider)} {...settings}>
                  {items.map((item) => (
                      <p className={banner.item} key={item.id}>
                          <a href={item.url}><img src={item.src} alt={item.alt} /></a>
                      </p>
                  ))}
              </Slider>
        </Fragment>
    );
};

export default BannerSlider;







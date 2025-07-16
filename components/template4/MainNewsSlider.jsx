"use client"
import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import Image from 'next/image';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
const MainNewsSlider = ({ className, items, controlButtonsOrder, sliderName, widget }) => {
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



    const settings = {
 infinite: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        // prevArrow: newsPrev,
        // nextArrow: newsNext,
        responsive: [
            { breakpoint: 1440, settings: { slidesToShow: 3 }},
            { breakpoint: 1024, settings: { slidesToShow: 2 }},
            { breakpoint: 560, settings: { slidesToShow: 1 }},
        ]
    };

    const ControlButton = ({ className, onClick, iconClass, text }) => (
        <button className={className} onClick={onClick}>
            <span className={widget.hid}>{text}</span>
            <i className={iconClass} aria-hidden="true"></i>
        </button>
    );

      const renderControlButtons = () => {
        const controlButtons = controlButtonsOrder.map((buttonName) => {
          switch (buttonName) {
            case 'play':
              return isPlaying ? (
                <ControlButton key={buttonName} className={widget.stop} onClick={togglePlay} iconClass="ri-pause-line" text={sliderName + "정지"} />
              ) : (
                <ControlButton key={buttonName} className={widget.play} onClick={togglePlay} iconClass="ri-play-fill" text={sliderName + "재생"} />
              );
            case 'prev':
              return <ControlButton key={buttonName} className={widget.prev} onClick={prev} iconClass="ri-arrow-left-s-line" text={sliderName + " 이전"} />;
            case 'next':
              return <ControlButton key={buttonName} className={widget.next} onClick={next} iconClass="ri-arrow-right-s-line" text={sliderName + " 다음"} />;
            default:
              return null;
          }
        });
      
        return (
          <>
            {controlButtons.find(button => button.key === 'pager')}
            <div className={widget.btn_box}>
              {controlButtons.filter(button => button.key !== 'pager')}
            </div>
          </>
        );
      };
      

    return (
        <>
            <Slider className={widget.newsSlide} ref={slider => (sliderRef = slider)} {...settings}>
                {items.map((item) => (
                    <p className={widget.item} key={item.id}>
                        <a href='#'>
                          <span className={widget.img}><Image src={item.src} alt={item.tit} width={0} height={0} sizes="100vw"/></span>
                          <span className={widget.txtWrap}>
                            <span className={widget.tit}>{item.tit}</span>
                            <span className={widget.txt}>{item.txt}</span>
                            <span className={widget.date}><i class="ri-calendar-check-line"></i>{item.date}</span>
                          </span>
                          </a>
                          </p>
                ))}
            </Slider>
            <div className={widget.control}>
                {renderControlButtons()}
            </div>
        </>
    );
};

export default MainNewsSlider;




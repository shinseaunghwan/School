// components/ProgramSlick.js
"use client";
import React, { useState, useEffect, useRef, Fragment } from "react";
import Slider from "react-slick";

const ProgramSlick = ({ items, controlButtonsOrder, sliderName, widget }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(items.length);
  const [isPlaying, setIsPlaying] = useState(true);
  const [breakpoint, setBreakpoint] = useState("desktop");
  const sliderRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState("8px");
  const [ariaValueNow, setAriaValueNow] = useState(0);

  // 창 크기에 따라 브레이크포인트 설정
  const getCurrentBreakpoint = () => {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    return windowWidth <= 1200 ? "mobile" : "desktop";
  };

  // 슬라이더 설정
  const settings = {
    infinite: true,
    slidesToShow: breakpoint === "mobile" ? 3 : 4,
    slidesToScroll: breakpoint === "mobile" ? 1 : 4,
    rows: breakpoint === "mobile" ? 1 : 2,
    arrows: true,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
      const slidesToShow = breakpoint === "mobile" ? (window.innerWidth <= 380 ? 1 : window.innerWidth <= 768 ? 2 : 3) : 4;
      const total = totalSlides / (breakpoint === "mobile" ? 1 : 2); // rows에 따라 조정
      const maxNextSlide = total - slidesToShow;

      let calc = 0;
      if (next === 0) {
        setProgressWidth("8px");
        setAriaValueNow(0);
      } else if (maxNextSlide > 0) {
        calc = (next / (breakpoint === "mobile" ? total - 1 : maxNextSlide)) * 100;
        calc = Math.min(Math.max(calc, 0), 100);
        calc = Math.round(calc);
        setProgressWidth(`${calc}%`);
        setAriaValueNow(calc);
      }
    },
    responsive: breakpoint === "mobile" ? [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 380, settings: { slidesToShow: 1 } },
    ] : [],
  };

  // 재생/정지 제어
  const play = () => {
    sliderRef.current?.slickPlay();
    setIsPlaying(true);
  };

  const pause = () => {
    sliderRef.current?.slickPause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? pause() : play();
  };

  // 슬라이더 초기화
  const initSlickSlider = () => {
    const newBreakpoint = getCurrentBreakpoint();
    setBreakpoint(newBreakpoint);
    setTotalSlides(items.length);
  };

  // 창 크기 변경 이벤트 처리 (디바운싱)
  useEffect(() => {
    initSlickSlider();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newBreakpoint = getCurrentBreakpoint();
        if (newBreakpoint !== breakpoint) {
          setBreakpoint(newBreakpoint);
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [breakpoint]);

  // 슬라이드 개수에 따라 컨트롤 표시 여부
  const showControls = totalSlides > 3;

  const ControlButton = ({ className, onClick, iconClass, text }) => (
    <button className={className} onClick={onClick}>
      <span className={widget.hid}>{text}</span>
      <i className={iconClass} aria-hidden="true"></i>
    </button>
  );

  const SlideCounter = ({ currentSlide, totalSlides }) => (
    <p className={widget.page}>
      <strong>{currentSlide + 1}</strong>
      <p>/</p>
      <span>{totalSlides / (breakpoint === "mobile" ? 1 : 2)}</span>
    </p>
  );

  const renderControlButtons = () => {
    return controlButtonsOrder.map((buttonName, index) => {
      switch (buttonName) {
        case "pager":
          return (
            <SlideCounter
              key={index}
              currentSlide={currentSlide}
              totalSlides={totalSlides}
            />
          );
        case "play":
          return isPlaying ? (
            <ControlButton
              key={index}
              className={widget.stop}
              onClick={togglePlay}
              iconClass="xi-pause"
              text={`${sliderName} 정지`}
            />
          ) : (
            <ControlButton
              key={index}
              className={widget.play}
              onClick={togglePlay}
              iconClass="xi-play"
              text={`${sliderName} 재생`}
            />
          );
        case "prev":
          return (
            <ControlButton
              key={index}
              className={widget.prev}
              onClick={() => sliderRef.current?.slickPrev()}
              iconClass="xi-angle-left"
              text={`${sliderName} 이전`}
            />
          );
        case "next":
          return (
            <ControlButton
              key={index}
              className={widget.next}
              onClick={() => sliderRef.current?.slickNext()}
              iconClass="xi-angle-right"
              text={`${sliderName} 다음`}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <Fragment>
      <div className={widget.program}>
        <Slider className={`${widget.slider} ${widget.slider}`} ref={sliderRef} {...settings}>
          {items.map((item) => (
            <div className={`${widget.item} ${widget.item}`} key={item.id}>
              <div className={`${widget.itemWrap} ${widget.itemWrap}`}>
                <div className={`${widget.tagWrap} ${widget.tagWrap}`}>
                  <span className={`${widget.tagClass} ${item.tagClass} ${widget.tagClass}`}>{item.tagClass}</span>
                  <span className={`${widget.status} ${item.status} ${widget.status}`}>{item.status}</span>
                </div>
                <p className={`${widget.tit} ${widget.tit}`}>{item.tit}</p>
                <p className={`${widget.address} ${widget.address}`}>{item.address}</p>
                <div className={`${widget.date} ${widget.date}`}>
                  <p>
                    <span>기관</span>
                    <em>{item.text}</em>
                  </p>
                  <p>
                    <span>운영기간</span>
                    <em>{item.date1}</em>
                  </p>
                  <p>
                    <span>신청기간</span>
                    <em>{item.date2}</em>
                  </p>
                </div>
              </div>
              <div className={`${widget.buttonWrap} ${widget.buttonWrap}`}>
                <a href="#" title="자세히보기">
                  <span>자세히보기</span>
                </a>
              </div>
            </div>
          ))}
        </Slider>
        {showControls && (
          <div className={`${widget.control} ${widget.control}`}>
            <div className={widget.barBox}>
              <div className={widget.bar} style={{ width: progressWidth }} aria-valuenow={ariaValueNow}></div>
            </div>
            {renderControlButtons()}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProgramSlick;
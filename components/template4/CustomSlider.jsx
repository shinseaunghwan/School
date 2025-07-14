"use client";
import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import Slider from "react-slick";
import Image from 'next/image';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const CustomSlider = ({ className, items, controlButtonsOrder, sliderName, widget }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(items.length);
  const [isPlaying, setIsPlaying] = useState(true);
  const sliderRef = useRef(null);
  const progressRef = useRef(null);
  const autoplaySpeed = 4000;
  const circumference = 2 * Math.PI * 40; // ≈ 251.327
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  // Slider control functions
  const play = () => {
    sliderRef.current.slickPlay();
    setIsPlaying(true);
    startTimeRef.current = performance.now();
  };

  const pause = () => {
    sliderRef.current.slickPause();
    setIsPlaying(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const prev = () => sliderRef.current.slickPrev();
  const next = () => sliderRef.current.slickNext();
  const togglePlay = () => (isPlaying ? pause() : play());

  // Update total slides when items change
  useEffect(() => {
    setTotalSlides(items.length);
  }, [items]);

  // Progress bar update function
  const updateProgress = useCallback(
    (currentTime) => {
      const progressBar = progressRef.current;
      if (!progressBar) return;

      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsedTime = currentTime - startTimeRef.current;
      const progress = Math.min(elapsedTime / autoplaySpeed, 1); // 0에서 1까지 진행
      const offset = circumference * (1 - progress); // strokeDashoffset 계산
      progressBar.style.strokeDashoffset = offset;

      if (progress < 1 && isPlaying) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else if (progress >= 1) {
        startTimeRef.current = currentTime; // 다음 슬라이드로 넘어갈 때 리셋
      }
    },
    [isPlaying, autoplaySpeed, circumference]
  );

  // Progress bar logic
  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar) return;

    if (isPlaying) {
      startTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateProgress]);

  // Slider settings
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed,
    speed: 500,
    arrows: false,
    dots: true,
    appendDots: () => <div style={{ display: 'none' }} />, // dots를 숨김
    customPaging: (i) => (
      <li key={i} className={i === currentSlide ? widget.slickActive : ''}>
        <button onClick={() => sliderRef.current.slickGoTo(i)}>{i + 1}</button>
      </li>
    ),
    pauseOnDotsHover: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    adaptiveHeight: false, // 높이 동적 조정 비활성화
    beforeChange: (current, next) => {
      setCurrentSlide(next);
      const progressBar = progressRef.current;
      if (progressBar && isPlaying) {
        startTimeRef.current = performance.now(); // 프로그레스 바 리셋
        progressBar.style.strokeDashoffset = circumference;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    },
  };

  // Control button component
  const ControlButton = ({ className, onClick, iconClass, text }) => (
    <button className={className} onClick={onClick}>
      <span className={widget.hid}>{text}</span>
      <i className={iconClass} aria-hidden="true"></i>
    </button>
  );

  // Slide counter component
  const SlideCounter = ({ currentSlide, totalSlides }) => (
    <p className={widget.page}>
      <strong>{currentSlide + 1}</strong>
      <p>/</p>
      <span>{totalSlides}</span>
    </p>
  );

  // Render control buttons based on order
  const renderControlButtons = () =>
    controlButtonsOrder.map((buttonName) => {
      switch (buttonName) {
        case 'pager':
          return <SlideCounter key="pager" currentSlide={currentSlide} totalSlides={totalSlides} />;
        case 'play':
          return isPlaying ? (
            <ControlButton
              key="stop"
              className={widget.stop}
              onClick={togglePlay}
              iconClass="xi-pause"
              text={`${sliderName} 정지`}
            />
          ) : (
            <ControlButton
              key="play"
              className={widget.play}
              onClick={togglePlay}
              iconClass="xi-play"
              text={`${sliderName} 재생`}
            />
          );
        case 'prev':
          return (
            <ControlButton
              key="prev"
              className={widget.prev}
              onClick={prev}
              iconClass="xi-angle-left"
              text={`${sliderName} 이전`}
            />
          );
        case 'next':
          return (
            <ControlButton
              key="next"
              className={widget.next}
              onClick={next}
              iconClass="xi-angle-right"
              text={`${sliderName} 다음`}
            />
          );
        default:
          return null;
      }
    });

  // Render custom dots
  const renderCustomDots = () =>
    Array.from({ length: totalSlides }).map((_, i) => (
      <li key={i} className={i === currentSlide ? widget.slickActive : ''}>
        <button onClick={() => sliderRef.current.slickGoTo(i)}>{i + 1}</button>
      </li>
    ));

  return (
    <Fragment>
      <Slider className={widget.slider} ref={sliderRef} {...settings}>
        {items.map((item) => (
          <p className={widget.item} key={item.id}>
            <Image src={item.src} alt={item.alt} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/>
          </p>
        ))}
      </Slider>
      <div className={widget.slogan}>
        <h3 className={widget.tit1}>과학영재학교</h3>
        <p className={widget.tit2} data-text="대전과학고등학교">대전과학고등학교</p>
        <p className={widget.txt}>스스로 탐구하여 세상을 더 이롭게 하는 창의적 과학 인재 양성</p>
      </div>
      <div className={`${widget.control}`}>
        <div className={widget.progressContainer}>
          {renderControlButtons()}
          <svg className={widget.progressCircle} viewBox="0 0 100 100">
            <circle className={widget.progressCircleBg} cx="50" cy="50" r="40"></circle>
            <circle
              ref={progressRef}
              className={widget.progressCircleBar}
              cx="50"
              cy="50"
              r="40"
              strokeWidth="10"
              fill="none"
              stroke="#000"
              style={{ strokeDasharray: `${circumference}`, strokeDashoffset: `${circumference}` }}
            />
          </svg>
        </div>
        <ul className={widget.slickDots}>{renderCustomDots()}</ul>
      </div>
    </Fragment>
  );
};

export default CustomSlider;

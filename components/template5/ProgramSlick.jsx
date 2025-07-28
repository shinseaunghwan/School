"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";
import Slider from "react-slick";

// 재사용 가능한 컨트롤 버튼 컴포넌트
const ControlButton = ({ className, onClick, iconClass, text, widget }) => (
  <button className={className} onClick={onClick}>
    <span className={widget.hid}>{text}</span>
    <i className={iconClass} aria-hidden="true"></i>
  </button>
);

// 슬라이드 카운터 컴포넌트
const SlideCounter = ({ currentSlide, totalSlides, slidesToShow, rows }) => (
  <p className={widget.page}>
    <strong>{currentSlide + 1}</strong>
    <span>/</span>
    <span>{Math.ceil(totalSlides / rows)}</span>
  </p>
);

const ProgramSlick = ({ items, controlButtonsOrder, sliderName, widget }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);

  // 슬라이더 설정
  const settings = useMemo(
    () => ({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      rows: 2,
      arrows: true,
      beforeChange: (_, next) => {
        setCurrentSlide(next);
        const slidesToShow =
          window.innerWidth <= 380
            ? 1
            : window.innerWidth <= 768
            ? 2
            : window.innerWidth <= 1200
            ? 3
            : 4;
        const rows = window.innerWidth <= 1200 ? 1 : 2;
        const total = Math.ceil(items.length / rows);
        const maxNextSlide = total - slidesToShow;
        const calc =
          next === 0
            ? 0
            : Math.min(
                Math.max(
                  (next /
                    (window.innerWidth <= 1200 ? total - 1 : maxNextSlide)) *
                    100,
                  0
                ),
                100
              );
        setProgress(Math.round(calc));
      },
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 3, slidesToScroll: 1, rows: 1 },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 1, rows: 1 },
        },
        {
          breakpoint: 380,
          settings: { slidesToShow: 1, slidesToScroll: 1, rows: 1 },
        },
      ],
    }),
    [items.length]
  );

  // 재생/정지 제어
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  // 컨트롤 버튼 렌더링
  const renderControlButtons = useCallback(() => {
    const slidesToShow =
      window.innerWidth <= 380
        ? 1
        : window.innerWidth <= 768
        ? 2
        : window.innerWidth <= 1200
        ? 3
        : 4;
    const rows = window.innerWidth <= 1200 ? 1 : 2;
    return controlButtonsOrder.map((buttonName, index) => {
      switch (buttonName) {
        case "pager":
          return (
            <SlideCounter
              key={index}
              currentSlide={currentSlide}
              totalSlides={items.length}
              slidesToShow={slidesToShow}
              rows={rows}
            />
          );
        case "play":
          return (
            <ControlButton
              key={index}
              className={isPlaying ? widget.stop : widget.play}
              onClick={togglePlay}
              iconClass={isPlaying ? "xi-pause" : "xi-play"}
              text={`${sliderName} ${isPlaying ? "정지" : "재생"}`}
              widget={widget}
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
              widget={widget}
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
              widget={widget}
            />
          );
        default:
          return null;
      }
    });
  }, [
    controlButtonsOrder,
    currentSlide,
    isPlaying,
    sliderName,
    widget,
    items.length,
    togglePlay,
  ]);

  const showControls = items.length > 3;

  return (
    <div className={widget.program}>
      <Slider className={widget.slider} ref={sliderRef} {...settings}>
        {items.map((item) => (
          <div className={widget.item} key={item.id}>
            <div className={widget.itemWrap}>
              <div className={widget.tagWrap}>
                <span className={`${widget.tagClass} ${item.tagClass}`}>
                  {item.tagClass === "a"
                    ? "견학체험"
                    : item.tagClass === "b"
                    ? "교육연수"
                    : item.tagClass === "c"
                    ? "평생교육"
                    : item.tagClass === "d"
                    ? "시설대관"
                    : item.tagClass === "e"
                    ? "공연행사"
                    : ""}
                </span>
                <span className={`${widget.status} ${item.status}`}>
                  {item.status === "Wait"
                    ? "접수대기"
                    : item.status === "Img"
                    ? "접수중"
                    : item.status === "End"
                    ? "접수마감"
                    : ""}
                </span>
              </div>
              <p className={widget.tit}>{item.tit}</p>
              <p className={widget.address}>{item.address}</p>
              <div className={widget.date}>
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
            <div className={widget.buttonWrap}>
              <a href="#" title="자세히보기">
                <span>자세히보기</span>
              </a>
            </div>
          </div>
        ))}
      </Slider>
      {showControls && (
        <div className={widget.control}>
          <div className={widget.barBox}>
            <div
              className={widget.bar}
              style={{ width: `calc(${progress}% + 16px)` }}
              aria-valuenow={progress}
            ></div>
          </div>
          {renderControlButtons()}
        </div>
      )}
    </div>
  );
};

export default ProgramSlick;

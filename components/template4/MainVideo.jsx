"use client";
import React, { useContext, useState, useRef } from 'react';
import { WidgetContext } from '../../app/(main)/main/template4/App';

export default function MainVideo() {
  const widget = useContext(WidgetContext);
  const [isPaused, setIsPaused] = useState(false); // 비디오 재생/정지 상태
  const videoRef = useRef(null); // 비디오 요소 참조

  const Item = [
    {
      src: 'http://djshs.djsch.kr/images/template/02418/sub/video.mp4',
      tit1: '과학영재학교 대전과학고등학교 소개영상',
    },
  ];

  // Item 배열이 비어 있거나 tit1이 없는 경우를 대비한 기본값
  const title = Item.length > 0 && Item[0].tit1 ? Item[0].tit1 : '제목 없음';

  // 비디오 재생/정지 핸들러
  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPaused) {
        // 재생
        videoRef.current.style.opacity = '1';
        videoRef.current.play();
        setIsPaused(false);
      } else {
        // 정지
        videoRef.current.style.opacity = '0.7';
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <div className={widget.videoWrap}>
      <div className={widget.video}>
        <video
          ref={videoRef}
          src={Item[0]?.src}
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 1 }} // 초기 투명도 설정
        ></video>
        <div className={widget.control}>
          <button
            className={`${widget.video_btn} ${isPaused ? widget.isPaused : ''}`}
            type="button"
            onClick={handleVideoToggle}
          >
            <span className={widget.hid}>{isPaused ? '영상 재생' : '영상 정지'}</span>
          </button>
        </div>
      </div>
      <div className={widget.txtWrap}>
        <p className={widget.tit}>{title}</p>
      </div>
    </div>
  );
}
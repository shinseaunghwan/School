"use client"

import React, { useContext } from 'react';
import Title from "./Title"
import IconBtnMore from "./IconBtnMore"
import { WidgetContext } from '../../app/(main)/main/template4/App';

export default function MainGallery() {
  const widget = useContext(WidgetContext);
  const Items = [
    { url: '#', src: './../images/template/T0004/main/gallery_01.png', text: "2024 재능나눔체험전", date: "2025.01.12", open: true, id: 1, show:true },
    { url: '#', src: './../images/template/T0004/main/gallery_02.png', text: "2024 진로특강 19~20차 수강 안내", date: "2025.01.12", open: true, id: 2, show:true }
  ];

  const NoData = () => {
    return (
      <li className={widget.no_data}>
        <p>데이터가 없습니다.</p>
      </li>
    )
  }



  function GalleryList() {
    const result = Items.map((item) => {
      if (item.show === true) {
        return (
          <li className={item.open === false ? widget.no_mber : ""} key={item.id}>
            <a href={item.url}>
              <span className={widget.img}><img src={item.src} alt={item.text} /></span>
              <div class={widget.txtWrap}>
                <span class={widget.tit}>{item.text}</span>
                <span class={widget.date}>{item.date}</span>
                </div>
            </a>
          </li>
        );
      } else {
        return (
          <li className={item.open === false ? widget.no_mber : ""} key={item.id}>
            <a href={item.url}>
              <p className={item.open === false ? "" : `${widget.img} ${widget.private}`}>
                <em><i className="xi-lock-o" aria-hidden="true"></i><br />비공개 이미지 입니다.</em>
              </p>
              <p className={widget.txt}>{item.text}</p>
            </a>
          </li>
        );
      }
    });
  
    if (result.length === 0) {
      return <NoData />;
    }
  
    return result;
  }
  

  return (
    <div className={widget.gallery}>
        <Title className={widget.titleWrap} tit1="DSHS" tit2="Gallery"/>
        <IconBtnMore LinkHref={'#'} LinkClassName={widget.btn_more} IconClassName={'ri-add-line'} LinkTitle={'포토갤러리'} />
      <div className={widget.gallList}>
        <ul>
          <GalleryList />
        </ul>
      </div>

    </div>
  )
}

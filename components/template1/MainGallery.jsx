"use client"

import React from 'react';
import Title from "./Title"
import IconBtnMore from "./IconBtnMore"
export default function MainGallery({widget}) {
  const Items = [
    { url: '#', src: '../../images/template/T0030/main/0030_thumb01.png', text: "교과 연계 진로캠프 다함께 하는 교과 연계 진로캠프", date: "05. 24", open: true, id: 1 }
  ];

  const NoData = () => {
    return (
      <li className={widget.no_data}>
        <p className={widget.svcIco}>
          <i className="xi-user-o"></i>
          <span>회원서비스</span>
        </p>
        <p className={widget.svcInfo}><em>게시글 열람권한이 없습니다.</em> 로그인 후 홈페이지를 이용해 주세요.</p>
      </li>
    )
  }

  function GalleryList() {
    const result = Items.map((item) => (
      <li className={item.open === false ? widget.no_mber : ""} key={item.id}>
        <a href={item.url}>
          <div className={widget.img}>
            <img src={item.src} alt={item.text} />
          </div>
          <p className={widget.txt}><span>{item.text}</span>{item.date}</p>
        </a>
      </li>
    ))

    if (result.length === 0) {
      return <NoData widget={widget} />
    }

    return result
  }

  return (
    <div className={widget.gallery0030}>
      <div className={widget.tit_Wrap}>
        <Title className={widget.heading}><span>포토갤러리</span></Title>
      </div>
      <div className={widget.list_box}>
        <ul>
          <GalleryList />
        </ul>
      </div>
      <IconBtnMore LinkHref={'#'} LinkClassName={widget.btn_more} IconClassName={'xi-plus'} LinkTitle={'갤러리'} />
    </div>
  )
}
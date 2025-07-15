"use client"

import React, { useContext } from 'react';
import Title from "./Title"
import IconBtnMore from "./IconBtnMore"
import { WidgetContext } from '../../app/(main)/main/template3/App';

export default function MainGallery() {
  const widget = useContext(WidgetContext);
  const Items = [
    { url: '#', src: '/images/template/T0002/main/0002_story_img01.jpg', text: "에펠탑을 만들어요", date: "2025.03.01", open: true, id: 1, show:true },
    { url: '#', src: '/images/template/T0002/main/0002_story_img02.jpg', text: "즐거운 수업시간", date: "2025.03.01", open: true, id: 2, show:true },
    { url: '#', src: '/images/template/T0002/main/0002_story_img03.jpg', text: "책과 친구가 됐어요", date: "2025.03.01", open: true, id: 3 ,show:true },
    { url: '#', src: '/images/template/T0002/main/0002_story_img03.jpg', text: "책과 친구가 됐어요", date: "2025.03.01", open: true, id: 4 ,show:true }
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
    const result = Items.map((item) => {
      if (item.show === true) {
        return (
          <li className={item.open === false ? widget.no_mber : ""} key={item.id}>
            <a href={item.url}>
              <p className={widget.img}>
                <Image src={item.src} alt={item.text} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/>
              </p>
              <p className={widget.txt}>{item.text}</p>
              <p className={widget.date}>{item.date}</p>
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
    <div className={widget.gallery0003}>
        <Title className={widget.heading}>포토갤러리</Title>
        <IconBtnMore LinkHref={'#'} LinkClassName={`${widget.btn_more} ${widget.ty}`} IconClassName={'xi-plus'} LinkTitle={'포토갤러리'} />
      <div className={widget.list_box}>
        <ul>
          <GalleryList />
        </ul>
      </div>

    </div>
  )
}

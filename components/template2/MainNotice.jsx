"use client"

import React, { useState } from 'react';
import NoData from "./NoData"
import IconBtnMore from "./IconBtnMore"
// import widget from "../../styles/template2/T0002_widget.module.css"
export default function MainNotice({widget}) {
  const Tabs = [
    { part: 'notice1', name: "공지사항", id: 1, text1:'등교 전 준비사항 안내1', text2:'123456' },
    { part: 'notice2', name: "가정통신문", id: 2, text1:'등교 전 준비사항 안내2', text2:'123456' },
    { part: 'notice3', name: "자료실", id: 3, text1:'등교 전 준비사항 안내3', text2:'123456' }
  ];
  const TabDatas = [
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 1 },
    { part: 'notice1', url: '#', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2024. 05. 22", id: 2 },
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 3 },
    { part: 'notice2', url: '#', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2024. 05. 22", id: 4 },
    { part: 'notice2', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 5 },
  ];

  const [currentTab, setCurrentTab] = useState("notice1"); // 현재 선택된 탭의 상태

  function handleTabClick(part, event) {
    event.preventDefault();
    setCurrentTab(part);
  }

  const TitTab = () => {
    return (
      <div className={widget.titTab}>
        <ul>
          {Tabs.map((tab) => (
            <li key={tab.id}>
              <a href="#"
                className={currentTab === tab.part ? widget.current : ""} // 현재 선택된 탭인 경우에만 current
                onClick={(event) => handleTabClick(tab.part, event)} // 탭 클릭시 현재 선택된 탭 업데이트
              >
                <span>{tab.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const TabDataList = ({ tabpart }) => {
    const result = TabDatas.filter((tabdata) => tabdata.part === tabpart).map((tabdata) => (
      <li key={tabdata.id}><a href={tabdata.url} className={widget.current}>{tabdata.text}<span>{tabdata.date}</span></a></li>
    ))

    if (result.length === 0) {
      return <NoData widget={widget} />
    }

    return result
  }

  const TabNotice = ({ tabpart }) => {
    const result = Tabs.filter((tab) => tab.part === tabpart).map((tab) => (
      <dl className={widget.new} key={tab.id}>
        <dt>{tab.text1}</dt>
        <dd>{tab.text2}</dd>
        </dl>
    ))

    if (result.length === 0) {
      return <NoData widget={widget} />
    }

    return result
  }

  const TabDataWrap = () => {
    const currentTabData = Tabs.find(tab => tab.part === currentTab);

    return (
      <div className={widget.tabWrap}>
        <div className={`${widget.list_box} ${widget.on}`}>
          <a href="#" className={widget.topList}>
            <img src="./../images/template/T0002/main/0002_notice_ico.png" alt="" />
            <TabNotice tabpart={currentTabData.part} />
          </a>
          <ul>
            <TabDataList tabpart={currentTabData.part} />
          </ul>
          <IconBtnMore LinkHref={'#'} LinkClassName={`${widget.btn_more} ${widget.ty}`} IconClassName={'xi-plus'} LinkTitle={currentTabData.name} />
        </div>
      </div>
    )
  }

  return (
    <div className={widget.notice0002}>
      <TitTab />
      <TabDataWrap />
    </div>
  )
}

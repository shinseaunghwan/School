"use client"

import React, { useState } from 'react';
import NoData from "./NoData"
import IconBtnMore from "./IconBtnMore"

export default function MainNotice() {
  const Tabs = [
    { part: 'notice1', name: "공지사항", id: 1, text1:'등교 전 준비사항 안내1', text2:'123456' },
    { part: 'notice2', name: "가정통신문", id: 2, text1:'등교 전 준비사항 안내2', text2:'123456' },
    { part: 'notice3', name: "자료실", id: 3, text1:'등교 전 준비사항 안내3', text2:'123456' }
  ];
  const TabDatas = [
    { part: 'notice1', url: './../images/template/T0002/main/0030_link01_01.png', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 176589 },
    { part: 'notice1', url: './../images/template/T0002/main/0030_link01_01.png', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2024. 05. 22", id: 236 },
    { part: 'notice1', url: './../images/template/T0002/main/0030_link01_01.png', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 9254 },
    { part: 'notice2', url: './../images/template/T0002/main/0030_link01_01.png', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2024. 05. 22", id: 10477464762543 },
    { part: 'notice2', url: './../images/template/T0002/main/0030_link01_01.png', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 11738536 },
  ];

  const [currentTab, setCurrentTab] = useState("notice1"); // 현재 선택된 탭의 상태

  function handleTabClick(part, event) {
    event.preventDefault();
    setCurrentTab(part);
  }

  const TitTab = () => {
    return (
      <div className="titTab">
        <ul>
          {Tabs.map((tab) => (
            <li key={tab.id}><a href="#"
              className={currentTab === tab.part ? "current" : ""} // 현재 선택된 탭인 경우에만 current
              onClick={(event) => handleTabClick(tab.part, event)} // 탭 클릭시 현재 선택된 탭 업데이트
            ><span>{tab.name}</span></a></li>
          ))}
        </ul>
      </div>
    )
  }

  function TabDataList({ tabpart }) {
    const result = TabDatas.filter((tabdata) => tabdata.part == tabpart).map((tabdata) => (
      <li key={tabdata.id}><a href={tabdata.url} className="current">{tabdata.text}<span>{tabdata.date}</span></a></li>
    ))

    if (result.length === 0) {
      return <NoData />
    }

    return result
  }

  const TabDataWrap = () => {
    return (
      <div className="tabWrap">
        {
          Tabs.map((tab) => (
            <div className={`list_box ${currentTab === tab.part ? "on" : ""}`} id={tab.part} key={tab.id}>
              <a href="" className="topList">
                <img src="./../images/template/T0002/main/0002_notice_ico.png" alt="" />
                <dl className="new">
                  <dt>{tab.text1}</dt>
                  <dd>{tab.text2}</dd>
                </dl>
              </a>
              <ul>
                <TabDataList tabpart={tab.part} />
              </ul>
              <IconBtnMore LinkHref={''} LinkClassName={'btn_more ty'} IconClassName={'xi-plus'} LinkTitle={tab.name} />
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <div className="notice0002">
      <TitTab />
      <TabDataWrap />
    </div>
  )
}

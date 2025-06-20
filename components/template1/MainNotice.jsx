"use client"

import React, { useState, useEffect } from 'react';
import NoData from "./NoData"
import IconBtnMore from "./IconBtnMore"

export default function MainNotice({widget}) {
  const Tabs = [
    { url: '#notice1', part: 'notice1', name: "공지사항", id: 1 },
    { url: '#notice2', part: 'notice2', name: "가정통신문", id: 2 },
    { url: '#notice3', part: 'notice3', name: "자료실", id: 3 }
  ];
  const TabDatas = [
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 1 },
    { part: 'notice1', url: '#', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2024. 05. 22", id: 2 },
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 9 },
    { part: 'notice1', url: '#', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2024. 05. 22", id: 10 },
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2024. 05. 24", id: 11 },
    { part: 'notice1', url: '#', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2024. 05. 22", id: 12 },
    { part: 'notice1', url: '#', text: '수업량 유연화 주간 \'융합 독서 토론\' 계획', date: "2024. 05. 17", id: 3 },
    { part: 'notice1', url: '#', text: '학교폭력 없는 안전한 학교 만들기 이벤트', date: "2024. 05. 15", id: 4 },
    { part: 'notice3', url: '#', text: '2024학년도 1,4학년 정서행동특성검사 실시 안내', date: "2024. 03. 20", id: 5 },
    { part: 'notice3', url: '#', text: '청소년 인터넷·스마트폰 이용습관 진단조사 안내', date: "2024. 03. 17", id: 6 },
    { part: 'notice3', url: '#', text: '학교급식 알레르기 유발식품 표시제 안내 및 식품알레르기 유병학생 조사', date: "2024. 03. 16", id: 7 },
    { part: 'notice3', url: '#', text: '상담실 이용 안내 및 개인정보 수집 및 이용에 관한 보호자 동의서', date: "2024. 03. 10", id: 8 }
  ];
  
  const [currentTab, setCurrentTab] = useState(Tabs[0].part);
  const [tabData, setTabData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTabData(currentTab);
  }, [currentTab]);

  const fetchTabData = (tabPart) => {
    setLoading(true);

    const result = TabDatas.filter((data) => data.part === tabPart);
    setTabData(result);
    setLoading(false);
  };

  const handleTabClick = (part) => {
    setCurrentTab(part);
  };

  const TitTab = () => {
    return (
      <div className={widget.titTab}>
        <ul>
          {Tabs.map((tab) => (
            <li key={tab.id}>
              <a href={tab.url}
                className={currentTab === tab.part ? widget.current : ""}
                onClick={() => handleTabClick(tab.part)}
              >
                <span>{tab.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const TabDataList = () => {
    if (loading) return <p>Loading...</p>;
    if (tabData.length === 0) return <NoData widget={widget} />;

    return tabData.map((tabdata) => (
      <li key={tabdata.id}>
        <a href={tabdata.url} className={widget.current}>
          {tabdata.text}
          <span>{tabdata.date}</span>
        </a>
      </li>
    ));
  };

  const TabContent = () => (
    <div className={widget.tabWrap}>
      <div className={`${widget.list_box} ${widget.on}`}>
        <ul>
          <TabDataList />
        </ul>
        <IconBtnMore LinkHref={'#'} LinkClassName={widget.btn_more} IconClassName={'xi-plus'} LinkTitle={currentTab} />
      </div>
    </div>
  )

  return (
    <div className={widget.notice0030}>
      <TitTab />
      <TabContent />
    </div>
  )
}

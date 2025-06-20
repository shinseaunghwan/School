"use client";

import React, { useState, useContext } from 'react';
import NoData from "./NoData";
import IconBtnMore from "./IconBtnMore";
import { WidgetContext } from '../../app/(main)/main/template4/App';

export default function MainNotice() {
  const widget = useContext(WidgetContext);

  const Tabs = [
    { part: 'notice1', name: "공지사항", id: 1, text1: '등교 전 준비사항 안내1', text2: '123456', date1: "2025. 05.", date2: "24" },
    { part: 'notice2', name: "가정통신문", id: 2, text1: '등교 전 준비사항 안내2', text2: '123456', date1: "2025. 05.", date2: "24" },
    { part: 'notice3', name: "자료실", id: 3, text1: '등교 전 준비사항 안내3', text2: '123456', date1: "2025. 05.", date2: "24" },
  ];

  const TabDatas = [
    { part: 'notice1', url: '#', tit: '제목이에요', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 1 },
    { part: 'notice1', url: '#', tit: '제목이에요', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2025. 05. 22", id: 2 },
    { part: 'notice1', url: '#', tit: '제목이에요', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 3 },
    { part: 'notice1', url: '#', tit: '제목이에요', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 4 },
    { part: 'notice1', url: '#', tit: '제목이에요', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 9 },
    { part: 'notice2', url: '#', tit: '제목이에요', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2025. 05. 22", id: 5 },
    { part: 'notice2', url: '#', tit: '제목이에요', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 6 },
    { part: 'notice2', url: '#', tit: '제목이에요', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 7 },
    { part: 'notice2', url: '#', tit: '제목이에요', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 8 },
    { part: 'notice2', url: '#', tit: '제목이에요', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 10 },
  ];

  const [currentTab, setCurrentTab] = useState("notice1");

  function handleTabClick(part, event) {
    event.preventDefault();
    setCurrentTab(part);
  }

  const TitTab = () => {
    return (
      <ul className={widget.tabs}>
        {Tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={
              currentTab === tab.part
                ? widget.active
                : index === Tabs.findIndex(t => t.part === currentTab) - 1
                ? widget.noAfter
                : ''
            }
          >
            <a
              href="#"
              className={currentTab === tab.part ? widget.current : ""}
              onClick={(event) => handleTabClick(tab.part, event)}
            >
              <span>{tab.name}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const TabDataList = ({ tabpart }) => {
    const result = TabDatas.filter((tabdata) => tabdata.part === tabpart).map(
      (tabdata) => (
        <li key={tabdata.id}>
          <a href={tabdata.url} className={widget.new}>
            <p className={widget.txt}>{tabdata.text}</p>
            <p className={widget.icon}>
              <span className={widget.hid}>새글</span>
            </p>
            <span>{tabdata.date}</span>
          </a>
        </li>
      )
    );

    if (result.length === 0) {
      return <NoData widget={widget} />;
    }

    return <ul>{result}</ul>;
  };

  const TabNotice = ({ tabpart }) => {
    const result = Tabs.filter((tab) => tab.part === tabpart).map((tab) => (
      <dl className={widget.new} key={tab.id}>
        <dt>{tab.text1}</dt>
        <dd>
          <p>{tab.text2}</p>
          <span className={widget.date}>
            {tab.date1}
            <em>{tab.date2}</em>
          </span>
        </dd>
      </dl>
    ));

    return <>{result}</>;
  };

  const TabDataWrap = () => {
    const currentTabData = Tabs.find((tab) => tab.part === currentTab);

    if (!currentTabData) {
      return <NoData widget={widget} />;
    }

    return (
      <div className={widget.tabWrap}>
        <div className={`${widget.listBox} ${widget.on}`}>
          <a className={widget.topList}>
            <TabNotice tabpart={currentTabData.part} />
          </a>
          <TabDataList tabpart={currentTabData.part} />
          <IconBtnMore
            LinkHref={'#'}
            LinkClassName={`${widget.btn_more}`}
            IconClassName={'ri-add-line'}
            LinkTitle={currentTabData.name}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={widget.notice}>
      <TitTab />
      <TabDataWrap />
    </div>
  );
}
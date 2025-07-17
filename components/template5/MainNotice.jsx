"use client";

import React, { useState, useContext } from 'react';
import NoData from "./NoData";
import IconBtnMore from "./IconBtnMore";
import Image from 'next/image';
import { WidgetContext } from '../../app/(main)/main/template5/App';

export default function MainNotice() {
  const widget = useContext(WidgetContext);

  const Tabs = [
    { part: 'notice1', name: "공지사항", id: 1, text: '교직원 로그인 시 사용하는 교육부 행정전자서명인증서 처리프로그램의 안정성을 위해 보안을 교직원 로그인 시 사용하는 교육부 행정전자서명인증서 처리프로그램의 안정성을 위해 보안을', tit: '교직원 로그인을 위한 교육부 행정전자서명인증서 처리프로그램 보안 업데이트 안내교직원 로그인을 위한 교육부 행정전자서명인증서 처리프로그램 보안 업데이트 안내' },
    { part: 'notice2', name: "가정통신문", id: 2, text: 'ttttttttttttttttt', tit: 'tttttttt'}
  ];

  const TabDatas = [
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 1 },
    { part: 'notice1', url: '#', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2025. 05. 22", id: 2 },
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 3 },
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 4 },
    { part: 'notice1', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 9 },
    { part: 'notice2', url: '#', text: '현장체험학습(야영교육) 대전 교육 연수원 설문 조사', date: "2025. 05. 22", id: 5 },
    { part: 'notice2', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 6 },
    { part: 'notice2', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 7 },
    { part: 'notice2', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 8 },
    { part: 'notice2', url: '#', text: '프로젝트 봉사활동 계획서 및 보고서 양식', date: "2025. 05. 24", id: 10 },
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
        <dt><span className={widget.img}><Image src="/images/template/T0005/main/Group.png" width={56} height={0} alt="icon" /> </span></dt>
        <dd>
          <h3 className={widget.tit}>{tab.tit}</h3>
          <p>{tab.text}</p>
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
    );
  };

  return (
    <div className={widget.notice}>
      <div className={widget.titWrap}>
        <h3 className={widget.tit}><p>통합예약포털</p> <span>소식</span></h3>
        <TitTab />
        </div>
      <TabDataWrap />
    </div>
  );
}
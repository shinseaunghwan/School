"use client"

import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import "react-calendar/dist/Calendar.css";
import NoData from "./NoData"
import IconBtnMore from "./IconBtnMore"
import Title from "./Title"
import widget from "../../styles/template2/T0002_widget.module.css"
export default function MainSchedule() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태

  const Items = [
    { date: "04.20", text: "중요한 날1", id: 13412341 },
    { date: "05.24", text: "중요한 날2", id: 16688888888482 },
    { date: "06.02", text: "중요한 날3", id: 341831154534 },
    { date: "02.15", text: "중요한 날4", id: 4164575854863 },
    { date: "02.27", text: "중요한 날5", id: 2354234766746578 },
    { date: "05.20", text: "중요한 날6", id: 1234523453245 },
    { date: "03.24", text: "중요한 날7", id: 22534224 },
    { date: "02.02", text: "중요한 날8", id: 352452351 },
    { date: "01.15", text: "중요한 날9", id: 424647345 },
    { date: "02.27", text: "중요한 날10", id: 51234241234 }
  ];

  // 현재 달의 스케줄 필터링
  const currentMonthItems = Items.filter(item => {
    const itemDate = new Date(item.date.replace(/\./g, '/'));
    return itemDate.getMonth() === date.getMonth();
  });

  // 선택된 날짜에 해당하는 스케줄 필터링
  const selectedDateItems = selectedDate ? Items.filter(item => {
    const itemDate = new Date(item.date.replace(/\./g, '/'));
    return (
      itemDate.getMonth() === selectedDate.getMonth() && // 선택된 달의 스케줄만 필터링
      itemDate.getDate() === selectedDate.getDate() // 선택된 날짜만 필터링
    );
  }) : [];

  const CalendarHeader = ({ value, onChange }) => {
    const onChangeMonth = (value) => {
      onChange(value);
      setSelectedDate(null); // 선택된 날짜 초기화
    };

    return (
      <>
        <p className={widget.month}>
            <button className={widget.prev} onClick={() => onChangeMonth(new Date(value.getFullYear(), value.getMonth() - 1))}><i className="xi-angle-left" aria-hidden="true"></i><em className={widget.hid}>이전달</em></button>
            <span>{value.getFullYear()}<em>{value.getMonth() + 1}</em></span>
            <button className={widget.next} onClick={() => onChangeMonth(new Date(value.getFullYear(), value.getMonth() + 1))}><i className="xi-angle-right" aria-hidden="true"></i><em className={widget.hid}>다음달</em></button>
        </p>
      </>
    );
  };

  // 달력 본문(날짜 그리드) 컴포넌트
  const CalendarBody = ({ value, onChange }) => {
    const formatDay = (locale, date) => {
      return date.getDate(); // 각 날짜를 숫자로만 표시
    };

    // 특정 날짜에 스케줄이 있는지 확인하는 함수
    const hasSchedule = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 문자열로 변환하고, 10미만은 앞에 0을 붙임
      const day = String(date.getDate()).padStart(2, '0'); // 일을 문자열로 변환하고, 10미만은 앞에 0을 붙임
      const dateString = `${year}.${month}.${day}`;
      return Items.some(item => item.date === dateString);
    };

    function onClickDay(selectedDate) {
      setSelectedDate(selectedDate); // 선택된 날짜 설정
    }

    return (
      <div className={widget.sche_list}>
        <Calendar
          value={value}
          onChange={onChange}
          showNavigation={false}
          formatDay={formatDay} // 날짜를 숫자로만 표시
          onClickDay={onClickDay}
          tileClassName={({ date, view }) => {
            if (view === 'month' && hasSchedule(date)) {
              return 'event';
            } else {
              return null;
            }
          }}
        />
      </div>
    );
  };

  function ScheList() {
    const scheduleItems = selectedDate ? selectedDateItems : currentMonthItems;

    if (scheduleItems.length === 0) {
      return <NoData />;
    }

    return scheduleItems.map((item) => (
      <li key={item.id}>
        <a href={item.url}>
          <span className={widget.dt}>{item.date}</span>
          <span className={widget.dsc}>{item.text}</span>
          </a>
      </li>
    ));
  }

  return (
    <div className={widget.pop_schedule0002}>
        <div className={widget.tit}>
          <Title className={widget.heading}>행사일정</Title>
          <IconBtnMore LinkHref={'#'} LinkClassName={widget.btn_more} IconClassName={'xi-plus'} LinkTitle={'행사일정'} />
        </div>
        <CalendarHeader value={date} onChange={setDate} />
        <div className={widget.sche_wrap}>
          {/* <CalendarBody value={date} onChange={setDate} /> */}
          <div className={widget.lst}>
            <ul>
          <ScheList />
        </ul>
          </div>
        </div>
    </div>
  );
};


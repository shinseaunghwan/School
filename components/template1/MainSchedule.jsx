"use client"

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import NoData from "./NoData"
import IconBtnMore from "./IconBtnMore"
import widget from "../../styles/template1/widget.module.css"
export default function MainSchedule() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태

  const Items = [
    { date: "2024.04.20", text: "교과 연계 진로캠프 다함께 하는 교과 연계 진로캠프", id: 1 },
    { date: "2024.05.24", text: "교과 연계 진로캠프 다함께 하는 교과 연계 진로캠프", id: 2 },
    { date: "2024.06.02", text: "교과 연계 진로캠프 다함께 하는 교과 연계 진로캠프", id: 3 },
    { date: "2024.03.15", text: "교과 연계 진로캠프 다함께 하는 교과 연계 진로캠프", id: 4 },
    { date: "2024.03.27", text: "교과 연계 진로캠프 다함께 하는 교과 연계 진로캠프", id: 5 }
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
      <div className={widget.date}>
        <span>{value.getFullYear()}<em>{value.getMonth() + 1}</em></span>
        <p>
          <button className={widget.prev} onClick={() => onChangeMonth(new Date(value.getFullYear(), value.getMonth() - 1))}><i className="xi-angle-left" aria-hidden="true"></i><em className={widget.hid}>이전달</em></button>
          <button className={widget.next} onClick={() => onChangeMonth(new Date(value.getFullYear(), value.getMonth() + 1))}><i className="xi-angle-right" aria-hidden="true"></i><em className={widget.hid}>다음달</em></button>
        </p>
      </div>
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
        <a href={item.url}><span>{item.date}</span>{item.text}</a>
      </li>
    ));
  }

  return (
    <div className={widget.pop_schedule0030}>
      <div className={widget.sche_frame}>
        <div className={widget.tit_wrap}>
          <CalendarHeader value={date} onChange={setDate} />
          <IconBtnMore LinkHref={'#'} LinkClassName={widget.btn_more} IconClassName={'xi-plus'} LinkTitle={'행사일정'} />
        </div>

        <div className={widget.sche_wrap}>
          <CalendarBody value={date} onChange={setDate} />
        </div>

      </div>
      <ul className={widget.lst}>
        <ScheList />
      </ul>
    </div>
  );
};
"use client";
import React, { useContext } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/App";
import ProgramSlick from "./ProgramSlick"

export default function Program() {
  const widget = useContext(WidgetContext);
  const Items = [
    {tagClass:'a',status:'Img', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 1 },
    {tagClass:'a',status:'Wait', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 2 },
    {tagClass:'b',status:'End', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 3 },
    {tagClass:'b',status:'Wait', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 4 },
    {tagClass:'c',status:'Img', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 5 },
    {tagClass:'c',status:'End', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 6 },
    {tagClass:'d',status:'Wait', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 7 },
    {tagClass:'e',status:'Img', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 8 },
    {tagClass:'e',status:'End', tit: '테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', text:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트  테스트 테스트 테스트 테스트 테스트 테스트', date1:'2025.07.18',date2:'2025.07.18', id: 9 },

  ];
  const controlButtonsOrder = ['prev', 'next'];
  return (
    <div className={widget.program}>
		<ProgramSlick widget={widget} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'프로그램'} />
    </div>
  );
}







								
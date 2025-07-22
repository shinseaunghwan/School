"use client";
import React, { useContext } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/App";
import ProgramSlick from "./ProgramSlick"

export default function Program() {
  const widget = useContext(WidgetContext);
  const Items = [
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 1 },
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 2 },
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 3 },
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 4 },
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 5 },
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 6 },
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 7 },
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 8 },
    {tagClass:'a',status:'Img', tit: '123', text:'123', date1:'2025.07.18',date2:'2025.07.18', id: 9 },

  ];
  const controlButtonsOrder = ['prev', 'next'];
  return (
    <div className={widget.program}>
		<ProgramSlick widget={widget} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'프로그램'} />
    </div>
  );
}







								
"use client"
import React,{ useContext } from 'react';
import { WidgetContext } from '../../app/(main)/main/template4/App';
import Title from './Title';
export default function Magazine() {
  const widget = useContext(WidgetContext);

  return (
    <div className={widget.magazineWrap}>
       <a href="#" className={widget.magazine}>
        <Title className={widget.titleWrap} tit1={"DSHS"} tit2={"Magazine"} />
        <span className={widget.ico}><img src="/images/template/T0004/main/Magazine_ico01.png" alt="" /></span>
        </a>
    </div>
  )
}

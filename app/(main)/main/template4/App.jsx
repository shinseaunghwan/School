"use client"

import React, { createContext } from 'react';
import ui from '../../../../styles/template4/T0004.module.css';
import widget from "../../../../styles/template4/T0004_widget.module.css"
import MainVisual from "../../../../components/template4/MainVisual"
import MainLink01 from "../../../../components/template4/MainLink01"
import MainNews from "../../../../components/template4/MainNews"
import MainVideo from "../../../../components/template4/MainVideo"
import Magazine from "../../../../components/template4/Magazine"
import QuickMenu from "../../../../components/template4/QuickMenu"
import MainNotice from '../../../../components/template4/MainNotice';
import MainGallery from "../../../../components/template4/MainGallery"
import Banner from "../../../../components/banner/Banner"



export const WidgetContext = createContext();

function App() {
  return (
    <WidgetContext.Provider value={widget}>
      <div className={ui.container_wrap}>
        <div className={ui.MC_wrap1}>
          <div className={ui.MC_box1}>
            <MainVisual />
          </div>
          <div className={ui.MC_box2}>
            <div className={ui.container}><MainLink01 /></div>
          </div>
        </div>  
        <div className={ui.MC_wrap2}>
          <div className={`${ui.MC_box3} ${ui.container}`}>
            <MainNews />
          </div>
        </div>  
        <div className={ui.MC_wrap3}>
          <div className={ui.container}>
            <div className={ui.MC_box4}>
            <MainVideo />
            </div>
            <div className={ui.MC_box5}>
            <MainGallery />
            </div>
            <div className={ui.MC_box6}>
            <Magazine />
            </div>
          </div>
        </div>  
        <div className={ui.MC_wrap4}>
          <div className={ui.container}>
            <div className={ui.MC_box7}>
            <QuickMenu />
            </div>
            <div className={ui.MC_box8}>
            <MainNotice />
            </div>
          </div>
        </div>  
        <Banner />
      </div>
    </WidgetContext.Provider>
  );
}

export default App;

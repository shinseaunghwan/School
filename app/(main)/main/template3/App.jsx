"use client"

import React, { createContext } from 'react';
import ui from '../../../../styles/template3/T0003.module.css';
import widget from "../../../../styles/template3/T0003_widget.module.css"
import MainVisual from "../../../../components/template3/MainVisual"
import MainPopup from "../../../../components/template3/MainPopup"
import MainMeal from "../../../../components/template3/MainMeal"
import MainLink01 from "../../../../components/template3/MainLink01"
import MainNotice from '../../../../components/template3/MainNotice';
import MainSchedule from '../../../../components/template3/MainSchedule';
import MainGallery from "../../../../components/template3/MainGallery"
import Banner from "../../../../components/banner/Banner"

export const WidgetContext = createContext();

function App() {
  return (
    <WidgetContext.Provider value={widget}>
      <div className={ui.container_wrap}>
        <div className={`${ui.MC_wrap1} ${ui.container}`}>
          <div className={ui.MC_box1}>
            <MainVisual />
          </div>
          <div className={ui.MC_cont}>
            <div className={ui.MC_box2}>
              <MainPopup />
            </div>
            <div className={ui.MC_box3}>
              <MainMeal />
            </div>
          </div>
        </div>  
        <div className={`${ui.MC_wrap2} ${ui.container}`}>
          <div className={ui.MC_box4}>
            <MainLink01 />
          </div>
        </div>
        <div className={`${ui.MC_wrap3} ${ui.container}`}>
          <div className={ui.MC_box5}>
            <MainNotice />
          </div>
        </div>
        <div className={`${ui.MC_wrap4} ${ui.container}`}>
          <div className={ui.MC_box6}>
            <MainSchedule />
          </div>
        </div>
        <div className={`${ui.MC_wrap5} ${ui.container}`}>
          <div className={ui.MC_box7}>
            <MainGallery />
          </div>
        </div>
        <Banner />
      </div>
    </WidgetContext.Provider>
  );
}

export default App;

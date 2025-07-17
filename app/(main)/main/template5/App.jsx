"use client"

import React, { createContext } from 'react';
import ui from '../../../../styles/template5/T0005.module.css';
import widget from "../../../../styles/template5/T0005_widget.module.css"
import MainVisual from "../../../../components/template5/MainVisual"
import Banner from "../../../../components/banner/Banner"



export const WidgetContext = createContext();

function App() {
  return (
    <WidgetContext.Provider value={widget}>
      <div className={ui.container_wrap}>
        <div className={ui.MC_wrap1}>
          <div className={ui.MC_box1}>
            <div className={ui.container}>
              <MainVisual />
              </div>
          </div>
        </div>  
        <div className={ui.MC_wrap2}>
          <div className={ui.MC_box2}>
            <div className={ui.container}>
              
              </div>
          </div>
        </div>  
        <div className={ui.MC_wrap3}>
          <div className={ui.MC_box3}>
            <div className={ui.container}>
              
              </div>
          </div>
        </div>  

        <Banner />
      </div>
    </WidgetContext.Provider>
  );
}

export default App;

import React from 'react';
import MainVisual from "../../../../components/template2/MainVisual"
import MainSchedule from "../../../../components/template2/MainSchedule"
import MainPopup from "../../../../components/template2/MainPopup"
import MainNotice from "../../../../components/template2/MainNotice"
import MainMeal from "../../../../components/template2/MainMeal"
import MainLink01 from "../../../../components/template2/MainLink01"
import MainGallery from "../../../../components/template2/MainGallery"
import Banner from "../../../../components/template2/Banner"
import main from '../../../../styles/template2/T0002.module.css';
import widget from '../../../../styles/template2/T0002_widget.module.css';
import layout from "../../../../styles/Layout.module.css"


function App() {
  return (
    <div className={main.container_wrap}>
      <div className={main.MC_wrap1}>
        <div className={main.MC_box1}>
          <MainVisual widget={widget} />
        </div>
      </div>   
      <div className={`${main.MC_wrap2} ${layout.container}`}> 
        <div className={main.MC_box2}>
          <MainLink01 widget={widget} />
        </div>
      </div>
      <div className={main.MC_wrap3}>
        <div className={main.MC_box3}>
          <MainNotice widget={widget} />
        </div>
        <div className={main.MC_box4}>
          <MainMeal widget={widget} />
        </div>
        <div className={main.MC_box5}>
          <MainPopup widget={widget} />
        </div>
      </div>
      <div className={main.MC_wrap4}>
        <div className={main.MC_box6}>
          <MainGallery widget={widget} />
        </div>
      </div>
      <div className={main.MC_wrap5}>
        <div className={main.MC_box7}>
          <MainSchedule widget={widget} />
        </div>
      </div>
      <Banner widget={widget} />
    </div>
  );
}

export default App;


import React from 'react';
import MainVisual from "../../../../components/template1/MainVisual"
import MainSchedule from "../../../../components/template1/MainSchedule"
import MainPopup from "../../../../components/template1/MainPopup"
import MainNotice from "../../../../components/template1/MainNotice"
import MainMeal from "../../../../components/template1/MainMeal"
import MainLink01 from "../../../../components/template1/MainLink01"
import MainGallery from "../../../../components/template1/MainGallery"
import main from '../../../../styles/template1/main.module.css';

function App() {
  return (
    <div className={main.container_wrap}>
      <div className={main.MC_wrap1}>
        <div className={main.container}>
          <div className={main.con_wrap1}>
            <div className={main.con_content}>
              <div className={main.MC_box1}>
                <MainVisual />
              </div>
              <div className={main.MC_box2}>
                <MainLink01 />
              </div>
              <div className={main.MC_box3}>
                <MainNotice />
              </div >
              <div className={main.MC_box4}>
                <MainPopup />
              </div>
            </div>
          </div>
          <div className={main.con_wrap2}>
            <div className={main.MC_box5}>
              <MainMeal />
            </div>
            <div className={main.MC_box6}>
              <MainGallery />
            </div>
            <div className={main.MC_box7}>
              <MainSchedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import MainVisual from "../../../../components/template1/MainVisual"
import MainSchedule from "../../../../components/template1/MainSchedule"
import MainPopup from "../../../../components/template1/MainPopup"
import MainNotice from "../../../../components/template1/MainNotice"
import MainMeal from "../../../../components/template1/MainMeal"
import MainLink01 from "../../../../components/template1/MainLink01"
import MainGallery from "../../../../components/template1/MainGallery"
import main from '../../../../styles/template1/main.module.css';
import widget from '../../../../styles/template1/widget.module.css';

function App() {
  return (
    <div className={main.container_wrap}>
      <div className={main.MC_wrap1}>
        <div className={main.container}>
          <div className={main.con_wrap1}>
            <div className={main.con_content}>
              <div className={main.MC_box1}>
                <MainVisual widget={widget} />
              </div>
              <div className={main.MC_box2}>
                <MainLink01 widget={widget} />
              </div>
              <div className={main.MC_box3}>
                <MainNotice widget={widget} />
              </div >
              <div className={main.MC_box4}>
                <MainPopup widget={widget} />
              </div>
            </div>
          </div>
          <div className={main.con_wrap2}>
            <div className={main.MC_box5}>
              <MainMeal widget={widget} />
            </div>
            <div className={main.MC_box6}>
              <MainGallery widget={widget} />
            </div>
            <div className={main.MC_box7}>
              <MainSchedule widget={widget} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

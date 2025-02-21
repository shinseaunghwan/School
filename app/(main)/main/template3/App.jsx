import React from 'react';
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
// import layout from "../../../../styles/Layout.module.css"


function App() {
  return (
    <div className={ui.container_wrap}>
           <div className={`${ui.MC_wrap1} ${ui.container}`}>
        <div className={ui.MC_box1}>
          <MainVisual widget={widget} />
        </div>
        <div className={ui.MC_cont}>
          <div className={ui.MC_box2}>
            <MainPopup widget={widget} />
          </div>
          <div className={ui.MC_box3}>
            <MainMeal widget={widget} />
          </div>
        </div>
        
      </div>  
      <div className={`${ui.MC_wrap2} ${ui.container}`}>
      <div className={ui.MC_box4}>
          <MainLink01 widget={widget} />
        </div>
      </div>
      <div className={`${ui.MC_wrap3} ${ui.container}`}>
      <div className={ui.MC_box5}>
          <MainNotice widget={widget} />
        </div>
      </div>

      <div className={`${ui.MC_wrap4} ${ui.container}`}>
      <div className={ui.MC_box6}>
          <MainSchedule widget={widget} />
        </div>
      </div>

      <div className={`${ui.MC_wrap5} ${ui.container}`}>
      <div className={ui.MC_box7}>
          <MainGallery widget={widget} />
        </div>
      </div>
      <Banner/>
    </div>
  );
}

export default App;


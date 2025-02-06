import React from 'react';
import MainVisual from "../../../../components/template2/MainVisual"
import MainSchedule from "../../../../components/template2/MainSchedule"
import MainPopup from "../../../../components/template2/MainPopup"
import MainNotice from "../../../../components/template2/MainNotice"
import MainMeal from "../../../../components/template2/MainMeal"
import MainLink01 from "../../../../components/template2/MainLink01"
import MainGallery from "../../../../components/template2/MainGallery"
import Banner from "../../../../components/template2/Banner"
import ui from '../../../../styles/template2/T0002.module.css';



function App() {
  return (
    <div className={ui.container_wrap}>
      <div className={ui.MC_wrap1}>
      <div className={ui.MC_box1}>
        <MainVisual />
      </div>
      </div>
      <div className={`${ui.MC_wrap2} container`}>
      <div className={ui.MC_box2}>
        <MainLink01 />
      </div>
      </div>
      <div className={ui.MC_wrap3}>
      <div className={ui.MC_box3}>
        <MainNotice />
</div>
<div className={ui.MC_box4}>
  <MainMeal />
</div>
<div className={ui.MC_box5}>
<MainPopup />
</div>
      </div>
      <div className={ui.MC_wrap4}>
      <div className={ui.MC_box6}>
<MainGallery/>
</div>
      </div>
      <div className={ui.MC_wrap5}>
      <div className={ui.MC_box7}>
<MainSchedule />
</div>
      </div>
      <Banner />
    </div>
  );
}

export default App;


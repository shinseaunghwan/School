import React from 'react';
import MainVisual from "../../../components/MainVisual"
import MainSchedule from "../../../components/MainSchedule"
import MainPopup from "../../../components/MainPopup"
import MainNotice from "../../../components/MainNotice"
import MainMeal from "../../../components/MainMeal"
import MainLink01 from "../../../components/MainLink01"
import MainGallery from "../../../components/MainGallery"


function App() {
  return (
    <div id='container'>
      <div className="MC_wrap1">
        <div className="container">
          <div className="con_wrap1">
            <div className="con_content">
              <div className="MC_box1">
                <MainVisual />
              </div>
              <div className="MC_box2">
                <MainLink01 />
              </div>
              <div className="MC_box3">
                <MainNotice />
              </div >
              <div className="MC_box4">
                <MainPopup />
              </div>
            </div>
          </div>
          <div className="con_wrap2">
            <div className="MC_box5">
              <MainMeal />
            </div>
            <div className="MC_box6">
              <MainGallery />
            </div>
            <div className="MC_box7">
              <MainSchedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

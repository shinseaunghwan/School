import React from 'react';
import MainVisual from "../../../../components/template1/MainVisual"
import MainSchedule from "../../../../components/template1/MainSchedule"
import MainPopup from "../../../../components/template1/MainPopup"
import MainNotice from "../../../../components/template1/MainNotice"
import MainMeal from "../../../../components/template1/MainMeal"
import MainLink01 from "../../../../components/template1/MainLink01"
import MainGallery from "../../../../components/template1/MainGallery"

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

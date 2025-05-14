
import React from "react";
import layout from "../../../../styles/Layout.module.css";
import sub from "../../../../styles/sub.module.css";
import HeaderWrap from "./HeaderWrap"
import ContShow from "./ContShow"
import Toggle from "./Toggle2"

function App() {

  return (
    <>
    <HeaderWrap />
    <div className={`${layout.container} ${sub.area}`}> 
      <ContShow />
      <Toggle title="code" />
    </div>
  
    </>
  );
}

export default App;
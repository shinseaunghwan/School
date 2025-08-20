// app/(main)/template/sub/App.jsx
"use client";
import React, { createContext } from "react";
import widget from "../../../../../styles/sub/sub.module.css";
// import Lnb from "../../../../../components/sub/Lnb";
import Location from "../../../../../components/sub/Location";
import Sns from "../../../../../components/sub/Sns";
import MenuList from "../Menu";

export const WidgetContext = createContext();

// children prop을 받습니다.
function App({ children }) {
  return (
    <MenuList>
      {(items) => (
        <WidgetContext.Provider value={widget}>
          <div className={widget.subCntBody}>
            {/* <Lnb items={items} /> */}
            <div className={`${widget.subContainer} ${widget.noLnb}`}>
              <div className={widget.subLocation}>
                <h2 className={widget.pageTitle}>
                  <span>{items[0].name}</span>
                </h2>
                <Location items={items}/>
                <Sns />
              </div>
              
              {children}
            </div>
          </div>
        </WidgetContext.Provider>
      )}
    </MenuList>
  );
}

export default App;
"use client";
import React, { createContext } from "react";
import widget from "../../../../../styles/sub/sub.module.css";
import Lnb from "../../../../../components/sub/Lnb";
import Location from "../../../../../components/sub/Location";
import Sns from "../../../../../components/sub/Sns";
import MenuList from "../Menu";
import SubWrap from "./(sub)/SubWrap";

export const WidgetContext = createContext();

function App() {
  return (
    <MenuList>
      {(items) => (
        <WidgetContext.Provider value={widget}>
          <div className={widget.subCntBody}>
            <Lnb items={items} />
            <div className={widget.subContainer}>
              <div className={widget.subLocation}>
                <h2 className={widget.pageTitle}>
                  <span>{items[0].name}</span>
                </h2>
                <Location items={items}/>
                <Sns />
              </div>
              <SubWrap />
            </div>
            </div>
          </WidgetContext.Provider>
      )}
    </MenuList>
  );
}

export default App;

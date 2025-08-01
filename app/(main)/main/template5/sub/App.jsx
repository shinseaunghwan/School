"use client"
import React, { createContext, useMemo } from 'react';
import widget from "../../../../../styles/sub/sub.module.css"
import Lnb from "../../../../../components/sub/Lnb"
import Location from "../../../../../components/sub/Location"
import Sns from "../../../../../components/sub/Sns"
import SubWrap from "./(sub)/SubWrap"


export const WidgetContext = createContext();

function App() {
    // 메뉴 데이터 정의
    const items = useMemo(
      () => [
        {
          id: 0,
          name: "test1",
          href: "",
          target: "_self",
          subMenu: [
            { name: "depth01", href: "#", target: "_self" },
            { name: "depth02", href: "#", target: "_self" },
            { name: "depth03", href: "#", target: "_blank", titleAttr: "새창" },
            { name: "depth04", href: "#", target: "_self", isActive: true },
          ],
        },
        { id: 1, name: "test2", href: "#", target: "_self",
           subMenu: [
            { name: "depth01", href: "#", target: "_self" },
            { name: "depth02", href: "#", target: "_self" },
            { name: "depth03", href: "#", target: "_blank", titleAttr: "새창" },
            { name: "depth04", href: "#", target: "_self", isActive: true },
          ],
         },
        { id: 2, name: "test3", href: "#", target: "_self",
           subMenu: [
            { name: "depth01", href: "#", target: "_self" },
            { name: "depth02", href: "#", target: "_self" },
            { name: "depth03", href: "#", target: "_blank", titleAttr: "새창" },
            { name: "depth04", href: "#", target: "_self", isActive: true },
          ],
         },
        { id: 3, name: "test4", href: "#", target: "_self",
           subMenu: [
            { name: "depth01", href: "#", target: "_self" },
            { name: "depth02", href: "#", target: "_self" },
            { name: "depth03", href: "#", target: "_blank", titleAttr: "새창" },
            { name: "depth04", href: "#", target: "_self", isActive: true },
          ],
         },
        { id: 4, name: "test5", href: "#", target: "_self",
           subMenu: [
            { name: "depth01", href: "#", target: "_self" },
            { name: "depth02", href: "#", target: "_self" },
            { name: "depth03", href: "#", target: "_blank", titleAttr: "새창" },
            { name: "depth04", href: "#", target: "_self", isActive: true },
          ],
         },
      ],
      []
    );

  return (
            
              <WidgetContext.Provider value={widget}>
            <div className={widget.subCntBody}>
                <Lnb items={items}/>
                <div className={widget.subContainer}>
                    <div className={widget.subLocation}>
                        <h2 className={widget.pageTitle}><span>타이틀</span></h2>
                        <Location/>
                        <Sns />
                    </div>
                    <SubWrap />
                    </div>
                    </div>
                    </WidgetContext.Provider>
                    
  );
}

export default App;

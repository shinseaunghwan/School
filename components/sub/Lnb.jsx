"use client";
import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/sub/App";
import debounce from "lodash.debounce";


export default function Lnb({items}) {
  const widget = useContext(WidgetContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // 초기값을 true로 설정하여 서버 렌더링 시 nav 표시
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const menuRefs = useRef([]);

  // 서브 메뉴의 활성화 상태 토글
  const handleMenuClick = (e, index) => {
    e.preventDefault();
    setActiveMenuIndex((prev) => (prev === index ? null : index));
  };

  // 모바일 메뉴 토글
  const handleMobileMenuToggle = (e) => {
    e.preventDefault();
    if (!isDesktop) {
      setIsMobileMenuOpen((prev) => !prev);
    }
  };

 

  // 윈도우 리사이즈 처리 및 초기 상태 설정
  useEffect(() => {
    const updateDisplay = () => {
      const isDesktopView = window.innerWidth >= 1281;
      setIsDesktop(isDesktopView);
      if (isDesktopView) {
        setIsMobileMenuOpen(false); // 데스크톱에서는 모바일 메뉴 닫기
      }
    };

    const handleResize = debounce(updateDisplay, 50);

    if (typeof window !== "undefined") {
      updateDisplay(); // 초기 렌더링 시 즉시 실행
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
        handleResize.cancel(); // 디바운스 클린업
      }
    };
  }, []);

  return (
    <div className={widget.lnb}>
      <h2 onClick={handleMobileMenuToggle}>
        <span>타이틀</span>
        <em className="hid">{isMobileMenuOpen ? "메뉴 열림" : "메뉴 닫침"}</em>
      </h2>
      <nav
        style={{
          transition: "opacity 0.3s ease, max-height 0.3s ease",
          opacity: isDesktop || isMobileMenuOpen ? 1 : 0,
          maxHeight: isDesktop || isMobileMenuOpen ? "1000px" : "0",
        }}
        aria-hidden={!(isDesktop || isMobileMenuOpen)}
      >
        <ul className={widget.dep01}>
          {items.map((item) => (
            <li
              key={item.id}
              className={`${activeMenuIndex === item.id ? widget.active : ""} ${item.subMenu ? widget.dep : ""}`}
              title={activeMenuIndex === item.id ? "열림" : "닫힘"}
            >
              <a
                href={item.href}
                target={item.target}
                onClick={(e) => handleMenuClick(e, item.id)}
              >
                <span>{item.name}</span>
              </a>
              {item.subMenu && (
                <ul className={widget.dep02}>
                  {item.subMenu.map((subItem, index) => (
                    <li
                      key={index}
                      className={subItem.isActive ? widget.active : ""}
                    >
                      <a
                        href={subItem.href}
                        target={subItem.target}
                        title={subItem.titleAttr || undefined}
                      >
                        <span>{subItem.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
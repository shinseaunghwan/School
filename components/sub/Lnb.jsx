"use client";
import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/sub/App";
import debounce from "lodash.debounce";
import Link from "next/link";

export default function Lnb({ items }) {
  const widget = useContext(WidgetContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const sortedItems = useMemo(() => [...items].sort((a, b) => a.order - b.order), [items]);

  const activeDepth1Item = useMemo(() => {
    const activeItem = sortedItems.find(
      (item) => item.depth === 1 && item.id === activeMenuId
    );
    return activeItem || sortedItems.find((item) => item.depth === 1) || { name: "Menu", menuId: null };
  }, [sortedItems, activeMenuId]);

  const handleMenuClick = useCallback((e, id) => {
    e.preventDefault();
    setActiveMenuId((prev) => (prev === id ? null : id));
  }, []);

  const handleMobileMenuToggle = useCallback((e) => {
    e.preventDefault();
    if (!isDesktop) {
      setIsMobileMenuOpen((prev) => !prev);
    }
  }, [isDesktop]);


  useEffect(() => {
    const updateDisplay = () => {
      const isDesktopView = window.innerWidth >= 1281;
      setIsDesktop(isDesktopView);
      if (isDesktopView) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = debounce(updateDisplay, 50);

    if (typeof window !== "undefined") {
      updateDisplay();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
        handleResize.cancel();
      }
    };
  }, []);

  return (
    <div className={widget.lnb}>
      <h2 onClick={handleMobileMenuToggle} role="button" aria-expanded={isMobileMenuOpen}>
        <span>{activeDepth1Item.name}</span>
        <em className="hid">{isMobileMenuOpen ? "메뉴 열림" : "메뉴 닫힘"}</em>
      </h2>
      <nav
        style={{
          transition: "opacity 0.3s ease, max-height 0.3s ease",
          opacity: isDesktop || isMobileMenuOpen ? 1 : 0,
          maxHeight: isDesktop || isMobileMenuOpen ? "1000px" : "0",
        }}
        aria-hidden={!(isDesktop || isMobileMenuOpen)}
      >
        <ul className={widget.dep01} role="menu">
          {sortedItems
            .filter((item) => item.depth === 2 && item.menuId === activeDepth1Item.menuId)
            .map((itemDepth2) => {
              const hasDepth3Items = sortedItems.some(
                (itemDepth3) =>
                  itemDepth3.menuId === itemDepth2.menuId && itemDepth3.depth === 3
              );

              return (
                <li
                  key={itemDepth2.id}
                  className={`${activeMenuId === itemDepth2.id ? widget.active : ""} ${
                    hasDepth3Items ? widget.dep : ""
                  }`}
                  role="menuitem"
                  aria-expanded={activeMenuId === itemDepth2.id}
                >
                  <Link
                    href={itemDepth2.href}
                    prefetch={false}
                    onClick={(e) => handleMenuClick(e, itemDepth2.id)}
                  >
                    <span>{itemDepth2.name}</span>
                  </Link>
                  {hasDepth3Items && (
                    <ul className={widget.dep02} role="menu">
                      {sortedItems
                        .filter(
                          (itemDepth3) =>
                            itemDepth3.menuId === itemDepth2.menuId &&
                            itemDepth3.depth === 3
                        )
                        .map((itemDepth3) => (
                          <li
                            key={itemDepth3.id}
                            className={activeMenuId === itemDepth3.id ? widget.active : ""}
                            role="menuitem"
                          >
                            <Link
                              href={itemDepth3.href}
                              prefetch={false}
                              onClick={(e) => handleMenuClick(e, itemDepth3.id)}
                            >
                              <span>{itemDepth3.name}</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}
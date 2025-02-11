"use client"
import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../styles/header.module.css'; 


const Search = () => {
    const [windowWidth, setWindowWidth] = useState(0); // 초기값을 0으로 설정하여 SSR 방지
    const [toggleBtn, setToggleBtn] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        // 클라이언트 측에서만 실행
        const width = window.innerWidth;
        setWindowWidth(width);
        setToggleBtn(width <= 1240);
        setShowSearch(width > 1240);

        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            setToggleBtn(width <= 1240);
            setShowSearch(width > 1240);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSrcToggleClick = (e) => {
        setToggleBtn(prevBtnState => !prevBtnState);
        setShowSearch(prevShowState => !prevShowState);
    }

    const SearchWrapToggleButton = ({ toggleBtn, onClick }) => {
        let AttrLst = [];
        (toggleBtn === true) ? AttrLst = ['xi-search', '검색 활성화'] : AttrLst = ['xi-close', '검색 비활성화'];

        return (
            <button className={styles.searchOpen} onClick={onClick}>
                <i className={AttrLst[0]} aria-hidden="true"></i>
                <span className={styles.hid}>{AttrLst[1]}</span>
            </button>
        )
    }

    function handleFormSubmit(e) {
        e.preventDefault();
    }

    return (
        <Fragment>
            {windowWidth <= 1240 && <SearchWrapToggleButton toggleBtn={toggleBtn} onClick={handleSrcToggleClick} />}
            {showSearch && (
                <div className={styles.box_search}>
                    <form onSubmit={handleFormSubmit}>
                        <input type="text" name="qt" className={styles.total_search} placeholder="검색어를 입력하세요" title="검색어를 입력해주세요" />
                        <button className={styles.srch_btn}>
                            <i className="xi-search" aria-hidden="true"></i>
                            <span className={styles.hid}>검색</span>
                        </button>
                    </form>
                </div>
            )}
        </Fragment>
    )
}

export default Search
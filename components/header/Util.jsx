"use client"
import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../styles/header.module.css'; 
import FullMnBtn from './FullMnBtn';

const Util = ({setSelectMenuType, setIsMenuOpen}) => {
    
    const [infoLogin, setInfoLogin] = useState([null, null]); // 로그인 상태

    const handleLogin = () => {
        // 로그인 상태 변경
        setInfoLogin(['honggildong', '홍길동']);
    };

    function MemberInfo({ infoLogin }) {
        const [loginId, loginName] = infoLogin;

        const handleLogout = () => {
            // 로그아웃 상태 변경
            setInfoLogin([null, null]);
        };

        if (!loginId && !loginName) { // 로그인전
            return (
                <ul className={styles.util}>
                    <li><a href="#">홈</a></li>
                    <li><button onClick={handleLogin}>로그인</button></li>
                    <li><a href="#">회원가입</a></li>
                </ul>
            )
        } else { // 로그인후
            return (
                <Fragment>
                    <a href="#" className={`${styles.alarm} ${styles.new}`}>새알림 <em>2</em>건</a>
                    <a href="#">홈</a>
                    <ul className={styles.user}>
                        <li className={styles.name}>{loginName} ({loginId})</li>
                        <li><a href="#">마이페이지</a></li>
                        <li><button onClick={handleLogout}>로그아웃</button></li>
                    </ul>
                    <ul className={styles.util}>
                        <li><a href="#">관리자시스템</a></li>
                    </ul>
                </Fragment>
            )
        }
    }

    const FontSizeScale = () => {
        const [fontSize, setfontSize] = useState(20); // html 폰트 사이즈 기본 20px
        useEffect(() => {
            const htmlFontSize = document.documentElement;
            htmlFontSize.style.fontSize = `${fontSize}px`; // 변경된 폰트 크기를 적용
        }, [fontSize]); // fontSize 상태가 변경될 때마다 실행

        const handleFontSize = (role) => {
            switch (role) {
                case 'scaleDown':
                    setfontSize(fontSize - 1);
                    break;
                case 'scaleReset':
                    setfontSize(20);
                    break;
                case 'scaleUp':
                    setfontSize(fontSize + 1);
                    break;
                default:
                    break;
            }
        }

        return (
            <div className={styles.font_size}>
                <p>글자크기</p>
                <button onClick={() => handleFontSize('scaleUp')}><em className={styles.hid}>글자확대</em><i className="xi-plus"></i></button>
                <button onClick={() => handleFontSize('scaleReset')}><em className={styles.hid}>원래대로</em><i className="xi-layout-full-o"></i></button>
                <button onClick={() => handleFontSize('scaleDown')}><em className={styles.hid}>글자축소</em><i className="xi-minus"></i></button>
            </div>
        )
    }

    const MenuType = (props) => {
        function handelMenuType() {
            setSelectMenuType(props.menuType);
        }
        return (
            <button className={styles.fullmenu} onClick={handelMenuType}>{props.name}</button>
        )

    }
    return (
        <div className={styles.topUtil}>
            <div className={styles.util_wrap}>
                <MemberInfo infoLogin={infoLogin} />
            </div>
            {/* 로그인 전/후 공통 */}
            <FontSizeScale />
            {/* 전체메뉴 / 사이트맵 */}
            <FullMnBtn onClick={() => setIsMenuOpen(true)} LinkClassName={styles.fullmenu} IconClassName={'xi-bars'} LinkTitle={'전체메뉴'} LinkTitleHide={'열림'} />
            <div className={styles.menuTypeWrap}>
                <MenuType name="oneDown" menuType={styles.oneDown} />
                <MenuType name="oneFull" menuType={styles.oneFull} />
                <MenuType name="fullDown" menuType={styles.fullDown} />
            </div>
        </div>
    )
}

export default Util
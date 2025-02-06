"use client"

import React, { useState, useEffect, Fragment } from 'react';
import '../../../../styles/global.css';
import '../../../../styles/template1/Layout.css';


const Header = () => {
    const HeaderTitle = (props) => {
        return <h1><a href={props.url}><img src={props.src} alt={props.schoolName} /></a></h1>
    }

    const [selectMenuType, setSelectMenuType] = useState('oneDown');

    const CreateMenu = ({ menuType }) => {
        const Items = [
            { href: '/', depth: 1, menuId: 'menu1', order: 1, name: "1뎁스 메뉴명1", id: 1 },
            { href: '/', depth: 1, menuId: 'menu2', order: 2, name: "1뎁스 메뉴명2", id: 2 },
            { href: '/', depth: 1, menuId: 'menu5', order: 5, name: "1뎁스 메뉴명5", id: 3 },
            { href: '/', depth: 1, menuId: 'menu4', order: 4, name: "1뎁스 메뉴명4", id: 4 },
            { href: '/', depth: 1, menuId: 'menu3', order: 3, name: "1뎁스 메뉴명3", id: 5 },
            { href: '/', depth: 2, menuId: 'menu1', order: 1, name: "2뎁스 메뉴명1", id: 6 },
            { href: '/', depth: 2, menuId: 'menu2', order: 1, name: "2뎁스 메뉴명1", id: 7 },
            { href: '/', depth: 2, menuId: 'menu3', order: 1, name: "2뎁스 메뉴명1", id: 8 },
            { href: '/', depth: 2, menuId: 'menu3', order: 2, name: "2뎁스 메뉴명2", id: 9 },
            { href: '/', depth: 2, menuId: 'menu3', order: 3, name: "2뎁스 메뉴명3", id: 10 },
            { href: '/', depth: 3, menuId: 'menu2', order: 2, name: "3뎁스 메뉴명2", id: 11 },
            { href: '/', depth: 3, menuId: 'menu1', order: 1, name: "3뎁스 메뉴명1", id: 12 },
            { href: '/', depth: 3, menuId: 'menu3', order: 1, name: "3뎁스 메뉴명3", id: 13 },
            { href: '/', depth: 3, menuId: 'menu2', order: 1, name: "3뎁스 메뉴명2", id: 14 },
            { href: '/', depth: 2, menuId: 'menu4', order: 1, name: "2뎁스 메뉴명1", id: 15 },
            { href: '/', depth: 2, menuId: 'menu4', order: 2, name: "2뎁스 메뉴명2", id: 16 },
            { href: '/', depth: 2, menuId: 'menu4', order: 3, name: "2뎁스 메뉴명3", id: 17 }
        ];

        const [selectDepth1Index, setSelectDepth1Index] = useState(null);
        const [selectDepth2Id, setSelectDepth2Id] = useState(null);
        const [fullDownState, setFullDownState] = useState(null);

        const handleDepth1MouseEnter = (index) => {
            setSelectDepth1Index(index);
        }
        const handleDepth2MouseEnter = (id) => {
            setSelectDepth2Id(id);
        }
        const handleDepth1MouseLeave = () => {
            setSelectDepth1Index(null);
        }
        const handleDepth2MouseLeave = () => {
            setSelectDepth1Index(null);
            setSelectDepth2Id(null);
        }

        if (menuType === 'fullMenu') {
            return (
                <div className="depth01">
                    <ul>
                        {Items.sort((a, b) => a.order - b.order).filter((itemDepth1) => itemDepth1.depth === 1).map((itemDepth1, index) => {
                            // 1뎁스 메뉴 아이템을 기반으로 2뎁스 메뉴가 있는지 확인
                            const hasDepth2Items = Items.sort((a, b) => a.order - b.order).some((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2);
                            const hasDepth3Items = Items.sort((a, b) => a.order - b.order).some((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3);

                            return (
                                <li key={itemDepth1.id}><a href={itemDepth1.href}><span>{itemDepth1.name}</span></a>
                                    {hasDepth2Items && (
                                        <div className="depth02">
                                            <ul className="group">
                                                {Items.filter((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2).map((itemDepth2) => (
                                                    <li key={itemDepth2.id}>
                                                        <a href={itemDepth2.href}>{itemDepth2.name}</a>
                                                        {hasDepth3Items && (
                                                            <div className="depth03">
                                                                <ul className="group">
                                                                    {Items.filter((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3).map((itemDepth3, index) => (
                                                                        <li key={itemDepth3.id}>
                                                                            <a href={itemDepth3.href}><span>{itemDepth3.name}</span></a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

            )
        }

        return (
            <div id="gnb" className={(selectMenuType === 'fullDown' && fullDownState) ? 'active' : ''} onMouseEnter={() => setFullDownState(true)} onMouseLeave={() => { setFullDownState(false); handleDepth2MouseLeave(); }}>
                <div className="depth01">
                    <ul>
                        {Items.sort((a, b) => a.order - b.order).filter((itemDepth1) => itemDepth1.depth === 1).map((itemDepth1, index) => {
                            // 1뎁스 메뉴 아이템을 기반으로 2뎁스 메뉴가 있는지 확인
                            const hasDepth2Items = Items.sort((a, b) => a.order - b.order).some((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2);
                            const hasDepth3Items = Items.sort((a, b) => a.order - b.order).some((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3);

                            return (
                                <li key={itemDepth1.id} className={selectDepth1Index === index ? 'on' : ''} onMouseEnter={() => handleDepth1MouseEnter(index)} onMouseLeave={() => handleDepth1MouseLeave}><a href={itemDepth1.href}><span>{itemDepth1.name}</span></a>
                                    {hasDepth2Items && (
                                        <div className="depth02">
                                            <div className="titBox">
                                                <strong>{itemDepth1.name}</strong>
                                                <p>메뉴를 클릭하시면 <br />해당 페이지로 이동합니다</p>
                                            </div>
                                            <ul className="group">
                                                {Items.filter((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2).map((itemDepth2) => (
                                                    <li key={itemDepth2.id} className={selectDepth2Id === itemDepth2.id ? 'active' : ''} onMouseEnter={() => handleDepth2MouseEnter(itemDepth2.id)} onMouseLeave={() => handleDepth2MouseLeave}>
                                                        <a href={itemDepth2.href}>{itemDepth2.name}</a>
                                                        {selectDepth2Id === itemDepth2.id && hasDepth3Items && (
                                                            <div className="depth03">
                                                                <ul className="group">
                                                                    {Items.filter((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3).map((itemDepth3, index) => (
                                                                        <li key={itemDepth3.id}>
                                                                            <a href={itemDepth3.href}><span>{itemDepth3.name}</span></a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div >

        )
    }

    const Search = () => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 윈도우 사이즈 상태
        const [toggleBtn, setToggleBtn] = useState(window.innerWidth <= 1240); // 현재 버튼 상태
        const [showSearch, setShowSearch] = useState(window.innerWidth > 1240); // 검색 영역 상태(1240 이상일때 true)

        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            setToggleBtn(width <= 1240);
            setShowSearch(width > 1240);
        };

        useEffect(() => {
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
                <button className='searchOpen' onClick={onClick}>
                    <i className={AttrLst[0]} aria-hidden="true"></i>
                    <span className="hid">{AttrLst[1]}</span>
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
                    <div className="box_search">
                        <form onSubmit={handleFormSubmit}>
                            <input type="text" name="qt" id="total_search" placeholder="검색어를 입력하세요" title="검색어를 입력해주세요" />
                            <button className="srch_btn">
                                <i className="xi-search" aria-hidden="true"></i>
                                <span className="hid">검색</span>
                            </button>
                        </form>
                    </div>
                )}
            </Fragment>
        )
    }

    const Util = () => {
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
                    <ul className="util">
                        <li><a href="">홈</a></li>
                        <li><button onClick={handleLogin}>로그인</button></li>
                        <li><a href="">회원가입</a></li>
                    </ul>
                )
            } else { // 로그인후
                return (
                    <Fragment>
                        <a href="" className="alarm new">새알림 <em>2</em>건</a>
                        <a href="">홈</a>
                        <ul className="user">
                            <li className="name">{loginName} ({loginId})</li>
                            <li><a href="">마이페이지</a></li>
                            <li><button onClick={handleLogout}>로그아웃</button></li>
                        </ul>
                        <ul className="util">
                            <li><a href="">관리자시스템</a></li>
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
                <div className="font-size">
                    <p>글자크기</p>
                    <button onClick={() => handleFontSize('scaleUp')}><em className="hid">글자확대</em><i className="xi-plus"></i></button>
                    <button onClick={() => handleFontSize('scaleReset')}><em className="hid">원래대로</em><i className="xi-layout-full-o"></i></button>
                    <button onClick={() => handleFontSize('scaleDown')}><em className="hid">글자축소</em><i className="xi-minus"></i></button>
                </div>
            )
        }

        const MenuType = (props) => {
            function handelMenuType() {
                setSelectMenuType(props.menuType);
            }
            return (
                <button className="fullmenu" onClick={handelMenuType}>{props.menuType}</button>
            )

        }

        return (
            <div className="topUtil">
                <div className="util_wrap">
                    <MemberInfo infoLogin={infoLogin} />
                </div>
                {/* 로그인 전/후 공통 */}
                <FontSizeScale />
                {/* 전체메뉴 / 사이트맵 */}
                <FullMnBtn onClick={() => handelFullMnBtn('open')} LinkClassName={'fullmenu'} IconClassName={'xi-bars'} LinkTitle={'전체메뉴'} LinkTitleHide={'열림'} />
                <div className='menuTypeWrap'>
                    <MenuType menuType={'oneDown'} />
                    <MenuType menuType={'oneFull'} />
                    <MenuType menuType={'fullDown'} />
                </div>
            </div>
        )
    }

    const MainNavigation = () => {
        return (
            <div id="nav" className={selectMenuType}>{/* NAV : fullDown / oneDown / oneFull */}
                <CreateMenu menuType={'oneDown'} />
            </div>
        )
    }

    // 전체메뉴 상태
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // 전체메뉴 on/off 버튼
    const FullMnBtn = ({ LinkClassName, IconClassName, LinkTitle, LinkTitleHide, onClick }) => {
        return <button className={LinkClassName} onClick={onClick}>{IconClassName && <i className={IconClassName} aria-hidden='true'></i>}{LinkTitle}<span className='hid'>{LinkTitleHide}</span></button>
    }
    // 전체메뉴 토글 기능
    const handelFullMnBtn = (role) => {
        switch (role) {
            case 'open':
                setIsMenuOpen(true);
                break;
            case 'close':
                setIsMenuOpen(false);
                break;
            default:
                break;
        }
    }

    const PopFullmenu = () => {
        return (
            isMenuOpen === true && (
                <div className="popFullmenu">
                    <div className="fullmenu_wrap">
                        <h2>전체메뉴</h2>
                        <div className="popUntil">
                            <ul className="user"></ul>
                            <ul className="util"></ul>
                        </div>
                        <div className="fullmenu_group">
                            <CreateMenu menuType={'fullMenu'} />{/* NAV : fullMenu */}
                        </div>
                        <FullMnBtn onClick={() => handelFullMnBtn('close')} LinkClassName={'fullmenuClose'} IconClassName={'xi-close'} LinkTitle={''} LinkTitleHide={'전체메뉴 닫힘'} />
                    </div>
                </div>
            )
        )
    }

    return (
        <header id="header">
            <div className="top container">
                <HeaderTitle url={'/'} src={'./../images/template/T0030/main/logo.png'} schoolName={'학교명'} />
                <Search />
                <Util />
            </div>

            {/* NAV: fullDown / oneDown / oneFull */}
            <MainNavigation />

            <PopFullmenu />

            {/* 상단팝업 OPEN / CLOSE */}
            {/* <a href="" className="popBtn">상단팝업<span className="hid">닫힘</span></a> */}
        </header>

    )
}
export default Header;


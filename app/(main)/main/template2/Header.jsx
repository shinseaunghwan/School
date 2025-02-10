"use client"
import Link from 'next/link';
import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../../../styles/header.module.css'; 
import layout from '../../../../styles/Layout.module.css'; 

const Header = () => {
    const HeaderTitle = (props) => {
        return <h1><Link href={props.url}><img src={props.src} alt={props.schoolName} /></Link></h1>
    }

    const [selectMenuType, setSelectMenuType] = useState(styles.oneDown);



    
    const CreateMenu = ({ menuType }) => {
        const Items = [
            { href: '/', depth: 1, menuId: 'menu1', order: 1, name: "1뎁스 메뉴명1", id: 1342378571 },
            { href: '/', depth: 1, menuId: 'menu2', order: 2, name: "1뎁스 메뉴명2", id: 29867314365 },
            { href: '/', depth: 1, menuId: 'menu5', order: 5, name: "1뎁스 메뉴명5", id: 39867314365 },
            { href: '/', depth: 1, menuId: 'menu4', order: 4, name: "1뎁스 메뉴명4", id: 49867314365 },
            { href: '/', depth: 1, menuId: 'menu3', order: 3, name: "1뎁스 메뉴명3", id: 59867314365 },
            { href: '/', depth: 2, menuId: 'menu1', order: 1, name: "2뎁스 메뉴명1", id: 69867314365 },
            { href: '/', depth: 2, menuId: 'menu2', order: 1, name: "2뎁스 메뉴명1", id: 79867314365 },
            { href: '/', depth: 2, menuId: 'menu3', order: 1, name: "2뎁스 메뉴명1", id: 89867314365 },
            { href: '/', depth: 2, menuId: 'menu3', order: 2, name: "2뎁스 메뉴명2", id: 99867314365 },
            { href: '/', depth: 2, menuId: 'menu3', order: 3, name: "2뎁스 메뉴명3", id: 198673143650 },
            { href: '/', depth: 3, menuId: 'menu2', order: 2, name: "3뎁스 메뉴명2", id: 198673143651 },
            { href: '/', depth: 3, menuId: 'menu1', order: 1, name: "3뎁스 메뉴명1", id: 198673143652 },
            { href: '/', depth: 3, menuId: 'menu3', order: 1, name: "3뎁스 메뉴명3", id: 198673143653 },
            { href: '/', depth: 3, menuId: 'menu2', order: 1, name: "3뎁스 메뉴명2", id: 198673143654 },
            { href: '/', depth: 2, menuId: 'menu4', order: 1, name: "2뎁스 메뉴명1", id: 198673143655 },
            { href: '/', depth: 2, menuId: 'menu4', order: 2, name: "2뎁스 메뉴명2", id: 198673143656 },
            { href: '/', depth: 2, menuId: 'menu4', order: 3, name: "2뎁스 메뉴명3", id: 198673143657 }
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
    
        if (menuType === styles.fullMenu) {
            return (
                <div className={styles.depth01}>
                    <ul>
                        {Items.sort((a, b) => a.order - b.order).filter((itemDepth1) => itemDepth1.depth === 1).map((itemDepth1, index) => {
                            const hasDepth2Items = Items.sort((a, b) => a.order - b.order).some((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2);
                            const hasDepth3Items = Items.sort((a, b) => a.order - b.order).some((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3);
    
                            return (
                                <li key={itemDepth1.id}><a href={itemDepth1.href}><span>{itemDepth1.name}</span></a>
                                    {hasDepth2Items && (
                                        <div className={styles.depth02}>
                                            <ul className={styles.group}>
                                                {Items.filter((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2).map((itemDepth2) => (
                                                    <li key={itemDepth2.id}>
                                                        <a href={itemDepth2.href}>{itemDepth2.name}</a>
                                                        {hasDepth3Items && (
                                                            <div className={styles.depth03}>
                                                                <ul className={styles.group}>
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
            <div className={`${styles.gnb} ${(selectMenuType === styles.fullDown && fullDownState) ? styles.active : ''}`} onMouseEnter={() => setFullDownState(true)} onMouseLeave={() => { setFullDownState(false); handleDepth2MouseLeave(); }}>
                <div className={styles.depth01}>
                    <ul>
                        {Items.sort((a, b) => a.order - b.order).filter((itemDepth1) => itemDepth1.depth === 1).map((itemDepth1, index) => {
                            const hasDepth2Items = Items.sort((a, b) => a.order - b.order).some((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2);
                            const hasDepth3Items = Items.sort((a, b) => a.order - b.order).some((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3);
    
                            return (
                                <li key={itemDepth1.id} className={selectDepth1Index === index ? styles.on : ''} onMouseEnter={() => handleDepth1MouseEnter(index)} onMouseLeave={() => handleDepth1MouseLeave}><a href={itemDepth1.href}><span>{itemDepth1.name}</span></a>
                                    {hasDepth2Items && (
                                        <div className={styles.depth02}>
                                            <div className={styles.titBox}>
                                                <strong>{itemDepth1.name}</strong>
                                                <p>메뉴를 클릭하시면 <br />해당 페이지로 이동합니다</p>
                                            </div>
                                            <ul className={styles.group}>
                                                {Items.filter((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2).map((itemDepth2) => (
                                                    <li key={itemDepth2.id} className={selectDepth2Id === itemDepth2.id ? styles.active : ''} onMouseEnter={() => handleDepth2MouseEnter(itemDepth2.id)} onMouseLeave={() => handleDepth2MouseLeave}>
                                                        <a href={itemDepth2.href}>{itemDepth2.name}</a>
                                                        {selectDepth2Id === itemDepth2.id && hasDepth3Items && (
                                                            <div className={styles.depth03}>
                                                                <ul className={styles.group}>
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
            </div>
        )
    }

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
                    <ul className={styles.util}>
                        <li><a href="">홈</a></li>
                        <li><button onClick={handleLogin}>로그인</button></li>
                        <li><a href="">회원가입</a></li>
                    </ul>
                )
            } else { // 로그인후
                return (
                    <Fragment>
                        <a href="" className={`${styles.alarm} ${styles.new}`}>새알림 <em>2</em>건</a>
                        <a href="">홈</a>
                        <ul className={styles.user}>
                            <li className={styles.name}>{loginName} ({loginId})</li>
                            <li><a href="">마이페이지</a></li>
                            <li><button onClick={handleLogout}>로그아웃</button></li>
                        </ul>
                        <ul className={styles.util}>
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
                <FullMnBtn onClick={() => handelFullMnBtn('open')} LinkClassName={styles.fullmenu} IconClassName={'xi-bars'} LinkTitle={'전체메뉴'} LinkTitleHide={'열림'} />
                <div className={styles.menuTypeWrap}>
                    <MenuType name="oneDown" menuType={styles.oneDown} />
                    <MenuType name="oneFull" menuType={styles.oneFull} />
                    <MenuType name="fullDown" menuType={styles.fullDown} />
                </div>
            </div>
        )
    }

    const MainNavigation = () => {
        return (
            <div className={`${styles.nav} ${selectMenuType}`}>{/* NAV : fullDown / oneDown / oneFull */}
                <CreateMenu menuType={styles.oneDown} />
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
                <div className={styles.popFullmenu}>
                    <div className={styles.fullmenu_wrap}>
                        <h2>전체메뉴</h2>
                        <div className={styles.popUntil}>
                            <ul className={styles.user}></ul>
                            <ul className={styles.util}></ul>
                        </div>
                        <div className={styles.fullmenu_group}>
                            <CreateMenu menuType={styles.fullMenu} />{/* NAV : fullMenu */}
                        </div>
                        <FullMnBtn onClick={() => handelFullMnBtn('close')} LinkClassName={styles.fullmenuClose} IconClassName={'xi-close'} LinkTitle={''} LinkTitleHide={'전체메뉴 닫힘'} />
                    </div>
                </div>
            )
        )
    }

    return (
        <header className={styles.header}>
            <div className={`${styles.top} ${layout.container}`}>
                <HeaderTitle url={'/'} src={'./../images/template/T0030/main/logo.png'} schoolName={'학교명'} />
                <Search />
                <Util />
            </div>
            <MainNavigation />

            <PopFullmenu />
        </header>

    )
}
export default Header;


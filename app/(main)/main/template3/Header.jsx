"use client";
import { useState } from 'react';
import styles from '../../../../styles/header/header2.module.css';
import layout from '../../../../styles/Layout.module.css';
import HeaderTitle from '../../../../components/header/HeaderTitle';
import Search from '../../../../components/header/Search';
import Util from '../../../../components/header/Util';
import MainNavigation from '../../../../components/header/MainNavigation';
import PopFullmenu from '../../../../components/header/PopFullmenu';
import { MenuProvider } from '../../../../components/header/MenuContext';

const Header = () => {
    const [selectMenuType, setSelectMenuType] = useState(styles.oneDown);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const items =  [
                    { href: '/main/template5/sub', depth: 1, menuId: 'menu1', order: 1, name: "1뎁스 메뉴명1", id: 1 },
                    { href: '/main/template5/sub', depth: 1, menuId: 'menu2', order: 2, name: "1뎁스 메뉴명2", id: 2 },
                    { href: '/main/template5/sub', depth: 1, menuId: 'menu5', order: 5, name: "1뎁스 메뉴명5", id: 3 },
                    { href: '/main/template5/sub', depth: 1, menuId: 'menu4', order: 4, name: "1뎁스 메뉴명4", id: 4 },
                    { href: '/main/template5/sub', depth: 1, menuId: 'menu3', order: 3, name: "1뎁스 메뉴명3", id: 5 },
                    { href: '/main/template5/sub', depth: 2, menuId: 'menu1', order: 1, name: "2뎁스 메뉴명1", id: 6 },
                    { href: '/main/template5/sub', depth: 2, menuId: 'menu2', order: 1, name: "2뎁스 메뉴명1", id: 7 },
                    { href: '/main/template5/sub', depth: 2, menuId: 'menu3', order: 1, name: "2뎁스 메뉴명1", id: 8 },
                    { href: '/main/template5/sub', depth: 2, menuId: 'menu3', order: 2, name: "2뎁스 메뉴명2", id: 9 },
                    { href: '/main/template5/sub', depth: 2, menuId: 'menu3', order: 3, name: "2뎁스 메뉴명3", id: 10 },
                    { href: '/main/template5/sub', depth: 3, menuId: 'menu2', order: 2, name: "3뎁스 메뉴명2", id: 11 },
                    { href: '/main/template5/sub', depth: 3, menuId: 'menu1', order: 1, name: "3뎁스 메뉴명1", id: 12 },
                    { href: '/main/template5/sub', depth: 3, menuId: 'menu3', order: 1, name: "3뎁스 메뉴명3", id: 13 },
                    { href: '/main/template5/sub', depth: 3, menuId: 'menu2', order: 1, name: "3뎁스 메뉴명2", id: 14 },
                    { href: '/main/template5/sub', depth: 2, menuId: 'menu4', order: 1, name: "2뎁스 메뉴명1", id: 15 },
                    { href: '/main/template5/sub', depth: 2, menuId: 'menu4', order: 2, name: "2뎁스 메뉴명2", id: 16 },
                    { href: '/main/template5/sub', depth: 2, menuId: 'menu4', order: 3, name: "2뎁스 메뉴명3", id: 17 },
                ];

    return (
        <MenuProvider initialItems={items}>
            <div className={styles.header}>
                <div className={`${styles.top} ${layout.container}`}>
                    <HeaderTitle url={'/'} src={'/images/template/T0030/main/logo.png'} schoolName={'학교명'} />
                    <Search styles={styles} />
                    <Util styles={styles} setIsMenuOpen={setIsMenuOpen} setSelectMenuType={setSelectMenuType} />
                </div>
                <MainNavigation styles={styles} selectMenuType={selectMenuType} />
                <PopFullmenu styles={styles} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </div>
        </MenuProvider>
    );
};

export default Header;
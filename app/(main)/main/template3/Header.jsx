"use client"
import { useState } from 'react';
import styles from '../../../../styles/header2.module.css'; 
import layout from '../../../../styles/Layout.module.css'; 
import HeaderTitle from '../../../../components/header2/HeaderTitle';
import Search from '../../../../components/header2/Search';
import Util from '../../../../components/header2/Util';
import MainNavigation from '../../../../components/header2/MainNavigation';
import PopFullmenu from '../../../../components/header2/PopFullmenu';

const Header = () => {
    const [selectMenuType, setSelectMenuType] = useState(styles.oneDown);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className={styles.header}>
            <div className={`${styles.top} ${layout.container}`}>
                <HeaderTitle url={'/'} src={'./../images/template/T0030/main/logo.png'} schoolName={'학교명'} />
                <Search />
                <Util setIsMenuOpen={setIsMenuOpen} setSelectMenuType={setSelectMenuType} />
            </div>
            <MainNavigation selectMenuType={selectMenuType} />

            <PopFullmenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}  />
        </div>

    )
}
export default Header;


"use client"
import { useState } from 'react';
import styles from '../../../../styles/header/header.module.css'; 
import layout from '../../../../styles/Layout.module.css'; 
import HeaderTitle from '../../../../components/header/HeaderTitle';
import Search from '../../../../components/header/Search';
import Util from '../../../../components/header/Util';
import MainNavigation from '../../../../components/header/MainNavigation';
import PopFullmenu from '../../../../components/header/PopFullmenu';

const Header = () => {
    const [selectMenuType, setSelectMenuType] = useState(styles.oneDown);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className={styles.header}>
            <div className={`${styles.top} ${layout.container}`}>
                <HeaderTitle url={'/'} src={'./../images/template/T0030/main/logo.png'} schoolName={'학교명'} />
                <Search styles={styles} />
                <Util styles={styles} setIsMenuOpen={setIsMenuOpen} setSelectMenuType={setSelectMenuType} />
            </div>
            <MainNavigation styles={styles} selectMenuType={selectMenuType} />

            <PopFullmenu styles={styles} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}  />
        </div>

    )
}
export default Header;


import React from 'react';
import styles from '../../styles/header.module.css'; 
import CreateMenu from './CreateMenu';
import FullMnBtn from './FullMnBtn';

const PopFullmenu = ({isMenuOpen, setIsMenuOpen}) => {
    
    return (
        isMenuOpen && (
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
                    <FullMnBtn onClick={() => setIsMenuOpen(!isMenuOpen)} LinkClassName={styles.fullmenuClose} IconClassName={'xi-close'} LinkTitle={''} LinkTitleHide={'전체메뉴 닫힘'} />
                </div>
            </div>
        )
    )
}

export default PopFullmenu;

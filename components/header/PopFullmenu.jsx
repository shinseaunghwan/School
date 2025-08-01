import React from 'react';
import CreateMenu from './CreateMenu';
import FullMnBtn from './FullMnBtn';

const PopFullmenu = ({isMenuOpen, setIsMenuOpen, styles, Items}) => {
    
    return (
        isMenuOpen && (
            <div className={styles.popFullmenu}>
                <div className={styles.fullmenuWrap}>
                    <h2>전체메뉴</h2>
                    <div className={styles.popUntil}>
                        <ul className={styles.user}></ul>
                        <ul className={styles.util}></ul>
                    </div>
                    <div className={styles.fullmenuGroup}>
                        <CreateMenu styles={styles} menuType={styles.fullMenu} items={Items} />{/* NAV : fullMenu */}
                    </div>
                    <FullMnBtn onClick={() => setIsMenuOpen(!isMenuOpen)} LinkClassName={styles.fullmenuClose} IconClassName={'xi-close'} LinkTitle={''} LinkTitleHide={'전체메뉴 닫힘'} />
                </div>
            </div>
        )
    )
}

export default PopFullmenu;

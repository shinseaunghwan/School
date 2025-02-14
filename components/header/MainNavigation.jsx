import React from 'react';
// import styles from '../../styles/header.module.css'; 
import CreateMenu from './CreateMenu';

const MainNavigation = ({selectMenuType, styles}) => {

    return (
        <div className={`${styles.nav} ${selectMenuType}`}>{/* NAV : fullDown / oneDown / oneFull */}
            <CreateMenu styles={styles} selectMenuType={selectMenuType} menuType={styles.oneDown} />
        </div>
    )
}

export default MainNavigation
import React from 'react';
import styles from '../../styles/header2.module.css'; 
import CreateMenu from './CreateMenu';

const MainNavigation = ({selectMenuType}) => {

    return (
        <div className={`${styles.nav} ${selectMenuType}`}>{/* NAV : fullDown / oneDown / oneFull */}
            <CreateMenu selectMenuType={selectMenuType} menuType={styles.oneDown} />
        </div>
    )
}

export default MainNavigation
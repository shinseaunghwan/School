import React from 'react';

const NoticePopup = ({onClick, styles}) => {
    
    return (
            <a onClick={onClick} href="#" className={styles.btn_popup}>NOTICE<br /><strong>POPUP</strong></a>
    )
}
export default NoticePopup;
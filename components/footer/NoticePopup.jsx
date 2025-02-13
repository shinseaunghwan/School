import React from 'react';
import footer from "../../styles/Layout.module.css"

const NoticePopup = ({onClick}) => {
    
    return (
            <a onClick={onClick} href="#" className={footer.btn_popup}>NOTICE<br /><strong>POPUP</strong></a>
    )
}
export default NoticePopup;
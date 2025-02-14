import React from 'react';
import styles from "../../../../styles/footer/footer2.module.css"
import layout from "../../../../styles/Layout.module.css"
import ModalPop from "../../../../components/modal/modal"
import BtnTop from '../../../../components/footer/btnTop';
import FooterLink from "../../../../components/footer/footerLink"
import FooterInfo from "../../../../components/footer/footerInfo"

const Footer = () => {
    const items = [
        { url: '#', tit:'개인정보처리방침', id: 1 },
        { url: '#', tit:'저작권보호정책', id: 2 },
        { url: '#', tit:'영상정보처리방침', id: 3 },
        { url: '#', tit:'이메일주소무단수집거부', id: 4 }
      ];
      const address = [
        {text:"TEL. 123-456-7890" , id: 1 },
        {text:"FAX. 123-456-7890" , id: 2 },
        {text:"E-Mail. klic@school.kr" , id: 3 }
      ];
      
    return (
        <footer className={styles.footer}>
            <div className={layout.container}>
                <FooterLink styles={styles} items={items} />
                <FooterInfo styles={styles} items={address} />
                <BtnTop styles={styles} />
            </div>
            <ModalPop styles={styles} tit="제목" text="내용"/>
        </footer>
    )
}
export default Footer;  

import React from 'react';
import footer from "../../../../styles/Layout.module.css"
import ModalPop from "../../../../components/modal/modal"
import BtnTop from '../../../../components/footer/btnTop';

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
        <footer className={footer.footer}>
            <div className={footer.container}>
                <div className={footer.footer_link}>
                    <ul>
                    {items.map((item, index) => (
                        <li key={item.id}>
                            <a href={item.url}> {index === 0 ? <strong>{item.tit}</strong> : item.tit}</a>
                            </li>
                            ))}
                    </ul>
                    <a href="#visitPop" className={footer.visitant}>방문자통계보기<i className="xi-signal-4" aria-hidden="true"></i></a>
                </div>

                <div className={footer.f_info}>
                    <address className={footer.address}>해당 영역은 주소가 들어가는 영역입니다. 주소를 넣어주세요.</address>
                    <p>
                        {address.map((item)=>(
                            <span key={item.id}>{item.text} &nbsp;&nbsp;</span>
                        ))}
                    </p>
                    <p className={footer.copyright}>Copyright © 사이트명, All Right Reserved.</p>
                </div>
                <BtnTop />
            </div>
            <ModalPop tit="제목" text="내용"/>
        </footer>
    )
}
export default Footer;
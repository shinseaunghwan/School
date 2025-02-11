import React from 'react';
import footer from "../../../../styles/Layout.module.css"

const Footer = () => {
    return (
        <footer className={footer.footer}>
            <div className={footer.container}>
                <div className={footer.footer_link}>
                    <ul>
                        <li><a href="#"><strong>개인정보처리방침</strong></a></li>
                        <li><a href="#">저작권보호정책</a></li>
                        <li><a href="#">영상정보처리방침</a></li>
                        <li><a href="#">이메일주소무단수집거부</a></li>
                    </ul>
                    <a href="#visitPop" className={`${footer.visitant} ${footer.hash}`}>방문자통계보기<i className="xi-signal-4" aria-hidden="true"></i></a>
                </div>

                <div className={footer.f_info}>
                    <address className={footer.address}>해당 영역은 주소가 들어가는 영역입니다. 주소를 넣어주세요.</address>
                    <p>
                        <span>TEL. 123-456-7890</span>
                        <span>FAX. 123-456-7890</span>
                        <span>E-Mail. klic@school.kr</span>
                    </p>
                    <p className={footer.copyright}>Copyright © 사이트명, All Right Reserved.</p>
                </div>
                <a href="#" className={`${footer.btn_top} ${footer.pulse}`}><i className="xi-arrow-top" aria-hidden="true"></i><span className={footer.hid}>상단으로 이동</span></a>
            </div>

            <a href="#" className={`${footer.btn_popup} ${footer.hash}`}>NOTICE<br /><strong>POPUP</strong></a>
        </footer>
    )
}
export default Footer;
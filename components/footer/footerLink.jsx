import React from 'react';

const FooterLink = ({styles, items}) => {
    
    return (
        <div className={styles.footer_link}>
        <ul>
        {items.map((item, index) => (
            <li key={item.id}>
                <a href={item.url}> {index === 0 ? <strong>{item.tit}</strong> : item.tit}</a>
                </li>
                ))}
        </ul>
        <a href="#" className={styles.visitant}>방문자통계보기<i className="xi-signal-4" aria-hidden="true"></i></a>
    </div>
    )
}
export default FooterLink;
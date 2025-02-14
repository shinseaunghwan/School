import React from 'react';

const FooterInfo = ({styles, items}) => {
    
    return (
        <div className={styles.f_info}>
        <address className={styles.address}>해당 영역은 주소가 들어가는 영역입니다. 주소를 넣어주세요.</address>
        <p>
            {items.map((item)=>(
                <span key={item.id}>{item.text} &nbsp;&nbsp;</span>
            ))}
        </p>
        <p className={styles.copyright}>Copyright © 사이트명, All Right Reserved.</p>
    </div>
    )
}
export default FooterInfo;
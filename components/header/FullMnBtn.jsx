import React from 'react';


const FullMnBtn = ({ LinkClassName, IconClassName, LinkTitle, LinkTitleHide, onClick }) => {
    return <button className={LinkClassName} onClick={onClick}>{IconClassName && <i className={IconClassName} aria-hidden='true'></i>}{LinkTitle}<span className='hid'>{LinkTitleHide}</span></button>
}

export default FullMnBtn

import React from 'react';

export default function IconBtnMore ({ LinkHref, LinkClassName, IconClassName, LinkTitle }) {
  return <a href={LinkHref} className={LinkClassName}><i className={IconClassName} aria-hidden='true'></i><span className='hid'>{LinkTitle} 더보기</span></a>
}
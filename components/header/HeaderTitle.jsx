import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeaderTitle = (props) => {
    return <h1><Link href={props.url}><Image src={props.src} alt={props.schoolName} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/></Link></h1>
}

export default HeaderTitle
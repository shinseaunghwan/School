import React from 'react';
import Link from 'next/link';


const HeaderTitle = (props) => {
    return <h1><Link href={props.url}><img src={props.src} alt={props.schoolName} /></Link></h1>
}

export default HeaderTitle
"use client";

import sub from "../../../../styles/sub.module.css";
import Link from "next/link";

function HeaderWrap() {

  return (
    <div className={sub.header_wrap}>
    <a className={sub.button} href="https://ko.react.dev/" target="_blank"><svg className={sub.logo} width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>리액트 공식</a>
    {/* <a className={sub.button} href="https://nomadcoders.co/nextjs-for-beginners/lectures/4687" target="_blank">nextJs 강의</a> */}
    <Link className={sub.button} href="/">이전 페이지</Link>
</div>

  );
}

export default HeaderWrap;
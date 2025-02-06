import { Metadata } from "next";
import Link from "next/link";
import "../../styles/intro.css"
import Image from 'next/image';


export const metadata: Metadata = {
    title: "인트로",
  };

export default function MainPage () {
    return (
<div className="wrap">
  <div className="intro_page">
    <div className="tit"><h3>인트로 페이지</h3></div>
    <div className="img">
      <Image 
      src="/images/intro/intro_img.png" 
      layout='responsive'
      width={100}
      height={50}
      quality={100}
      alt="인트로"
      />
      </div>
    <div className="button"><Link href="/main/template1">템플릿 페이지 1</Link></div>
    <div className="button"><Link href="/main/template2">템플릿 페이지 2</Link></div>
    </div>
</div>
    );
}


import { Metadata } from "next";
import Link from "next/link";
import intro from "../../styles/intro.module.css"
import Image from 'next/image';
import IntroModalPop from "../../components/modal/introModal"
import LayerPopup from "../../components/layerPopup/layerPopup"

export const metadata: Metadata = {
    title: "인트로",
  };

export default function MainPage () {
    return (
<div className={intro.wrap}>
  <div className={intro.intro_page}>
    <div className={intro.tit}><h3>인트로 페이지</h3></div>
    <div className={intro.img}>
      <Image 
      src="/images/intro/intro_img.png" 
      layout='responsive'
      width={100}
      height={100}
      quality={100}
      alt="인트로"
      />
      </div>
    <div className={intro.button_wrap}>
      <IntroModalPop tit={"2025.02.13 오늘 작업 한 일"} text={"상단 스크롤링 버튼 기능 추가, 모달 팝업 기능 추가, 레이어 팝업 기능 구현"} />
      <LayerPopup tit1={"레이어"} tit2={"팝업"} />

      <div className={intro.button}><Link href="/main/template1">템플릿 페이지 1</Link></div>
      <div className={intro.button}><Link href="/main/template2">템플릿 페이지 2</Link></div>
    </div>
    
    </div>
</div>
    );
}


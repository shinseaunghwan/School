import { Metadata } from "next";
import Link from "next/link";
import intro from "../../styles/intro.module.css"
import IntroModalPop from "../../components/modal/introModal"
import LayerPopup from "../../components/layerPopup/layerPopup"
import Image from "next/image";

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
      alt="인트로"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
          />

      </div>
    <div className={intro.button_wrap}>
      <IntroModalPop tit={"메모장"} texts={
        ["NextJs 공부중"]
        } />
      <LayerPopup tit1={"레이어"} tit2={"팝업"} />

      <div className={intro.button}><Link href="/main/template1">템플릿 페이지 1</Link></div>
      <div className={intro.button}><Link href="/main/template2">템플릿 페이지 2</Link></div>
      <div className={intro.button}><Link href="/main/template3">템플릿 페이지 3</Link></div>
      <div className={intro.button}><Link href="/main/template4">대전과학고등학교</Link></div>
      <div className={intro.button}><Link href="/main/template5">부산통합예약</Link></div>
      <div className={intro.button}><Link href="/main/template5/sub/cont1">에디터</Link></div>
      <div className={intro.button}><Link href="/main/template5/sub/cont2">테이블 에디터</Link></div>
      <div className={intro.button}><Link href="/main/react">React</Link></div>
    </div>
    
    </div>
</div>
    );
}


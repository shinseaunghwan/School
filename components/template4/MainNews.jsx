
import React,{ useContext } from 'react';
import MainNewsSlider from "./MainNewsSlider";
import { WidgetContext } from '../../app/(main)/main/template4/App';
import Title from './Title';
import IconBtnMore from './IconBtnMore';

// 메인비주얼
export default function MainNews() {
  const widget = useContext(WidgetContext);
  const Items = [
    { src: './../images/template/T0004/main/news_01.png', tit: '진로톡톡! 이공계 진로특강', txt:'진로톡톡! 이공계 진로특강 내일을 넘어 AI와 함께하는 디자인 2025.03.23(일)14:00~16:00 다산관 대강당에서 개최', date:'2025.04.22', id: 1 },
    { src: './../images/template/T0004/main/news_02.png', tit: '선배와 꿈잡고(Job Go) 패널토의', txt:'대전과학고 11기 선배와 꿈잡고(Job Go)패널 토의 주제 반갑다! 후배들아! 후배들에게 전하는 전공안내와 연구자의 삶에 대해 나누는 시간', date:'2025.04.22', id: 2 },
    { src: './../images/template/T0004/main/news_03.png', tit: '데이터와 네트워크가 답이다,새로운 가치는 연결에서 온다/정하웅(복잡계및통계', txt:'행사: 제14회 영재학교 우수R&E 공동발표회 초청 강연, 주제: 데이터와 네트워크가 답이다,새로운 가치는 연결에서 온다...', date:'2025.04.22', id: 3 },
    { src: './../images/template/T0004/main/news_04.png', tit: '인문학주간,원화전시,시와 수학의 만남,Who am I, 책휴게소, 월드카페토론...', txt:'인문학주간,원화전시,시와 수학의 만남,Who am I, 책휴게소,월드카페토론한마당,푸드트럭', date:'2025.04.22', id: 4 },
        { src: './../images/template/T0004/main/news_01.png', tit: '진로톡톡! 이공계 진로특강', txt:'진로톡톡! 이공계 진로특강 내일을 넘어 AI와 함께하는 디자인 2025.03.23(일)14:00~16:00 다산관 대강당에서 개최', date:'2025.04.22', id: 5 },
    { src: './../images/template/T0004/main/news_02.png', tit: '선배와 꿈잡고(Job Go) 패널토의', txt:'대전과학고 11기 선배와 꿈잡고(Job Go)패널 토의 주제 반갑다! 후배들아! 후배들에게 전하는 전공안내와 연구자의 삶에 대해 나누는 시간', date:'2025.04.22', id: 6 },
    { src: './../images/template/T0004/main/news_03.png', tit: '데이터와 네트워크가 답이다,새로운 가치는 연결에서 온다/정하웅(복잡계및통계', txt:'행사: 제14회 영재학교 우수R&E 공동발표회 초청 강연, 주제: 데이터와 네트워크가 답이다,새로운 가치는 연결에서 온다...', date:'2025.04.22', id: 7 },
    { src: './../images/template/T0004/main/news_04.png', tit: '인문학주간,원화전시,시와 수학의 만남,Who am I, 책휴게소, 월드카페토론...', txt:'인문학주간,원화전시,시와 수학의 만남,Who am I, 책휴게소,월드카페토론한마당,푸드트럭', date:'2025.04.22', id: 8 },
                
  ];

  const controlButtonsOrder = [ 'play', 'prev', 'next'];

  return (
    <>
      <div className={widget.news}>
        <Title className={widget.titleWrap} tit1="DSHS" tit2="News" tit3="대전과학고등학교 소식들을 전해드립니다." />
        <MainNewsSlider widget={widget} items={Items} controlButtonsOrder={controlButtonsOrder} sliderName={'뉴스'} />
        <IconBtnMore LinkHref={'#'} LinkClassName={widget.btn_more} IconClassName={'ri-add-line'} LinkTitle={'뉴스'} />
      </div>
    </>
  );
};


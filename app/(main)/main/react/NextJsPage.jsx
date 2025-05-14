"use client";

import React from "react";
import Toggle from "./Toggle";


function NextJsPage() {
  const guideList = [
    {
      title: "NextJs",
      language: "javascript",
      aos: "fade-up",
      steps: [
        {
          description: `NextJs는 기존 리엑트의 불편한점을 보완 및 편리성으로 인해 사용하는 프레임워크로 클릭웍스도 nextJs로 만듬`,
          code: null,
        },

        {
          description: `서버사이드렌더링이 가능해서 백엔드영역까지 수정 가능`,
          code: null,
        },
        {
          description: `SSR(서버 사이드 렌더링): Next.js는 서버 사이드 렌더링을 기본적으로 지원하여 SEO 최적화와 초기 로딩 속도 개선에 도움을 줍니다. 이는 특히 검색 엔진에 노출이 중요한 웹사이트에 매우 유용합니다.`,
          code: null,
        },
        {
          description: `손쉬운 라우팅: Next.js는 파일 기반 라우팅 시스템을 제공하여, 파일을 생성하기만 하면 자동으로 라우트가 설정됩니다. 복잡한 라우팅 설정 없이 간단하게 사용할 수 있어 개발 효율이 높아집니다.`,
          code: null,
        },
        {
          description: `최적화된 빌드 도구: 웹팩(Webpack) 및 바벨(Babel)을 내장하여 개발자가 별도로 설치하거나 설정하지 않아도 되는 간단함을 제공합니다. 최신 기술을 활용해 웹 애플리케이션 성능을 극대화할 수 있습니다.`,
          code: null,
        },
        {
          description: `API 구축 기능: Next.js는 API 라우트를 제공하여 서버 사이드에서 데이터를 처리하고 API를 생성할 수 있습니다. 이를 통해 백엔드와 프론트엔드를 통합적으로 관리할 수 있습니다.`,
          code: null,
        },
        {
          description: `리액트(React)와의 통합: Next.js는 React를 기반으로 만들어져 있어 React의 컴포넌트 기반 개발 방식과 호환이 좋습니다. 기존 React 프로젝트를 Next.js로 쉽게 마이그레이션할 수 있습니다.`,
          code: null,
        },
        {
          description: `이미지 및 폰트 최적화: Next.js는 이미지 최적화 및 폰트 로드 기능을 제공하여 웹사이트의 성능을 더욱 향상시킵니다. ---------> 알아보니 이미지 장사로 인해.. 기업 구독 정액권 필요함`,          
          code: null,
        },
      ],

      
    },
    {
      title: "NextJs 설치 및 빌드",
      language: "bash",
      aos: "fade-up",
      steps: [
        {
          description: "프로젝트 폴더 만들기",
          code: `npm create-next-app@latest`,
        },
        {
          description: "개발 서버 실행",
          code: `npm run dev`,
        },
        {
          description: "프로젝트 빌드",
          code: `npm run build`,
        },
        {
          description: "깃허브를 예시로 들면",
          code: `git init`,
        },
        {
          description: "깃허브 추가",
          code: `git add .`,
        },
        {
          description: "깃허브 커밋",
          code: `git commit -m "프로젝트 이름"`,
        },
        {
          description: "깃허브 계정의 프로젝트에 파일이 빌드됨 (그 전에 깃허브 와 nextjs 아이디 연동 필수)",
          code: `git push origin main`,
        },
      ],
    },
  ];

  return (
    <>
      {guideList.map((guide, index) => (
        <Toggle
          aos={guide.aos}
          key={index}
          language={guide.language}
          title={guide.title}
          steps={guide.steps}
        />
      ))}
    </>
  );
}

export default NextJsPage;
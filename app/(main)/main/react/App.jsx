"use client";

import React from "react";
import layout from "../../../../styles/Layout.module.css";
import sub from "../../../../styles/sub.module.css";
import Toggle from "./Toggle";
import Toggle2 from "./Toggle2";
import Link from "next/link";


function App() {
  const guideList = [
    {
      title: "설치가이드",
      language: "bash",
      aos: "fade-up",
      steps: [
        {
          description: "Node.js 설치 및 vscode(사용하는 프로그램)",
          code: null,
        },
        {
          description: "프로젝트 폴더 만들기",
          code: `cd my-react-app`,
        },
        {
          description: "React 프로젝트 생성",
          code: `npm create-react-app my-app`,
        },
        {
          description: "폴더 이동",
          code: `cd my-app`,
        },
        {
          description: "개발 서버 실행",
          code: `npm start`,
        },
      ],
    },
    {
      title: "React의 주요 개념",
      language: "javascript",
      aos: "fade-up",
      steps: [
        {
          description: "컴포넌트(Component)",
          code: `// 함수형 컴포넌트 (컴포넌트 함수 같은 경우는 무조건 대문자로 시작)
function Greeting() {
  return <h1>Hello, React!</h1>;
}
  
// App.jsx => 호출 페이지에서 해당 컴포넌트를 사용하면 됩니다.
  export default function App() {
    return <Greeting />;
}
`,
        },
        {
          description: "JSX (JavaScript XML)",
          code: `//한줄일때는 () 생략 가능
return <h1>Hello, World!</h1>;
          
// 두줄 이상일때는 <div> 또는 <> 태그로 감싸주어야 함
return (
<div>
  <h1>Hello, React!</h1>
  <h2>React</h2>
</div>;

// 모든 태그 / 닫아줘야 함
<img ~~ />   <br /> <input />등등 html에서 안 닫아도 되는 부분은 리엑트에서 무조건 닫아줘야함
);

//class 대신 className을 사용해야 합니다.
          `,
        },
        {
          description: "Props (Properties)",
          code: `// 부모 컴포넌트
function ParentComponent() {
  return <ChildComponent name="Shin" age={2} />;
}

// 자식 컴포넌트
function ChildComponent(props) {
  return (
    <div>
      <h1>안녕하세요, {props.name}!</h1>
      <p>나이: {props.age}</p>
    </div>
  );
}
`,
        },
        {
          description: "State",
          live: true,
          code: `//import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
`,
        },
        {
          description: "이벤트 핸들링",
          live: true,
          code: ` //컴포넌트 함수와 다르게 Camel Case로 변수명 지정
() => {
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  };
`,
        },
        {
          description: "React의 라이프사이클 (LifeCycle)",
          code: `import React, { useEffect } from 'react';

useEffect(() => {
  console.log('test');
  return () => console.log('test');
}, []);
[] => 컴포넌트 생성 시 실행,
안에 변수값을 넣으면 해당 변수의 값이 변할때마다 실행
`,
        },
      ],
    },
    {
      title: "React의 주요 Hooks",
      language: "javascript",
      aos: "fade-left",
      steps: [
        {
          description:"useState",
          text: ["React에서는 일반 변수처럼 값을 바꿔도 화면이 자동으로 업데이트되지 않습니다. 그래서 useState를 사용하면 React가 값의 변경을 감지하고 화면을 새로 고쳐줍니다."],
          live: true,
          code: `//import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 초기값은 0
  // count => 변수, setCount => 함수값
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>감소</button>
      <button onClick={() => setCount(0)}>리셋</button>
    </div>
  );
}`,
        },
        {
          description:"useEffect",
          text: [`useEffect는 React에서 컴포넌트가 화면에 나타날 때, 업데이트될 때, 또는 사라질 때 특정 작업을 수행할 수 있게 해주는 Hook이며 컴포넌트의 라이프사이클과 관련된 일을 처리합니다.`],
          live: true,
          code: `//주요 사용 예
//1. API 데이터 가져오기: 서버에서 데이터를 불러와 화면에 표시할 때.
//2. 타이머 시작: 일정한 간격으로 업데이트하거나 시간이 흐르는 작업 처리.
//3. 구독 관리: 예를 들어 이벤트를 구독하거나 연결을 해제할 때.

//import React, { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => (prevSeconds < 100 ? prevSeconds + 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트가 사라질 때 정리(cleanup)
  }, []); // 빈 배열은 처음 렌더링 시 딱 한 번만 실행!

  return <p>{seconds}초</p>;
}`,
        },
        {
          description:"useContext",
          text: ["useContext는 React에서 컴포넌트 간에 데이터를 쉽게 공유할 수 있도록 해며 부모-자식 관계가 깊어져도 데이터를 편리하게 전달할 수 있습니다. 간단히 말해, 복잡한 props 전달 없이 데이터나 상태를 공유할 수 있게 해주는 Hook"],
          code: `//import React, { createContext, useContext } from 'react';

// 1. Context 생성
const UserContext = createContext();

function App() {
  const user = { name: 'Shin', age: 2 };

  return (
    // 2. 데이터 제공
    <UserContext.Provider value={user}>
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  // 3. 데이터 소비
  const user = useContext(UserContext);

  return <p>사용자 이름: {user.name}</p>;
}`,
        },
        {
          description:"useReducer",
          text: ["useReducer는 React에서 복잡한 상태 관리를 더 쉽게 처리할 수 있도록 도와주는 Hook"],
          code: `import React, { useReducer } from 'react';

// reducer 함수: 상태 변경 로직
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() { 
  const [state, dispatch] = useReducer(reducer, { count: 0 }); // 초기 상태: { count: 0 }
  return (
    <div>
      <p>현재 카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>증가</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>감소</button>
    </div>
  );
}`,
        },
        {
          description:"useRef",
          text: ["useRef는 React에서 특정 값이나 DOM 요소에 접근하고 유지하기 위해 사용하는 Hook이며 변경이 필요한 값을 저장하거나 특정 HTML 요소를 직접 조작할 때 사용할 수 있습니다."],
          live: true,
          code: `//DOM 요소 조작 예제
          //사용 이유: 버튼 클릭 시 입력창에 바로 포커스를 줄 수 있습니다.

//import React, { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null); // input 요소를 참조하기 위한 Ref 생성

  const handleFocus = () => {
    inputRef.current.focus(); // input 요소에 직접 접근하여 포커스를 설정
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="입력창에 포커스 설정" />
      <button onClick={handleFocus}>포커스하기</button>
    </div>
  );
}
`,
        },
                {
                  description:"useRef 값 저장 예제",
                  text: ["useRef는 컴포넌트가 리렌더링되더라도 값을 유지할 수 있습니다. 상태(state)와 달리 화면에 영향을 주지 않으므로 렌더링 성능 최적화에 유용합니다."],
          live: true,
          code: `
//import React, { useRef } from 'react';
function Counter() {
  const countRef = useRef(0); // 초기값 설정

  const handleClick = () => {
    countRef.current += 1; // Ref 값 변경
    alert('현재 카운트:', countRef.current); // 화면에는 업데이트되지 않음
  };

  return <button onClick={handleClick}>클릭</button>;
}
`,
        },
        {
          description:"useRef 이전 값 추적",
          text: ["useRef는 컴포넌트의 이전 상태를 추적하는 데 사용할 수 있습니다. 상태를 저장하거나, 변화 전후를 비교할 때도 활용됩니다."],
          live: true,
          code: `
//import React, { useEffect, useRef, useState } from 'react';

function PreviousValue() {
  const [currentValue, setCurrentValue] = useState(0);
  const previousValue = useRef(null);

  useEffect(() => {
    previousValue.current = currentValue; // 이전 값을 저장
  }, [currentValue]);

  return (
    <div>
      <p>현재 값: {currentValue}</p>
      <p>이전 값: {previousValue.current}</p>
      <button onClick={() => setCurrentValue(currentValue + 1)}>증가</button>
    </div>
  );
}

`,
        },
        {
          description:"useRef 애니메이션 또는 스크롤 관리",
          live: true,
          text: ["useRef는 DOM 요소의 위치를 조작하거나 애니메이션을 적용할 때 자주 사용됩니다. 예를 들어, 특정 요소를 화면에 보이도록 스크롤을 조작할 수 있습니다."],
          code: `
//import React, { useRef } from 'react';

function ScrollToElement() {
  const divRef = useRef(null);

  const handleScroll = () => {
    divRef.current.scrollIntoView({ behavior: 'smooth' }); // 스크롤 이동
  };

  return (
    <div>
      <button onClick={handleScroll}>이동</button>
      <div style={{ height: '300px' }}>위쪽 영역</div>
      <div ref={divRef} style={{ background: 'yellow', padding: '20px' }}>여기로 이동</div>
    </div>
  );
}
`,
        },
        {
          description:"useMemo",
          live: true,
          code: `//import React, { useMemo } from 'react';

function ExpensiveCalculation() {
  const [num, setNum] = useState(0);

  const calculate = (n) => {
    console.log("계산 중...");
    return n * 2;
  };

  // useMemo를 사용하여 계산 결과를 메모이제이션
  const result = useMemo(() => calculate(num), [num]);

  return (
    <div>
      <p>
        숫자 입력:{" "}
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(Number(e.target.value))}
        />
      </p>
      <p>결과: {result}</p>
    </div>
  );
}
`,
          text: ["성능 최적화를 위해 컴퓨팅된 값을 메모이징하는 Hook입니다. 의존성 배열에 따라 재계산을 최소화합니다."]
        },
        {
          description:"useCallback",
          code: `import React, { useCallback } from 'react';

function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('클릭!');
  }, []); // 의존성 배열이 비어 있으므로 이 함수는 처음에 한 번만 생성됩니다.

  return <ChildComponent onClick={handleClick} />;
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>클릭</button>;

  }`,
          text:["함수를 메모이징하여 불필요한 함수 재생성을 방지하는 데 사용됩니다.","useMemo: 값(데이터)의 재계산을 최적화","useCallback: 함수의 재생성을 최적화"]
        },

      ],
    },
    {
      title: "실무",
      language: "javascript",
      aos: "fade-up",
      steps: [
        {
          description: "CSS 모듈 사용",
          text: [
           `css 모듈을 사용하는 이유는 리엑트는 한 페이지에 모든 내용을 담기때문에 클래스명 등등 겹칠 위험이 있음.`,
           `그래서 css.module을 사용하면 클래스명을 랜덤한 변수값으로 지정하여 겹칠 위험도를 낮추어줌`,
           `현재 페이지를 구성하는 코드를 예시를 들면`],          
          code: null,
          images:[
            {
              src: "/images/react/img_01.png",
              text:"xxx.module.css 형식의 css 파일을 만들고 해당 클래스를 넣고 싶은 곳에 입력 (xxx 부분은 원하는 변수값으로 지정, 리엑트의 기본은 사용하고 싶은 파일을 임폴트하는것이 기본)",
            },
            {
              src: "/images/react/img_02.png",
              text:"xxx.(해당 css안의 클래스명)의 형식으로 클래스명을 넣어주면 클래스를 2개 이상 3개 이상 무제한으로 넣을 수 있음",
            },
            {
              src: "/images/react/img_03.png",
              text:"클래스명이 랜덤한 변수 처리 된 것을 확인 가능",
            }
          ]
        },
        {
          description: "자바스크립트 map() 사용",
          text: [`리액트(React)에서 JavaScript의 map() 메서드는 리액트에서 동적이고 효율적인 UI 구현을 위한 핵심이며 이를 통해 데이터를 기반으로 반복적인 컴포넌트를 간결하고 직관적으로 생성하며, 유지보수성과 성능 최적화를 동시에 이룰 수 있습니다.`],          
          code: `//데이터 배열을 활용한 동적 렌더링
const items = ['사과', '바나나', '체리'];

const ItemList = () => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

//가독성과 간결함
// for 반복문 사용
for (let i = 0; i < items.length; i++) {
  // 비슷한 컴포넌트 생성 논리
}

// map 사용
items.map(item => <Component key={item.id} value={item} />);

//키(key) 속성을 통한 효율적인 DOM 업데이트
{data.map((item) => (
  <div key={item.id}>{item.name}</div>
))}

//재사용성과 컴포넌트화
const Item = ({ name }) => <li>{name}</li>;

const ItemList = () => (
  <ul>
    {items.map((item, index) => (
      <Item key={index} name={item} />
    ))}
  </ul>
);

//조건부 렌더링과 결합
{items.map((item) =>
  item.isAvailable ? <p key={item.id}>{item.name}</p> : null
)}
`,images:[
  {
    src: "/images/react/img_04.png",
    text:"컴포넌트에 props를 지정하고 데이터값을 통해 컴포넌트를 완성",
  },
  {
    src: "/images/react/img_05.png",
    text:"JSON 파일 이나 해당 변수값에 데이터를 입력하여 컴포넌트를 재활용할수있음",
    imgWidth: true,
  },
]
        },
        {
          description: "삼향 연산자",
          text: [`리액트(React)에서 삼항 연산자를 사용하는 주된 이유는 간결하고 직관적인 조건부 렌더링을 위해서입니다.
`],          
          code: `조건부 렌더링을 단순화
return (
  <div>
    {isLoggedIn ? <p>환영합니다!</p> : <p>로그인이 필요합니다.</p>}
  </div>
);
보통 useState를 사용해서 기능을 만들면 편함
`,images:[
  {
    src: "/images/react/img_06.png",
    text:"h4태그를 누르면 isVisible의 값이 true, false로 변경 되며 true일 때 해당 ul 태그가 나오는 아코디언 컴포넌트로 삼향자를 활용하면 많은 기능을 만들 수 있음",
    imgWidth: true,
  },
]
        },
      ],

      
    },
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
    <div>
    <div className={sub.header_wrap}>
    <a className={sub.button} href="https://ko.react.dev/" target="_blank"><svg className={sub.logo} width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>리액트 공식</a>
    {/* <a className={sub.button} href="https://nomadcoders.co/nextjs-for-beginners/lectures/4687" target="_blank">nextJs 강의</a> */}
    {/* <a className={sub.button} href="https://seaunghwan.vercel.app/" target="_blank">Api 사용</a> */}
    <Link className={sub.button} href="/">이전 페이지</Link>
</div>
    <div className={`${layout.container} ${sub.area}`}> 
    <div className={sub.tit_wrap}>
      <h3>React 기초</h3>

    </div>
      
      
      {guideList.map((guide, index) => (
        <Toggle
          aos={guide.aos}
          key={index}
          language={guide.language}
          title={guide.title}
          steps={guide.steps}
        />
      ))}
      <Toggle2 title="code 편집기"/>
    </div>
    </div>
  );
}

export default App;
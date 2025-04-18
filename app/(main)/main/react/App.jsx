import React from "react";
import layout from "../../../../styles/Layout.module.css";
import sub from "../../../../styles/sub.module.css";
import Toggle from "./Toggle";

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
          code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
        },
        {
          description: "이벤트 핸들링",
          code: ` //컴포넌트 함수와 다르게 Camel Case로 변수명 지정
function handleClick() {
  alert('Button clicked!');
}

<button onClick={handleClick}>클릭</button>`,
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
      aos: "fade-right",
      steps: [
        {
          description:"useState",
          text: "React에서는 일반 변수처럼 값을 바꿔도 화면이 자동으로 업데이트되지 않습니다. 그래서 useState를 사용하면 React가 값의 변경을 감지하고 화면을 새로 고쳐줍니다.",
          code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 초기값은 0
//count => 변수, setCount => 함수값
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}`,
        },
        {
          description:"useEffect",
          text: `useEffect는 React에서 컴포넌트가 화면에 나타날 때, 업데이트될 때, 또는 사라질 때 특정 작업을 수행할 수 있게 해주는 Hook이며 컴포넌트의 라이프사이클과 관련된 일을 처리합니다.`,
          code: `//주요 사용 예
1. API 데이터 가져오기: 서버에서 데이터를 불러와 화면에 표시할 때.
2. 타이머 시작: 일정한 간격으로 업데이트하거나 시간이 흐르는 작업 처리.
3. 구독 관리: 예를 들어 이벤트를 구독하거나 연결을 해제할 때.

import React, { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트가 사라질 때 정리(cleanup)
  }, []); // 빈 배열은 처음 렌더링 시 딱 한 번만 실행!
// 배열 안에 변수를 넣을 시 변수의 값이 변경 될때마다 실행됨
  return <p>{seconds}초</p>;
}`,
        },
        {
          description:"useContext",
          text: "useContext는 React에서 컴포넌트 간에 데이터를 쉽게 공유할 수 있도록 해며 부모-자식 관계가 깊어져도 데이터를 편리하게 전달할 수 있습니다. 간단히 말해, 복잡한 props 전달 없이 데이터나 상태를 공유할 수 있게 해주는 Hook",
          code: `import React, { createContext, useContext } from 'react';

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
          text: "useReducer는 React에서 복잡한 상태 관리를 더 쉽게 처리할 수 있도록 도와주는 Hook이며 상태와 상태를 바꾸는 방법(로직)을 깔끔하게 정리할 수 있습니다.",
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

function Counter() {
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
          text: "useRef는 React에서 특정 값이나 DOM 요소에 접근하고 유지하기 위해 사용하는 Hook이며 변경이 필요한 값을 저장하거나 특정 HTML 요소를 직접 조작할 때 사용할 수 있습니다.",
          code: `//DOM 요소 조작 예제
          사용 이유: 버튼 클릭 시 입력창에 바로 포커스를 줄 수 있습니다.

import React, { useRef } from 'react';

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
  
//값 저장 예제
useRef는 컴포넌트가 리렌더링되더라도 값을 유지할 수 있습니다. 상태(state)와 달리 화면에 영향을 주지 않으므로 렌더링 성능 최적화에 유용합니다.

import React, { useRef } from 'react';

function Counter() {
  const countRef = useRef(0); // 초기값 설정

  const handleClick = () => {
    countRef.current += 1; // Ref 값 변경
    console.log('현재 카운트:', countRef.current); // 화면에는 업데이트되지 않음
  };

  return <button onClick={handleClick}>클릭</button>;
}

//이전 값 추적
useRef는 컴포넌트의 이전 상태를 추적하는 데 사용할 수 있습니다. 상태를 저장하거나, 변화 전후를 비교할 때도 활용됩니다.
import React, { useEffect, useRef, useState } from 'react';

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

//애니메이션 또는 스크롤 관리
useRef는 DOM 요소의 위치를 조작하거나 애니메이션을 적용할 때 자주 사용됩니다. 예를 들어, 특정 요소를 화면에 보이도록 스크롤을 조작할 수 있습니다.
import React, { useRef } from 'react';

function ScrollToElement() {
  const divRef = useRef(null);

  const handleScroll = () => {
    divRef.current.scrollIntoView({ behavior: 'smooth' }); // 스크롤 이동
  };

  return (
    <div>
      <button onClick={handleScroll}>이동</button>
      <div style={{ height: '1000px' }}>위쪽 영역</div>
      <div ref={divRef} style={{ background: 'yellow', padding: '20px' }}>여기로 이동</div>
    </div>
  );
}
`,
        },
        {
          description:"useMemo",
          code: `import React, { useMemo } from 'react';

function ExpensiveCalculation({ num }) {
  const calculate = (n) => {
    console.log('계산 중...');
    return n * 2;
  };

  // useMemo를 사용하여 계산 결과를 메모이제이션
  const result = useMemo(() => calculate(num), [num]);

  return <p>결과: {result}</p>;
}`,
          text: "성능 최적화를 위해 컴퓨팅된 값을 메모이징하는 Hook입니다. 의존성 배열에 따라 재계산을 최소화합니다."
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
//- useMemo: 값(데이터)의 재계산을 최적화.
- useCallback: 함수의 재생성을 최적화.
  }`,
          text:"함수를 메모이징하여 불필요한 함수 재생성을 방지하는 데 사용됩니다."
        },

      ],
    },
  ];

  return (
    <div className={`${layout.container} ${sub.area}`}>
      <h3>React</h3>
      {guideList.map((guide, index) => (
        <Toggle
          aos={guide.aos}
          key={index}
          language={guide.language}
          title={guide.title}
          steps={guide.steps}
          text={guide.text}
        />
      ))}
    </div>
  );
}

export default App;

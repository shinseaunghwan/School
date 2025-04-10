import React from 'react';
import layout from '../../../../styles/Layout.module.css';
import sub from '../../../../styles/sub.module.css';
import Toggle from './Toggle';

function App() {
  const guideList = [
    {
      title: "설치가이드",
      language:"bash",
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
      language:"javascript",
      steps: [
        {
          description: "컴포넌트(Component)",
          code: `// 함수형 컴포넌트
function Greeting() {
  return <h1>Hello, React!</h1>;
}`,
        },
        {
          description: "JSX (JavaScript XML)",
          code: `const element = <h1>Hello, World!</h1>;`,
        },
        {
          description: "Props (Properties)",
          code: `function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}`,
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
          code: `function handleClick() {
  alert('Button clicked!');
}

<button onClick={handleClick}>Click Me</button>`,
        },
        {
          description: "React의 라이프사이클 (LifeCycle)",
          code: `import React, { useEffect } from 'react';

useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);`,
        },
      ],
    },
  ];



  // React의 주요 특징
  // - Virtual DOM:- React는 DOM 업데이트를 효율적으로 처리하기 위해 Virtual DOM을 사용합니다.
  // - Virtual DOM은 메모리에 있는 가상 DOM으로, 실제 DOM과 비교 후 변경사항만 업데이트합니다.
  
  // - 단방향 데이터 흐름 (Unidirectional Data Flow):- React는 데이터가 부모에서 자식으로만 흐르도록 설계되었습니다.
  // - 이를 통해 데이터의 예측 가능성과 안정성을 유지할 수 있습니다.
  
  // - 컴포넌트 재사용성:- 한 번 작성된 컴포넌트를 다른 프로젝트나 다른 화면에서 쉽게 재사용할 수 있습니다.
  
  // - Hooks:- 함수형 컴포넌트에서 상태(state)와 라이프사이클 기능을 사용할 수 있도록 도와줍니다.
  // - 주요 훅: useState, useEffect, useContext, useReducer.

  return (
    <div className={`${layout.container} ${sub.area}`}>
      <h3>React</h3>
      {guideList.map((guide, index) => (
        <Toggle key={index} language={guide.language} title={guide.title} steps={guide.steps} />
      ))}
    </div>
  );
}

export default App;
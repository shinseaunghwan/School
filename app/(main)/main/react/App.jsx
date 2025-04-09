import React from 'react';
import layout from '../../../../styles/Layout.module.css';
import 'prismjs/themes/prism.css'
import sub from '../../../../styles/sub.module.css';
import CodeBlock from '../../../../components/CodeBlock';


function App() {
  const code = `
  function greet(name) {
      return \`Hello, \${name}!\`;
  }
  console.log(greet('World'));
`;
  return (
    <div className={`${layout.container} ${sub.area}`}>
      <h3>React</h3>
      <CodeBlock language="javascript" code={code} />

   
    </div>
  );
}

export default App;



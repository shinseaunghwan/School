"use client";

import { useEffect } from 'react';
import Prism from 'prismjs'; // Prism.js 가져오기
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python'; 
import 'prismjs/components/prism-java'; 
import 'prismjs/components/prism-ruby'; 
import 'prismjs/components/prism-c'; 
import 'prismjs/components/prism-go'; 
import 'prismjs/components/prism-markup'; 
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash'; // Bash(npm)

export default function CodeBlock({ language, code}) {
  useEffect(() => {
    Prism.highlightAll(); // 코드 하이라이팅 적용
  }, []);

  return (
    <pre>
      <code className={`language-${language}`} style={{fontFamily:'Pretendard'}}>
        {code}
      </code>
    </pre>
  );
}



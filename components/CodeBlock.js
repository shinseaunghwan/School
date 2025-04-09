"use client"

import { useEffect } from 'react';
import Prism from 'prismjs'; // Prism.js 가져오기
import 'prismjs/components/prism-javascript'; // 필요한 언어 추가

export default function CodeBlock({ language, code }) {
  useEffect(() => {
    Prism.highlightAll(); // 코드 하이라이팅 적용
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
}
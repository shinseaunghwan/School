"use client";

import React, { useState, useEffect } from 'react';
import 'prismjs/themes/prism.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CodeBlock from './CodeBlock';

function Toggle({ title, steps, language }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div>
      <h4 onClick={toggleVisibility} style={{ cursor: "pointer" }}>
        {title}
      </h4>
      {isVisible && (
        <ul data-aos="fade-in">
          {steps.map((step, index) => (
            <li key={index}>
              {step.description}
              {step.code && <CodeBlock language={language} code={step.code} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Toggle;
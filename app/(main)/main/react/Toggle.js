"use client";

import React, { useState, useEffect } from 'react';
import 'prismjs/themes/prism.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CodeBlock from './CodeBlock';
import sub from "../../../../styles/sub.module.css";

function Toggle({ title, steps, language, aos}) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    AOS.init();
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <h4 onClick={toggleVisibility} style={{ cursor: "pointer" }}>{title}</h4>
      {isVisible ? (
        <ul>
          {steps.map((step, index) => (
            <li data-aos={aos} key={index}>
              <p>{step.description}</p>
              {step.text && Array.isArray(step.text) ? (
                step.text.map((textItem, textIndex) => <p key={textIndex}>{textItem}</p>)
              ) : (
                <p>{step.text}</p>
              )}
              {step.code && <CodeBlock language={language} code={step.code} />}
              <div className={sub.imgBox}>
                {step.images && step.images.map((img, idx) => (
                  <p className={img.imgWidth ? `${sub.w100}` : null} key={idx} data-aos={aos}>
                    <img src={img.src} alt={img.alt || `image-${idx}`} />
                    <span>{img.text}</span>
                  </p>
                ))}
              </div>
              
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default Toggle;
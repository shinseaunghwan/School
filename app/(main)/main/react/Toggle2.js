"use client";

import React, { useState } from 'react';
import SandCodePack from "./SandPack"
import sub from "../../../../styles/sub.module.css";

function Toggle({title}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <h4 className={sub.codeBox}><a onClick={toggleVisibility}>{title}</a></h4>
      {isVisible ? (
      <SandCodePack code={`import React from 'react';

export default function App() {
  return <h1>Hello, React</h1>;
}`}/> ) : null}
    </>
  );
}

export default Toggle;
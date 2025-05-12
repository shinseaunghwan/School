"use client";

import React, { useState } from 'react';
import SandCodePack from "./SandPack"


function Toggle({ title}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <h4><a onClick={toggleVisibility}>{title}</a></h4>
      {isVisible ? (
      <SandCodePack code={`import React from 'react';

export default function App() {
  return <h1>Hello, React</h1>;
}`}/> ) : null}
    </>
  );
}

export default Toggle;
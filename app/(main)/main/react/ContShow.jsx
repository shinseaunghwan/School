"use client";

import React, { useState } from 'react';
import ReactPage from  "./ReactPage"
import NextJsPage from  "./NextJsPage"

function ContShow() {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <h3><a onClick={toggleVisibility}>{isVisible ? "React" : "NextJs"}</a></h3>
      {isVisible ? (<ReactPage />) : (<NextJsPage/>)}
    </>
  );
}

export default ContShow;




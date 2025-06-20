
import React from 'react';

export default function Title({ className, tit1, tit2, tit3 = '' }) {
  return (
    <div className={className}>
      <h2>
        <span>{tit1}</span> {tit2}
      </h2>
      {tit3 && <p>{tit3}</p>}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';


const componentPromises = {};
for (let i = 1; i <= 100; i++) {
  componentPromises[`cont${i}`] = import(`../(subPage)/Cont${i}`);
}

export default function DynamicSubPage({ params }) {
  const [ComponentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    const slug = params.slug[0];

    const componentPromise = componentPromises[slug];

    if (componentPromise) {

      componentPromise
        .then(mod => {
          setComponentToRender(() => mod.default);
        })
        .catch(() => {
          notFound();
        });
    } else {
      notFound();
    }
  }, [params.slug]);

  if (!ComponentToRender) {
    return null; 
  }

  return <ComponentToRender />;
}
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

export default function DynamicSubPage({ params }) {
  const [ComponentToRender, setComponentToRender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug[0];

    // 필요한 Cont 컴포넌트를 동적으로 import
    import(`../(subPage)/${slug.charAt(0).toUpperCase() + slug.slice(1)}`)
      .then(mod => {
        setComponentToRender(() => mod.default);
      })
      .catch(() => {
        // 해당 컴포넌트를 찾지 못했거나 로딩에 실패한 경우
        notFound();
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [params.slug]);

  if (loading) {
    return <div style={{minHeight:"600px", display:"flex", justifyContent:"center", alignItems:"center"}}>Loading...</div>; // 로딩 상태를 보여주는 UI
  }

  if (!ComponentToRender) {
    return <div style={{minHeight:"600px", display:"flex", justifyContent:"center", alignItems:"center"}}>서브페이지</div>;
  }

  return <ComponentToRender />;
}
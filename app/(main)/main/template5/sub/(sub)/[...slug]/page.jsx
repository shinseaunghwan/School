'use client';
import React from 'react';
import { useEffect, useState } from 'react';
// 1. next/navigation에서 useParams를 import 합니다.
import { useParams } from 'next/navigation';

// 2. props에서 { params }를 제거합니다.
export default function DynamicSubPage() {
  // 3. useParams 훅을 사용해 Promise가 아닌 일반 params 객체를 가져옵니다.
  const params = useParams(); 
  
  const [ComponentToRender, setComponentToRender] = useState(null);
  const [loading, setLoading] = useState(true);
  // 4. notFound() 대신 에러 상태를 관리할 state를 추가합니다.
  const [error, setError] = useState(false);

  useEffect(() => {
    // params가 바뀔 때마다 상태를 초기화합니다.
    setLoading(true);
    setComponentToRender(null);
    setError(false);

    // slug가 유효한지 확인합니다.
    if (!params.slug || !Array.isArray(params.slug) || params.slug.length === 0) {
      setError(true);
      setLoading(false);
      return;
    }
    
    const slug = params.slug[0];

    // 필요한 Cont 컴포넌트를 동적으로 import
    import(`../(subPage)/${slug.charAt(0).toUpperCase() + slug.slice(1)}`)
      .then(mod => {
        setComponentToRender(() => mod.default);
      })
      .catch(() => {
        // 5. 컴포넌트를 찾지 못하면 notFound() 대신 에러 상태를 true로 설정합니다.
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [params.slug]); // ✅ OK: 이 params는 일반 객체이므로 안전합니다.

  if (loading) {
    return <div style={{minHeight:"600px", display:"flex", justifyContent:"center", alignItems:"center"}}>Loading...</div>;
  }

  // 6. 에러 상태일 때 "페이지를 찾을 수 없음" UI를 렌더링합니다.
  if (error) {
    return <div style={{minHeight:"600px", display:"flex", justifyContent:"center", alignItems:"center"}}>페이지를 찾을 수 없습니다.</div>;
  }

  if (!ComponentToRender) {
    // 로딩이 끝났지만 컴포넌트가 없는 경우 (초기 상태 등)
    return <div style={{minHeight:"600px", display:"flex", justifyContent:"center", alignItems:"center"}}>서브페이지</div>;
  }

  return <ComponentToRender />;
}
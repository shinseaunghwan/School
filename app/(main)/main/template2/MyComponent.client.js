"use client"

// MyComponent.client.js
import dynamic from 'next/dynamic';

const MyComponent = dynamic(() => import('./Header'), { ssr: false });

export default MyComponent;

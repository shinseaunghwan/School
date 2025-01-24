import { Metadata } from "next";
import React from 'react';
import App from './App';
import Header from './Header';
import Footer from './Footer';

export const metadata: Metadata = {
    title: "학교통합",
  };

export default function MainPage () {
    return (
      <>
        <Header />
        <App />
        <Footer />
      </>
    );
}
import { Metadata } from "next";
import App from "./App";
import layout from "../../../../styles/Layout.module.css"

export const metadata: Metadata = {
  title: "리액트 공부",
};

export default function MainPage() {
  return (
    <div className={layout.root}>
        <App />

    </div>
  );
}




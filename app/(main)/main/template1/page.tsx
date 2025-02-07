import App from "./App";
import Footer from "./Footer";
import MyComponent from './MyComponent.client';
import layout from "../../../../styles/Layout.module.css"

export const metadata = {
  title: "템플릿 1",
};

export default function MainPage() {
  return (
    <div className={layout.root}>
      <MyComponent />
        <App />
        <Footer />
    </div>
  );
}




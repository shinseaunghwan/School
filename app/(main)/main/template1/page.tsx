import App from "./App";
import Footer from "./Footer";
import MyComponent from './MyComponent.client';
import '../../../../styles/template1/main.css';

export const metadata = {
  title: "템플릿 1",
};

export default function MainPage() {
  return (
    <div className="root">
      <MyComponent />
        <App />
        <Footer />
    </div>
  );
}




import App from "./App";
import Footer from "./Footer";
import MyComponent from './MyComponent.client';
import '../../../../styles/template2/T0002_widget.css';

export const metadata = {
  title: "템플릿 2",
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




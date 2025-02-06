import App from "./App";
import Footer from "./Footer";
import MyComponent from './MyComponent.client';


export const metadata = {
  title: "템플릿 1",
};

export default function MainPage() {
  return (
    <div>
      <MyComponent />
        <App />
        <Footer />
    </div>
  );
}




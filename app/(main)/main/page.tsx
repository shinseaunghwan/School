import App from "./App";
// import Header from "./Header";
import Footer from "./Footer";
import MyComponent from './MyComponent.client';


export const metadata = {
  title: "학교통합",
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




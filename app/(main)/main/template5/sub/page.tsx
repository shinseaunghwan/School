import App from "./App";
import Footer from "../Footer";
import layout from "../../../../../styles/Layout.module.css"
import Header from "../Header";

export const metadata = {
  title: "템플릿 5",
};

export default function SubPage() {
  return (
    <div className={layout.root}>
      <Header/>
        <App />
        <Footer />
    </div>
  );
}




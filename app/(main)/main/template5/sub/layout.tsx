
import Header from "../Header";
import Footer from "../Footer";
import layout from "../../../../../styles/Layout.module.css";
import App from "./App";

export const metadata = {
  title: "서브페이지",
};

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={layout.root}>
      <Header />
      <App>
        {children}
      </App>
      <Footer />
    </div>
  );
}
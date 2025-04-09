import App from "./App";
import layout from "../../../../styles/Layout.module.css"

export const metadata = {
  title: "React",
};

export default function MainPage() {
  return (
    <div className={layout.root}>
        <App />

    </div>
  );
}





import { Metadata } from "next";
import "../font/Pretendard/fonts.css";
import "../font/Montserrat/fonts.css";
import "../font/XEIcon-2.3.3/xeicon.css";
import '../styles/global.css';
import '../styles/Layout.css';
import '../styles/main.css';


export const metadata: Metadata = {
  title: {
    template: "%s | 경기",
    default: "경기학교통합",
  },
  description: "경기학교통합",
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body>
        {children}
      </body>
    </html>
  );
}

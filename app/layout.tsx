
import { Metadata } from "next";
import "../font/GmarketSans/fonts.css";
import "../font/Pretendard/fonts.css";
import "../font/Montserrat/fonts.css";
import "../font/XEIcon-2.3.3/xeicon.css";
import "../font/RimixIcon/remixicon.css";
import '../styles/global.css';
// import '../styles/slick.css';

export const metadata: Metadata = {
  title: {
    template: "%s | nextJs",
    default: "nextJs",
  },
  description: "nextJs",
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

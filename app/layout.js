import "./globals.css";
import localFont from "next/font/local";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ToonDa - 일상을 툰으로",
  description: "일상을 툰으로 Toonda",
};

const noonnu = localFont({
  src: "./utils/font/Orbit-Regular.ttf",
  display: "swap",
});

// const noonnu = localFont({
//   src: [
//     {
//       path: "./font/RussoOne-Regular.ttf", // 로고font
//       display: "swap",
//     },
//     {
//       path: "./font/RubikBubbles-Regular.ttf",
//       display: "swap",
//     },
//     {
//       path: "./font/강원교육모두 Light.ttf",
//       display: "swap",
//     },
//   ],
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={noonnu.className}>{children}</body>
    </html>
  );
}

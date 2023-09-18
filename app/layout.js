import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthContext";
import PostContext from "./context/PostContext";
import ImageContext from "./context/ImageContext";
import "./globals.css";
import localFont from "next/font/local";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ToonDa - 일상을 툰으로",
  description: "일상을 툰으로 Toonda",
};

export const noonnu = localFont({
  src: "../public/font/Orbit-Regular.ttf",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={noonnu.className}>
        <AuthContext >
          <PostContext>
            <ImageContext>
              <NavBar/>
              {children}
            </ImageContext>
          </PostContext>
        </AuthContext>
      </body>
    </html>
  );
}

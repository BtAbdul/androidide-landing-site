import "./globals.css";
import Script from "next/script";
import Navbar, { DrawerMenu } from "@/components/Navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "AndroidIDE",
  description:
    "AndroidIDE is a IDE for Android. Build Android Apps on your phone.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "any" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={roboto.className}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <Script
          async={true}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1117704560424175"
        />
        <Drawer>{children}</Drawer>
      </body>
    </html>
  );
}

function Drawer({ children }) {
  return (
    <div className="drawer">
      <input id="drawer-navigation" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        {children}
      </div>
      <DrawerMenu />
    </div>
  );
}

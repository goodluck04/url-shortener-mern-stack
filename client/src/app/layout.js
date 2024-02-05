import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/app/components/ReduxProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "URL Shortener",
  description: "This app is made by goodluck.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

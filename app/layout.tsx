import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/common/header/navbar";
import { TranslationProvider } from "@/context/translation-context";
import Footer from "@/components/shared/footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "TrendForce Consulting ",
  description: "TrendForce Consulting - Your Partner for Success",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider>
          <Toaster position="top-right" />
          <Navbar />
          <CookieConsent />
          {children}
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}

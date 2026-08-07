import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "DevStock",
  description: "DevStock Shop",
};

const inter = Inter({
  subsets: ["latin"],
});

// tu children to HomePage, ProductsPage, ContactPage, ProductPage
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#1A1A1A] text-white ${inter.className}`}>
        <Container>
          <Header />

          <main>{children}</main>

          <Footer />
        </Container>
      </body>
    </html>
  );
}

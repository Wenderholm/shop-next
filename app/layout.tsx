import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { CartNotificationProvider } from "@/contexts/CartNotificationContext";
import CartNotification from "@/components/notifications/CartNotification";
import { CartProvider } from "@/contexts/CartContext";
export const metadata: Metadata = {
  title: "DevStock",
  description: "DevStock Shop",
};

const inter = Inter({
  subsets: ["latin"],
});
export default function RootLayout({
  // tu children to HomePage, ProductsPage, ContactPage, ProductPage
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#1A1A1A] text-white ${inter.className}`}>
        <CartNotificationProvider>
          <CartProvider>
            <Container>
              <Header />
              <CartNotification />
              <main>{children}</main>

              <Footer />
            </Container>
          </CartProvider>
        </CartNotificationProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "../globals.css";

import { CartProvider } from "@/store/CartProvider";
import { SiteProvider } from "@/SiteContext/SiteProvider";
import Header from "@/components/Home/Header";

import { SideCart } from "@/components/MiniCart/SideCart";
import { BargerMenu } from "@/components/Bargermenu/Menu";
import Footer from "@/components/Home/Footer";
import ChooseProduct from "@/components/ChooseProduct/page";
//import Cart from "@/components/CartBottom/CartBottom"
import SideBarPublic from "@/components/Home/SideBarPublic";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <SiteProvider>
          <CartProvider>
            <BargerMenu />
            <ChooseProduct />
            <SideCart />
            <Header />
            <div className="flex justify-center">
              <div className="hidden lg:block lg:w-[350px]  mr-3">
<SideBarPublic />
              </div>
              <div className="w-full">
            {children}
            </div>
            </div>
            {/* <div className="sticky  bottom-4 flex justify-end pr-3 z-50"><Cart /></div>  */}
            <Footer />
         
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}

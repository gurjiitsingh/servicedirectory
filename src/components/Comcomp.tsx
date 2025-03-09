
import { CartProvider } from "@/store/CartProvider";
import { SiteProvider } from "@/SiteContext/SiteProvider";
import Header from "@/components/Home/Header";

import { SideCart } from '@/components/MiniCart/SideCart';
import { BargerMenu } from '@/components/Bargermenu/Menu'




export default function Comcomp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
      
     <SiteProvider >
      <CartProvider>
        <BargerMenu />
      <SideCart />
      <Header />
    {children}
      </CartProvider>
      </SiteProvider>
      </>
     
     
  );
}

"use client";
import React, { Suspense } from "react";
//import CartContent from "@/components/Cart/cartcontent";
//import Link from "next/link";
//import { useSession } from "next-auth/react";
//import { FaCheckCircle } from "react-icons/fa";
//import path from "path";
import Address from './components/Address'
import CartLeft from "./components/Cart/CartLeft";
import { SessionProvider } from "next-auth/react";
const checkout = () => {
  // const { data: session } = useSession();


  return (<SessionProvider>
    <Suspense>
    <div className="bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1]  flex flex-col mt-2">
      <div className="container mx-auto flex flex-col md:flex-row gap-6 p-2">
        {/* <div className="flex flex-col w-full lg:w-[65%]"> */}
        <Address />
        {/* </div> */}
       
       <CartLeft />
      </div>
    </div>
    </Suspense>
    </SessionProvider>
  );
};

export default checkout;

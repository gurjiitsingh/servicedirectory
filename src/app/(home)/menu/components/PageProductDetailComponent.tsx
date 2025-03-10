"use client";
import { TproductSchema } from "@/lib/types/productType";
import { UseSiteContext } from "@/SiteContext/SiteContext";
//import { TnewProductSchema } from "@/lib/types";
//import {  ProductType } from "@/lib/types/productType";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function PageProductDetailComponent({
  product,
}: {
  product: TproductSchema;
}) {
  //console.log("----------product data----", product);

  
  const price = product.price.replace(/\./g, ',')
  const { setShowProductDetailM, setBaseProductId } = UseSiteContext();
  return (
    <div className="w-full   bg-slate-50  flex flex-row   rounded-2xl " onClick={()=>{ setBaseProductId(product.id!); setShowProductDetailM(false);}}>
      <Link
        href={{
          pathname: `productvariant/${product.id}`,
        }}
      >
        <div className="rounded-tl-2xl rounded-bl-2xl">
          <img
            src={product.image}
            className="w-[150px] rounded-tl-2xl rounded-bl-2xl"
          />
        </div>
      </Link>
      <div className="w-full flex flex-col p-3 justify-between ">
        <div className="w-full flex gap-2 justify-between ">
          <div className="min-w-[250px]">{product.name}</div>
          {/* <div>&euro;{price}</div> */}
            {/* <button className="px-2 py-2 bg-blue-500 rounded-full w-fit" onClick={()=>{setShowProductDetailM(false)}}><IoMdAdd size={20} className="text-white " /></button> */}
            <button className="px-2 py-1 primary rounded-xl w-fit text-white" >Book Service</button>
      
        </div>
        <div className="text-sm"><div className="max-w-[240px] max-h-[22px] overflow-hidden">{product.productDesc}</div></div>
    
      </div>
    </div>
  );
}



    {/* <div className="flex items-center p-1 justify-center  rounded-lg gap-2 fit">
          <div>
          <ButtonDecCartProduct product={product} />
          </div>
          <div className="flex items-center h-full  justify-center w-4"><ItemTotal productId={product.id!} /></div>
          
          <div>
          <ButtonAddToCartButton product={product} />
          
          </div>
        </div> */}
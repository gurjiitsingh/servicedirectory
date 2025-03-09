"use client";
import { fetchProductCategoryById } from "@/app/action/products/dbOperation";
import React, { useEffect, useState } from "react";
import PageProductDetailComponent from "./menu/components/PageProductDetailComponent";
import { ProductType, TproductSchema } from "@/lib/types/productType";
import { useSearchParams } from "next/navigation";
import { UseSiteContext } from "@/SiteContext/SiteContext";

//import { TnewProductSchema } from '@/lib/types';
// import {  TnewProductSchema } from '@/lib/type/productType';

export default function Page() {
const useSearch = useSearchParams();
let id = useSearch.get("id") as string;
if(id===undefined){
  id='3zjaNnwUILmHFFeP4gk2';
}

const {  sideBarToggle } = UseSiteContext();
  const [products, setProduct] = useState<TproductSchema[]>([]);

  useEffect(() => {
    sideBarToggle(false)
    console.log("service data-----");
    async function fetchproductData() {
     
      const productData = await fetchProductCategoryById(id);
      console.log("service list",productData);

     setProduct(productData);
    }
    fetchproductData();
  }, [id]);

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="container mx-auto pt-7 p-1">
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-3">
        
          {products.map((product, i) => {
            return <PageProductDetailComponent key={i} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

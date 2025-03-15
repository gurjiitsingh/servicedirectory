"use client";
import { fetchProducts } from "@/app/action/productsbase/dbOperation";
import React, { useEffect, useState } from "react";
import PageProductDetailComponent from "./components/PageProductDetailComponent";
//import Hero from "@/components/Hero";
//import { ProductType } from "@/lib/types/ProductTypeype";
import Footer from "@/components/Home/Footer";
import {  TnewProductSchema } from "@/lib/types/productType";

//import { TnewProductSchema } from '@/lib/types';
// import {  TnewProductSchema } from '@/lib/type/productType';

export default function Page() {
  // const products = await fetchProducts();
  const [products, setProduct] = useState<TnewProductSchema[]>([]);

  useEffect(() => {
    async function fetchproductData() {
      const productData = await fetchProducts();

      setProduct(productData);
    }
    fetchproductData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* <Hero /> */}

      {/* <Sidebar /> */}
      <div className="container mx-auto py-5 p-1">
        <div className="flex flex-col md:flex-row flex-wrap gap-3">
          {products.map((product, i) => {
            return <PageProductDetailComponent key={i} product={product} />;
          })}
        </div>
      </div>
       <Footer />
    </div>
  );
}

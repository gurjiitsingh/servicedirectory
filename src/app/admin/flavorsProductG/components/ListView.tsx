"use client";



import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
  // TableCaption,
} from "@/components/ui/table";

import TableRows from "./TableRows";
import {  fetchflavorsProductG } from "@/app/action/flavorsProductG/dbOperation";
import { ProductType } from "@/lib/types/productType";
//import FeaturProductUpdate from "./FeaturProductUpdate";

const ListView = () => {

 
  //console.log("product addon view ----", id)
  const [productData, setProductData] = useState<ProductType[]>([]);
  // var pageNo = 1;
  // var limit = 10

  useEffect(() => {
    async function fetchProduct() {
      try {
          const result = await fetchflavorsProductG();
       
        setProductData(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
    
  }, []);


  return (
    <>
      <div className="mt-10 p-2">
        <h3 className="text-2xl mb-4 font-semibold">
        Sauces
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
          <Table>
            {/* <TableCaption>Product List</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">
                   Name
                </TableHead>
                <TableHead className="hidden md:table-cell"> 
                  Ext Price
                </TableHead>
                {/* <TableHead className="hidden md:table-cell">Image</TableHead> */}

                {/* <TableHead>Category</TableHead> */}
                {/* <TableHead>Status</TableHead> */}
                 <TableHead>Desc</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData.map((product) => {
                return <TableRows key={product.id} product={product} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListView;

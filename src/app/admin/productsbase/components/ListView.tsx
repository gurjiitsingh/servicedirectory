"use client";

type productTableProps = {
  limit?: number;
  title?: string;
};

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


import {  TproductSchema } from "@/lib/types/productType";
import { fetchProductCategoryById } from "@/app/action/products/dbOperation";
import { useSearchParams } from "next/navigation";
import { categoryType } from "@/lib/types/categoryType";
import { fetchCategories } from "@/app/action/category/dbOperations";
import CategoryComp from "./CategoryComp";

//import FeaturProductUpdate from "./FeaturProductUpdate";

const ListView = ({ title }: productTableProps) => {

const useSearch = useSearchParams();
const id = useSearch.get("id") as string;
  const [productData, setProductData] = useState<TproductSchema[]>([]);
  const [categoryData, setCategoryData] = useState<categoryType[]>([]);
  const [cateId, setCateId ] = useState<string>(id);
  // var pageNo = 1;
  // var limit = 10

  // useEffect(() => {
   
  //   async function fetchcate() {
  //     try {
      
  //     const categories = await fetchCategories()
  //       console.log("---------", categories)
  //       setCategoryData(categories);
       
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchcate();
    
  // }, []);

 
  useEffect(() => {
    async function fetchProduct() {
      try {
        const result = await fetchProductCategoryById(cateId);
        console.log("---------", result)
        setProductData(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
    
  }, [ cateId]);  
  
   
console.log("useSearch id ----", cateId)
 

  return (
    <>
      <div className="mt-10 p-2">
      {/* <h3 className="text-xl mb-4 font-semibold">
       Select Service
        </h3>
        <div className="flex gap-3">
{categoryData.map((cate)=>{
  return <CategoryComp name={cate.name} id={cate.id} key={cate.name} />
})}
          
        </div> */}
        <h3 className="text-2xl mb-4 font-semibold">
        Services
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
          <Table>
            {/* <TableCaption>Product List</TableCaption> */}
            <TableHeader>
              <TableRow>
              <TableHead className="hidden md:table-cell">Image</TableHead>
                <TableHead className="hidden md:table-cell">
                   Name
                </TableHead>
                <TableHead className="hidden md:table-cell">
                   Sr. No.
                </TableHead>
               

                {/* <TableHead>Category</TableHead> */}
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Desc</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData.map((product) => {
                return <TableRows key={product.name} product={product} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListView;

'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext';
import { ProductType } from '@/lib/types/productType';

export default function RemoveFromCartButton({product}:{product:ProductType}) {

 
  const ctx = useCartContext();

  function removeItemToCart(product:ProductType){
    //console.log("ljkklklk", product)
  
   // ctx.addProduct(product);
   ctx.removeCartProduct(product);
  }

  return (
    <button onClick={()=>removeItemToCart(product)} className='border px-3 py-1 rounded-xl'>-</button>
  )
}

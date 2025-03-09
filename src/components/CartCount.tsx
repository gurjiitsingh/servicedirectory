'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext'
export default function CartCount() {
 
  const { cartData } = useCartContext();
const totalProcuts = cartData.length;
  return (
    <div>{totalProcuts}</div>
  )
}

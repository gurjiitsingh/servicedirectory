'use client'

import ListView from './components/ListView'
import Link from "next/link"

export default function page(){
  return (
    <div className='h-screen flex flex-col '>
      <div className="flex justify-between">
      
      <Link href='/admin/productsbase/form'><button className="bg-[#313131] text-sm text-white px-4 py-2 rounded-lg">Create</button></Link>
      </div>

      <ListView />

    </div>
  )
}

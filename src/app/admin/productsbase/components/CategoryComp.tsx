import Link from 'next/link'
import React from 'react'

export default function CategoryComp({name, id}:{name:string, id:string}) {
    console.log("----- new id cate", id)
  return (
  <Link
  href={{
    pathname: `/admin/productsbase`,
    //  pathname: "/admin/products/editform",
    query: {
      id:id,
    },
  }}
  >  <div className="px-2 py-1 rounded-2xl border border-slate-300" key={name}>{name}</div></Link>
  )
}

import React from 'react'
// interface dataFormProps{
//   fetchServiceHandler(e:string): void
// }
type CallbackFunction = (id:string) => void;
export default function CategoryComp({name, id, fetchServiceHandler}:{name:string, id:string, fetchServiceHandler:CallbackFunction}) {
    
  return (
    <button onClick={()=>{fetchServiceHandler(id)}}>
   <div className="capitalize px-2 py-1 rounded-2xl border border-slate-300" key={name}>{name}</div>
   </button>
  )
}

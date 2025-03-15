import React from 'react'
import { FaRegUser } from "react-icons/fa";

//import { FaRegUser } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
   // DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react'
import { useSession } from "next-auth/react";
import Link from 'next/link'
//import { sessionT } from '@/lib/types/sessionType';

const LinkDropdown = () => {
  const session = useSession();
console.log("role-------",session?.data?.user?.role)
  return (
    <DropdownMenu>
  <DropdownMenuTrigger>
  <FaRegUser />
  {/* <FaUser /> */}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
  {/* {session&& <DropdownMenuLabel> <Link href="/user">My Account</Link></DropdownMenuLabel> } */}
    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
    <DropdownMenuSeparator />
    {session?.data?.user?.role==='admin' && <DropdownMenuItem> <Link href="/admin/">Dasboard</Link></DropdownMenuItem>}
    {session?.data?.user?.role==='user' && <DropdownMenuItem> <Link href="/user/">Dasboard</Link></DropdownMenuItem>}
    {/* <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
    {session?.data?.user && <DropdownMenuItem><button onClick={()=>{signOut()}}>Logout</button></DropdownMenuItem>  }
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default LinkDropdown
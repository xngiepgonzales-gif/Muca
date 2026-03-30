"use client"

import React from "react"
import { assets } from "@/assets/assets"
import Link from "next/link"
import { useAppContext } from "@/context/AppContext"
import Image from "next/image"
import SideBar from "./seller/Sidebar"
const Navbar=()=>{

const {isSeller,router}=useAppContext()

return(

<nav className="glass sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">

<Image
className="cursor-pointer w-28 md:w-32"
onClick={()=>router.push('/')}
src={assets.logo}
alt="logo"
/>

<div className="flex items-center gap-6 max-md:hidden text-sm">



<Link href="/" className="hover:text-white transition">Home</Link>

<Link href="/all-products" className="hover:text-white transition">Shop</Link>

<Link href="/" className="hover:text-white transition">About</Link>

<Link href="/" className="hover:text-white transition">Contact</Link>

{isSeller &&

<button
onClick={()=>router.push('/seller')}
className="px-4 py-1.5 rounded-full border border-white/20 text-xs">
Seller Dashboard
</button>

}

</div>

<div className="flex items-center gap-4">

<Image
className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer"
src={assets.search_icon}
alt="search icon"
/>

<button className="flex items-center gap-2 hover:text-white transition">

<Image src={assets.user_icon} alt="user icon"/>

Account

</button>

</div>

</nav>

)

}

export default Navbar
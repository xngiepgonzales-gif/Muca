import React from "react"
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useAppContext } from "@/context/AppContext"

const ProductCard=({product})=>{

const {currency,router}=useAppContext()

return(

<div
onClick={()=>{router.push('/product/'+product._id);scrollTo(0,0)}}
className="glass card-hover flex flex-col gap-2 rounded-xl p-3 cursor-pointer"
>

<div className="group relative rounded-lg h-52 flex items-center justify-center overflow-hidden">

<Image
src={product.image[0]}
alt={product.name}
className="group-hover:scale-110 transition duration-300 object-contain w-full h-full"
width={800}
height={800}
/>

<button className="absolute top-2 right-2 bg-black/40 backdrop-blur p-2 rounded-full">

<Image
className="h-3 w-3"
src={assets.heart_icon}
alt="heart"
/>

</button>

</div>

<p className="text-sm font-medium truncate">

{product.name}

</p>

<p className="text-xs text-gray-400 truncate">

{product.description}

</p>

<div className="flex items-center gap-2 text-xs">

<p>4.5</p>

<div className="flex gap-0.5">

{Array.from({length:5}).map((_,index)=>(

<Image
key={index}
className="h-3 w-3"
src={index<4?assets.star_icon:assets.star_dull_icon}
alt="star"
/>

))}

</div>

</div>

<div className="flex items-center justify-between mt-2">

<p className="text-sm font-semibold">

{currency}{product.offerPrice}

</p>

<button className="btn-primary text-xs px-4 py-1.5">

Buy

</button>

</div>

</div>

)

}

export default ProductCard
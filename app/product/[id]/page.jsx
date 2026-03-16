"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {

  const { id } = useParams()

  const { products, router, addToCart } = useAppContext()

  const [mainImage, setMainImage] = useState(null)
  const [productData, setProductData] = useState(null)

  const fetchProductData = async () => {
    const product = products.find(product => product._id === id)
    setProductData(product)
  }

  useEffect(() => {
    fetchProductData()
  }, [id, products.length])

  return productData ? (

    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          <div className="px-5 lg:px-16 xl:px-20">

            <div className="rounded-xl overflow-hidden glass mb-4 p-4">

              <Image
                src={mainImage || productData.image[0]}
                alt="product"
                className="w-full object-cover"
                width={1280}
                height={720}
              />

            </div>

            <div className="grid grid-cols-4 gap-4">

              {productData.image.map((image, index) => (

                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden glass p-2"
                >

                  <Image
                    src={image}
                    alt=""
                    width={1280}
                    height={720}
                  />

                </div>

              ))}

            </div>

          </div>

          <div>

            <h1 className="text-3xl font-semibold text-gray-200">
              {productData.name}
            </h1>

            <p className="text-gray-400 mt-4">
              {productData.description}
            </p>

            <p className="text-3xl font-semibold mt-6 text-emerald-400">

              ${productData.offerPrice}

              <span className="text-base text-gray-500 line-through ml-3">
                ${productData.price}
              </span>

            </p>

            <div className="flex gap-4 mt-10">

              <button
                onClick={() => addToCart(productData._id)}
                className="glass px-6 py-3 rounded-lg hover:scale-105 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => { addToCart(productData._id); router.push('/cart') }}
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

        <div className="flex flex-col items-center mt-20">

          <h2 className="text-3xl font-semibold">
            Featured Products
          </h2>

          <div className="w-28 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 mt-3"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 pb-14 w-full">

            {products.slice(0,5).map((product,index)=>(
              <ProductCard key={index} product={product}/>
            ))}

          </div>

        </div>

      </div>

      <Footer />

    </>

  ) : <Loading />

}

export default Product
'use client'
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const ProductList = () => {

  const { router } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSellerProduct = async () => {
    setProducts(productsDummyData)
    setLoading(false)
  }

  useEffect(() => {
    fetchSellerProduct()
  }, [])

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">

      {loading ? <Loading /> :

        <div className="w-full md:p-10 p-4">

          <h2 className="pb-6 text-xl font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            All Products
          </h2>

          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-xl glass">

            <table className="table-fixed w-full">

              <thead className="text-gray-300 text-sm text-left border-b border-white/10">

                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium max-sm:hidden">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium max-sm:hidden">Action</th>
                </tr>

              </thead>

              <tbody className="text-sm text-gray-400">

                {products.map((product, index) => (

                  <tr key={index} className="border-t border-white/10">

                    <td className="px-4 py-3 flex items-center space-x-3">

                      <div className="bg-white/5 rounded p-2">
                        <Image
                          src={product.image[0]}
                          alt="product"
                          className="w-16"
                          width={1280}
                          height={720}
                        />
                      </div>

                      <span>{product.name}</span>

                    </td>

                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>

                    <td className="px-4 py-3 text-emerald-400">
                      ${product.offerPrice}
                    </td>

                    <td className="px-4 py-3 max-sm:hidden">

                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-medium hover:scale-105 transition"
                      >
                        Visit
                        <Image
                          className="h-3.5"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      }

      <Footer />

    </div>
  )
}

export default ProductList
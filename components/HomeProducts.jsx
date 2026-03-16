import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-20">

      <div className="text-center mb-10">

        <h2 className="text-3xl font-semibold">
          Popular Products
        </h2>

        <div className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-500 mx-auto mt-3"></div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full pb-14">
        {products.map((product, index) =>
          <ProductCard key={index} product={product} />
        )}
      </div>

      <button
        onClick={() => router.push('/all-products')}
        className="glass px-10 py-3 rounded-full text-gray-300 hover:scale-105 transition"
      >
        See more
      </button>

    </div>
  );
};

export default HomeProducts;
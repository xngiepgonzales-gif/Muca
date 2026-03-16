import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work and gaming.",
  },
];

const FeaturedProduct = () => {

  return (

    <div className="mt-24">

      <div className="text-center">

        <h2 className="text-3xl font-semibold">Featured Products</h2>

        <div className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-500 mx-auto mt-3"></div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">

        {products.map(({ id, image, title, description }) => (

          <div key={id} className="glass rounded-2xl overflow-hidden card-hover">

            <Image
              src={image}
              alt={title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 space-y-3">

              <h3 className="text-lg font-semibold">
                {title}
              </h3>

              <p className="text-gray-400 text-sm">
                {description}
              </p>

              <button className="btn-primary px-6 py-2 text-sm mt-2">
                Buy now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default FeaturedProduct;
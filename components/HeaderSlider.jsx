import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {

  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound",
      subtitle: "Premium headphones with immersive audio.",
      button1: "Buy now",
      button2: "Explore",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next Level Gaming",
      subtitle: "Discover PlayStation 5 performance.",
      button1: "Shop now",
      button2: "Details",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "MacBook Pro Power",
      subtitle: "Performance meets elegance.",
      button1: "Order now",
      button2: "Learn more",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (

    <div className="overflow-hidden relative w-full mt-6">

      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >

        {sliderData.map((slide) => (

          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between glass py-10 md:px-14 px-6 rounded-2xl min-w-full"
          >

            <div className="md:pl-6 mt-10 md:mt-0">

              <h1 className="max-w-lg md:text-[42px] md:leading-[50px] text-3xl font-semibold">
                {slide.title}
              </h1>

              <p className="text-gray-400 mt-4 max-w-md">
                {slide.subtitle}
              </p>

              <div className="flex items-center gap-4 mt-6">

                <button className="btn-primary px-8 py-2.5 text-sm font-medium">
                  {slide.button1}
                </button>

                <button className="text-gray-300 hover:text-white transition">
                  {slide.button2}
                </button>

              </div>

            </div>

            <div className="flex items-center flex-1 justify-center">

              <Image
                className="md:w-80 w-52 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                src={slide.imgSrc}
                alt="product"
              />

            </div>

          </div>

        ))}

      </div>

      <div className="flex items-center justify-center gap-3 mt-6">

        {sliderData.map((_, index) => (

          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-6 rounded-full cursor-pointer transition ${
              currentSlide === index
                ? "bg-gradient-to-r from-cyan-400 to-emerald-500"
                : "bg-gray-600"
            }`}
          />

        ))}

      </div>

    </div>

  );

};

export default HeaderSlider;
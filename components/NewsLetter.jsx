import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-16 pb-20">

      <h1 className="md:text-4xl text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
        Get exclusive deals
      </h1>

      <p className="md:text-base text-gray-400 mt-3 max-w-xl">
        Subscribe to receive new products, exclusive discounts and updates.
      </p>

      <div className="glass flex items-center justify-between max-w-xl w-full md:h-14 h-12 mt-8 rounded-full px-2">

        <input
          className="bg-transparent outline-none w-full px-4 text-gray-300 placeholder:text-gray-500"
          type="email"
          placeholder="Enter your email"
        />

        <button className="btn-primary px-8 h-10 rounded-full text-sm font-medium">
          Subscribe
        </button>

      </div>

    </div>
  );
};

export default NewsLetter;
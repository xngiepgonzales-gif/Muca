'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const AddProduct = () => {

  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Earphone')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (

    <div className="flex-1 min-h-screen flex flex-col justify-between">

      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-6 max-w-lg">

        <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Add Product
        </h2>

        <div>

          <p className="text-base font-medium mb-3">Product Image</p>

          <div className="flex flex-wrap items-center gap-3">

            {[...Array(4)].map((_, index) => (

              <label key={index} htmlFor={`image${index}`}>

                <input
                  type="file"
                  hidden
                  id={`image${index}`}
                  onChange={(e) => {
                    const updated = [...files]
                    updated[index] = e.target.files[0]
                    setFiles(updated)
                  }}
                />

                <Image
                  className="max-w-24 cursor-pointer glass rounded-lg p-2"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />

              </label>

            ))}

          </div>

        </div>

        <input
          type="text"
          placeholder="Product Name"
          className="glass px-4 py-2.5 rounded-lg outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          rows={4}
          placeholder="Product Description"
          className="glass px-4 py-2.5 rounded-lg outline-none resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-4">

          <select
            className="glass px-3 py-2 rounded-lg"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Earphone</option>
            <option>Headphone</option>
            <option>Watch</option>
            <option>Smartphone</option>
            <option>Laptop</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            className="glass px-3 py-2 rounded-lg"
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Offer"
            className="glass px-3 py-2 rounded-lg"
            onChange={(e) => setOfferPrice(e.target.value)}
          />

        </div>

        <button className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black px-8 py-2.5 rounded-lg font-medium hover:scale-105 transition">
          ADD
        </button>

      </form>

    </div>

  )
}

export default AddProduct
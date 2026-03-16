"use client"
import React from "react"

const FloatingBrand = () => {

  return (

    <div className="pointer-events-none fixed -left-28 top-60 z-20 hidden lg:block">

      <div className="relative">

        <p
          className="
          rotate-[-90deg]
          text-[140px]
          font-bold
          tracking-widest
          bg-gradient-to-r
          from-cyan-400
          via-emerald-400
          to-cyan-400
          bg-clip-text
          text-transparent
          opacity-20
          select-none
          "
        >
          MUCA
        </p>

        {/* glow */}
        <div
          className="
          absolute
          inset-0
          blur-3xl
          opacity-25
          bg-gradient-to-r
          from-cyan-400
          to-emerald-400
          "
        />

      </div>

    </div>

  )
}

export default FloatingBrand
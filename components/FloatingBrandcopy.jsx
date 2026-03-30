"use client"
import React from "react"

// Usa `fixed` para que quede fija en pantalla (no sigue el scroll).
// Si quieres que quede SOLO en la posición inicial del documento
// y desaparezca al hacer scroll, usa `absolute` en lugar de `fixed`
// (el layout padre debe tener position: relative).

const FloatingBrand = () => {
  return (
    <div className="pointer-events-none absolute -right-28 bottom-96 z-20 hidden lg:block">
      <div className="relative">
        <p
          className="
            rotate-[-90deg]
            text-[110px]
            font-bold
            tracking-widest
            bg-clip-text
            text-transparent
            select-none
          "
          style={{
            backgroundImage: `linear-gradient(135deg, #38bdf8, #39ff85, #38bdf8)`,
            opacity: 0.4,
          }}
        >
          MUCA
        </p>

        <div
          className="absolute inset-0 blur-3xl"
          style={{
            background: `linear-gradient(135deg, #38bdf8, #39ff85)`,
            opacity: 0.2,
            filter: "blur(40px)",
          }}
        />
      </div>
    </div>
  )
}

export default FloatingBrand


/*
  ── NOTAS ──────────────────────────────────────────────────────────────────
  OPCIÓN A — fixed (actual): el texto flota siempre visible en la esquina
  izquierda, sin importar cuánto scrollees. Ya es lo que tenías.

  OPCIÓN B — absolute (fijo al inicio del documento, desaparece con scroll):
  1. Quita `fixed` y pon `absolute` en el div raíz.
  2. En layout.jsx, asegúrate de que el contenedor padre tenga:
       className="relative z-10"   ← ya lo tiene ✅
  Así el brand solo se ve cuando el usuario está arriba de la página.
  ────────────────────────────────────────────────────────────────────────────
*/
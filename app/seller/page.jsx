"use client"
import React, { useState, useEffect } from "react"
import { useAppContext } from "@/context/AppContext"

// ─── tipos de datos esperados ────────────────────────────────────────────────
// Product: { _id, name, description, price, category, subCategory, stock, date }
// ─────────────────────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "",
  subCategory: "",
  stock: "",
}

export default function ProductsCRUD() {
  const { getToken } = useAppContext()        // ajusta según tu contexto

  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState("")
  const [success, setSuccess]     = useState("")

  // modal
  const [modalOpen, setModalOpen]     = useState(false)
  const [editingId, setEditingId]     = useState(null)   // null = nuevo
  const [form, setForm]               = useState(EMPTY_FORM)

  // confirm delete
  const [deleteId, setDeleteId]       = useState(null)

  // ── fetch all ──────────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true)
    setError("")
    try {
      const res  = await fetch("/api/product/list")
      const data = await res.json()
      if (data.success) setProducts(data.products ?? [])
      else setError(data.message ?? "Error al cargar productos")
    } catch {
      setError("No se pudo conectar al servidor")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  // ── helpers ────────────────────────────────────────────────────────────────
  const flash = (msg, isError = false) => {
    if (isError) { setError(msg); setTimeout(() => setError(""),  3500) }
    else         { setSuccess(msg); setTimeout(() => setSuccess(""), 3000) }
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const openEdit = (product) => {
    setEditingId(product._id)
    setForm({
      name:        product.name        ?? "",
      description: product.description ?? "",
      price:       product.price       ?? "",
      category:    product.category    ?? "",
      subCategory: product.subCategory ?? "",
      stock:       product.stock       ?? "",
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  // ── CREATE / UPDATE ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const token = await getToken?.()
      const headers = { "Content-Type": "application/json", ...(token && { token }) }

      let res, data

      if (editingId) {
        // UPDATE  — ajusta la ruta a tu API
        res  = await fetch(`/api/product/update`, {
          method:  "PUT",
          headers,
          body:    JSON.stringify({ id: editingId, ...form, price: Number(form.price), stock: Number(form.stock) }),
        })
      } else {
        // CREATE — ajusta la ruta a tu API
        res  = await fetch("/api/product/add", {
          method:  "POST",
          headers,
          body:    JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
        })
      }

      data = await res.json()
      if (data.success) {
        flash(editingId ? "Producto actualizado ✓" : "Producto creado ✓")
        closeModal()
        fetchProducts()
      } else {
        flash(data.message ?? "Error al guardar", true)
      }
    } catch {
      flash("Error de conexión", true)
    } finally {
      setSaving(false)
    }
  }

  // ── DELETE ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeleteId(null)
    try {
      const token = await getToken?.()
      const res   = await fetch("/api/product/delete", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json", ...(token && { token }) },
        body:    JSON.stringify({ id }),
      })
      const data = await res.json()
      if (data.success) { flash("Producto eliminado ✓"); fetchProducts() }
      else flash(data.message ?? "Error al eliminar", true)
    } catch {
      flash("Error de conexión", true)
    }
  }

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 p-4 md:p-8 min-h-screen text-gray-200">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Productos</h1>
          <p className="text-sm text-gray-400 mt-0.5">{products.length} en catálogo</p>
        </div>
        <button
          onClick={openCreate}
          className="btn-primary px-5 py-2 text-sm font-medium"
        >
          + Nuevo producto
        </button>
      </div>

      {/* TOASTS */}
      {error   && <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-sm">{error}</div>}
      {success && <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm">{success}</div>}

      {/* TABLE */}
      {loading ? (
        <div className="flex justify-center items-center h-48 text-gray-400">Cargando…</div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400 gap-2">
          <span className="text-4xl">📦</span>
          <p>No hay productos aún. ¡Crea el primero!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-left">
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Categoría</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Stock</th>
                <th className="px-4 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p._id}
                  className={`border-b border-white/5 hover:bg-white/5 transition ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                >
                  <td className="px-4 py-3 font-medium text-white max-w-[180px] truncate">{p.name}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{p.category}{p.subCategory ? ` / ${p.subCategory}` : ""}</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">S/ {Number(p.price).toFixed(2)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${Number(p.stock) > 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                      {p.stock ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteId(p._id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── MODAL CREATE / EDIT ───────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass w-full max-w-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">{editingId ? "Editar producto" : "Nuevo producto"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition text-xl leading-none">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nombre *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60"
                  placeholder="Ej. Arduino Uno Rev3"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 resize-none"
                  placeholder="Descripción breve del producto"
                />
              </div>

              {/* Precio / Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Precio (S/) *</label>
                  <input
                    required type="number" min="0" step="0.01"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/60"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Stock</label>
                  <input
                    type="number" min="0"
                    value={form.stock}
                    onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/60"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Categoría / Subcategoría */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Categoría</label>
                  <input
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/60"
                    placeholder="Ej. Microcontroladores"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Subcategoría</label>
                  <input
                    value={form.subCategory}
                    onChange={e => setForm(f => ({ ...f, subCategory: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/60"
                    placeholder="Ej. Arduino"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-primary py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Guardando…" : editingId ? "Actualizar" : "Crear producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CONFIRM DELETE ────────────────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass w-full max-w-sm rounded-2xl p-6 border border-white/10 shadow-2xl text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <h3 className="text-base font-semibold mb-1">¿Eliminar producto?</h3>
            <p className="text-sm text-gray-400 mb-5">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 text-sm transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { ProductForm } from './ProductForm'
import { ProductCard } from './ProductCard'

export default function Products() {
  const { products, loading, createProduct, updateProduct, deleteProduct } =
    useProducts()
  const [form, setForm] = useState({ name: '', price: 0, stock: 0 })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = () => {
    if (!form.name || form.price <= 0 || form.stock < 0) {
      setErrorMessage('Por favor llena todos los campos correctamente')
      return
    }

    if (editingId) {
      updateProduct(editingId, form)
      setEditingId(null)
    } else {
      createProduct(form)
    }

    setForm({ name: '', price: 0, stock: 0 })
    setErrorMessage('')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestor de productos</h1>

      <ProductForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        editingId={editingId}
        errorMessage={errorMessage}
      />

      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="grid gap-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={(prod) => {
                setEditingId(prod.id)
                setForm({
                  name: prod.name,
                  price: prod.price,
                  stock: prod.stock,
                })
              }}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  )
}

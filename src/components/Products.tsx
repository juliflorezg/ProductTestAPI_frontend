import { useState, useEffect } from 'react'
import { api } from '../services/api'
import '../index.css'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

type CreateProductDTO = Omit<Product, 'id'>

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<CreateProductDTO>({
    name: '',
    price: 0,
    stock: 0,
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const getProducts = async () => {
    try {
      setLoading(true)
      const res = await api.get<Product[]>('/')
      setProducts(res.data)
    } catch (error) {
      console.error('Error getting products:', error)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async () => {
    try {
      if (!form.name || form.price <= 0 || form.stock < 0) {
        setErrorMessage('Por favor llena todos los campos correctamente')
        return
      }

      const res = await api.post<Product>('/', form)
      setProducts([...products, res.data])
      setForm({ name: '', price: 0, stock: 0 })
      setErrorMessage('')
    } catch (error) {
      console.error(error)
    }
  }

  const updateProduct = async (id: number) => {
    try {
      const res = await api.put<Product>(`/${id}`, form)
      setProducts(products.map((p) => (p.id === id ? res.data : p)))
      setEditingId(null)
      setForm({ name: '', price: 0, stock: 0 })
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/${id}`)
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({ name: product.name, price: product.price, stock: product.stock })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestor de productos</h1>

      {/* Formulario */}
      <div className="mb-4 flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: parseFloat(e.target.value) })
          }
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: parseInt(e.target.value) })
          }
        />
        <button
          onClick={() =>
            editingId ? updateProduct(editingId) : createProduct()
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? 'Editar Producto' : 'Agregar Producto'}
        </button>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>

      {/* Productos */}
      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-sm p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

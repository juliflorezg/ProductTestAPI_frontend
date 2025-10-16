import { useState, useEffect } from 'react'
import { api } from '../services/api'
import type Product from '../Interfaces/Product'



type CreateProductDTO = Omit<Product, 'id'>

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const getProducts = async () => {
    try {
      setLoading(true)
      const res = await api.get<Product[]>('/')
      setProducts(res.data)
    } catch {
      setError('Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (data: CreateProductDTO) => {
    const res = await api.post<Product>('/', data)
    setProducts(prev => [...prev, res.data])
  }

  const updateProduct = async (id: number, data: CreateProductDTO) => {
    const res = await api.put<Product>(`/${id}`, data)
    setProducts(prev => prev.map(p => (p.id === id ? res.data : p)))
  }

  const deleteProduct = async (id: number) => {
    await api.delete(`/${id}`)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return { products, loading, error, createProduct, updateProduct, deleteProduct }
}

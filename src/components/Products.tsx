import { useState, useEffect } from 'react'
import { api } from '../services/api'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {

    try {
      setLoading(true);
      const res = await api.get<Product[]>('/');
      const data = await res.data;

      setProducts(data);

    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false)
    }

  }

  const updateProduct = async () => {
    api.patch("/")
  }

  useEffect(() => {
    getProducts();

  }, [])

  return (
    loading ? <div>Loading...</div>
      :
      <>
        <div >
          <input type="text" />
          <button onClick={() => updateProduct()}></button>

        </div>
        {
          products.map(product => (

            <div>{product.name} | {product.price} | {product.stock}</div>
          ))
        }

      </>
  )
}

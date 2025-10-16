import type Product from "../Interfaces/Product"


interface ProductCardProps {
  product: Product
  onEdit: (p: Product) => void
  onDelete: (id: number) => void
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-sm p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-gray-700">${product.price}</p>
        <p className="text-gray-500">Stock: {product.stock}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

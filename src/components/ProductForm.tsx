interface ProductFormProps {
  form: { name: string; price: number; stock: number }
  setForm: (f: any) => void
  onSubmit: () => void
  editingId: number | null
  errorMessage: string
}

export function ProductForm({
  form,
  setForm,
  onSubmit,
  editingId,
  errorMessage,
}: ProductFormProps) {
  return (
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
        onClick={onSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {editingId ? 'Editar Producto' : 'Agregar Producto'}
      </button>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  )
}

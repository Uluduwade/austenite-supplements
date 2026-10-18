import { useState } from 'react'
import ProductCard from './ProductCard.jsx'
import ProductModal from './ProductModal.jsx'
export default function ProductGrid({ items }) {
  const [open, setOpen] = useState(null)
  if (!items.length) return <p className="muted empty">No products match. Try a different word or clear the filter.</p>
  return (
    <>
      <div className="grid">{items.map((p) => <ProductCard key={p.id} p={p} onOpen={setOpen} />)}</div>
      {open && <ProductModal p={open} onClose={() => setOpen(null)} />}
    </>
  )
}

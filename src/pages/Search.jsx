import { useState } from 'react'
import ProductGrid from '../components/ProductGrid.jsx'
import { products } from '../data/products.js'
const ideas = ['whey', 'creatine', 'capsules', 'chocolate', 'unflavoured']
export default function Search() {
  const [q, setQ] = useState('')
  const t = q.trim().toLowerCase()
  const items = t ? products.filter((p) => [p.name, p.cat, p.size, p.desc, ...p.flavours].join(' ').toLowerCase().includes(t)) : products
  return (
    <section className="sec">
      <h1>Search</h1>
      <input className="search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by product, flavour or category" aria-label="Search products" />
      <div className="chips">{ideas.map((i) => <button key={i} className="chip" onClick={() => setQ(i)}>{i}</button>)}</div>
      <p className="muted">{items.length} {items.length === 1 ? 'result' : 'results'}</p>
      <ProductGrid items={items} />
    </section>
  )
}

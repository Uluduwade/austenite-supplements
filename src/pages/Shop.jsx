import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import { products, CATEGORIES } from '../data/products.js'
export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [cat, setCat] = useState(() => (CATEGORIES.includes(params.get('cat')) ? params.get('cat') : 'All'))
  const [sort, setSort] = useState('default')
  const q = (params.get('q') || '').trim().toLowerCase()
  let items = products.filter((p) => cat === 'All' || p.cat === cat)
  if (q) items = items.filter((p) => [p.name, p.cat, p.size, p.desc, ...p.flavours].join(' ').toLowerCase().includes(q))
  if (sort === 'low') items = [...items].sort((a, b) => a.price - b.price)
  if (sort === 'high') items = [...items].sort((a, b) => b.price - a.price)
  return (
    <section className="sec">
      <h1>Shop</h1>
      <div className="bar">
        <div className="chips">{CATEGORIES.map((c) => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}</div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="default">Featured</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option>
        </select>
      </div>
      {q && (
        <p className="muted">
          {items.length} {items.length === 1 ? 'result' : 'results'} for "{params.get('q').trim()}"{' '}
          <button className="chip" onClick={() => setParams({})}>Clear search</button>
        </p>
      )}
      <ProductGrid items={items} />
    </section>
  )
}

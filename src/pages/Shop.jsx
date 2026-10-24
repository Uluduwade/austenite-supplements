import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import { products, CATEGORIES } from '../data/products.js'
import { productPrice, useCurrency } from '../currency.js'
export default function Shop() {
  const { code } = useCurrency()
  const [params, setParams] = useSearchParams()
  const [cat, setCat] = useState(() => (CATEGORIES.includes(params.get('cat')) ? params.get('cat') : 'All'))
  const [sort, setSort] = useState('default')
  const q = (params.get('q') || '').trim().toLowerCase()
  let items = products.filter((p) => cat === 'All' || p.cat === cat)
  if (q) items = items.filter((p) => [p.name, p.cat, p.size, p.desc, ...p.flavours].join(' ').toLowerCase().includes(q))
  if (sort === 'price') items = [...items].sort((a, b) => productPrice(a, code) - productPrice(b, code))
  if (sort === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
  return (
    <section className="sec">
      <h1>Shop</h1>
      <div className="bar">
        <div className="chips">{CATEGORIES.map((c) => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}</div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="default">Featured</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
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

import { useState } from 'react'
import ProductGrid from '../components/ProductGrid.jsx'
import { products, CATEGORIES } from '../data/products.js'
export default function Shop() {
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('default')
  let items = products.filter((p) => cat === 'All' || p.cat === cat)
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
      <ProductGrid items={items} />
    </section>
  )
}

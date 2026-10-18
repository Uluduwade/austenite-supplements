import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import Tub from '../components/Tub.jsx'
import { products } from '../data/products.js'

const hero = products.filter((p) => ['iso-xp', 'critical-whey', 'creatine-50', 'unflavoured-250', 'shilajit', 'collagen'].includes(p.id))
function Count({ to, suffix = '' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let i = 0
    const t = setInterval(() => { i += Math.ceil(to / 40); if (i >= to) { i = to; clearInterval(t) } setN(i) }, 30)
    return () => clearInterval(t)
  }, [to])
  return <b>{n}{suffix}</b>
}
export default function Home() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % hero.length), 3000); return () => clearInterval(t) }, [])
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="tag">Original UK imports</p>
          <h1>"Train harder Recover faster"</h1>
          <p className="lead">Genuine Applied Nutrition protein, creatine and performance supplements, delivered across Sri Lanka.</p>
          <div className="row"><Link className="btn" to="/shop">Shop now</Link><Link className="btn ghost" to="/search">Search products</Link></div>
        </div>
        <div className="hero-art">
          {hero.map((p, n) => (
            <Link to="/shop" key={p.id} className={'slide' + (n === i ? ' on' : '')} aria-hidden={n !== i}>
              <Tub p={p} big /><span>{p.name}</span>
            </Link>
          ))}
          <div className="dots">{hero.map((p, n) => <button key={p.id} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={'Show ' + p.name} />)}</div>
        </div>
      </section>
      <div className="marquee"><div>{[...products, ...products].map((p, n) => <span key={n}>{p.name}</span>)}</div></div>
      <section className="sec">
        <h2>Best sellers</h2>
        <ProductGrid items={products.filter((p) => ['creatine-50', 'critical-whey', 'test-x', 'unflavoured-250', 'shred-x'].includes(p.id))} />
        <Link className="btn ghost more" to="/shop">View all products</Link>
      </section>
      <section className="stats">
        <div><Count to={100} suffix="%" /><p>Original, UK imported</p></div>
        <div><Count to={products.length} /><p>Products in stock</p></div>
        <div><Count to={24} suffix="h" /><p>Order replies</p></div>
      </section>
    </>
  )
}

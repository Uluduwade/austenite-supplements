import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import Tub from '../components/Tub.jsx'
import { Dumbbell, Zap, Leaf, Flame, ShieldCheck, Plane, MessageCircle, BadgeCheck, MousePointerClick, PackageCheck } from 'lucide-react'
import { products } from '../data/products.js'

const goals = [
  ['Protein', 'Build and recover', Dumbbell],
  ['Performance', 'Power and endurance', Zap],
  ['Wellness', 'Daily health staples', Leaf],
  ['Fat Burners', 'Support your cut', Flame],
]
const perks = [
  [ShieldCheck, 'Authentic only', 'Sealed Applied Nutrition, nothing relabelled.'],
  // [Plane, 'Direct UK import', 'Straight from the UK to Sri Lanka.'],
  [BadgeCheck, 'Elite formulas', 'No fillers, just premium formulations.'],
  [MessageCircle, 'Real support', 'A person replies within 24 hours.'],
]
const steps = [
  [MousePointerClick, 'Pick your product', 'Browse the shop and choose a flavour and size.'],
  [MessageCircle, 'Order on WhatsApp', 'One tap sends your order to us with every detail.'],
  [PackageCheck, 'Get it delivered', 'We confirm, pack it and ship it to your door.'],
]
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
          <p className="lead">Engineered for absolute performance, raw power, and elite dynamic response. No unnecessary fillers, just 100% premium formulations meticulously designed to push your athletic thresholds.</p>
          <div className="row"><Link className="btn" to="/shop">Shop now</Link><Link className="btn ghost" to="/about">About us</Link></div>
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
        <p className="section-kicker">Shop by goal</p>
        <h2>Find your fuel</h2>
        <div className="goals">
          {goals.map(([cat, sub, Icon]) => (
            <Link key={cat} to={'/shop?cat=' + encodeURIComponent(cat)} className="goal">
              <span className="goal-icon"><Icon size={26} aria-hidden="true" /></span>
              <h3>{cat}</h3><p>{sub}</p>
              <span className="goal-go" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="sec">
        <h2>Best sellers</h2>
        <ProductGrid items={products.filter((p) => ['creatine-50', 'critical-whey', 'test-x', 'unflavoured-250', 'shred-x'].includes(p.id))} />
        <Link className="btn ghost more" to="/shop">View all products</Link>
      </section>
      <section className="sec">
        <p className="section-kicker">Why Austenite</p>
        <h2>Built on trust</h2>
        <div className="perks">
          {perks.map(([Icon, t, d]) => (
            <div key={t} className="perk"><Icon size={28} aria-hidden="true" /><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>
      <section className="sec">
        <p className="section-kicker">How it works</p>
        <h2>Order in three steps</h2>
        <ol className="steps">
          {steps.map(([Icon, t, d], n) => (
            <li key={t}><span className="step-n">{n + 1}</span><Icon size={26} aria-hidden="true" /><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </section>
      <section className="stats">
        <div><Count to={100} suffix="%" /><p>Original, UK imported</p></div>
        <div><Count to={products.length} /><p>Products in stock</p></div>
        <div><Count to={24} suffix="h" /><p>Order replies</p></div>
      </section>
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Tub from './Tub.jsx'
import { formatPrice, productPrice, useCurrency } from '../currency.js'
import { useCart } from '../cart.js'
import { ShoppingCart } from 'lucide-react'

const REST_MS = 450 // cursor must stay still this long before the preview shows
const MOVE_PX = 6 // movement smaller than this still counts as "still"
const POP_W = 280, POP_H = 300

export default function ProductCard({ p, onOpen }) {
  const { code } = useCurrency()
  const { addItem, openCart } = useCart()
  const [added, setAdded] = useState(false)
  const [pop, setPop] = useState(null)
  const timer = useRef(null)
  const last = useRef({ x: 0, y: 0 })
  useEffect(() => () => clearTimeout(timer.current), [])

  const hide = () => { clearTimeout(timer.current); setPop(null) }
  const arm = (x, y) => {
    clearTimeout(timer.current)
    last.current = { x, y }
    timer.current = setTimeout(() => {
      // keep the popup inside the viewport, offset from the cursor
      const left = Math.min(x + 18, window.innerWidth - POP_W - 12)
      const top = Math.max(12, Math.min(y + 18, window.innerHeight - POP_H - 12))
      setPop({ left: x + 18 + POP_W > window.innerWidth ? Math.max(12, x - POP_W - 18) : left, top })
    }, REST_MS)
  }

  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
    if (e.pointerType === 'touch') return
    if (Math.hypot(e.clientX - last.current.x, e.clientY - last.current.y) > MOVE_PX) {
      if (pop) setPop(null)
      arm(e.clientX, e.clientY)
    }
  }
  const reset = (e) => { e.currentTarget.style.transform = ''; hide() }

  return (
    <article
      className="card"
      id={p.id}
      itemScope
      itemType="https://schema.org/Product"
      onMouseEnter={(e) => arm(e.clientX, e.clientY)}
      onMouseMove={tilt}
      onMouseLeave={reset}
      onClick={() => { hide(); onOpen(p) }}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); hide(); onOpen(p) } }}
      tabIndex="0"
    >
      {p.soon && <span className="soon-badge">Coming soon</span>}
      <Tub p={p} />
      <h3 itemProp="name">{p.name}</h3>
      <p className="muted">{p.size}</p>
      {p.flavours.length > 0 && <p className="muted">{p.flavours.length} flavour{p.flavours.length > 1 ? 's' : ''}</p>}
      <meta itemProp="description" content={p.desc} />
      <meta itemProp="category" content={p.cat} />
      <p className="price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="priceCurrency" content={code} />
        <meta itemProp="price" content={String(productPrice(p, code))} />
        <span>{formatPrice(productPrice(p, code), code)}</span>
      </p>
      {!p.soon && <button type="button" className="card-add" onClick={(event) => { event.stopPropagation(); addItem(p.id, p.flavours[0] || '', 1); setAdded(true); openCart(); setTimeout(() => setAdded(false), 1200) }}><ShoppingCart size={15} aria-hidden="true" /> {added ? 'Added' : 'Add to cart'}</button>}
      {pop && createPortal(
        <div className="peek" role="tooltip" style={{ left: pop.left, top: pop.top, width: POP_W }}>
          <p className="muted">{p.cat}</p>
          <h4>{p.name}</h4>
          <p>{p.desc}</p>
          {p.size && <p className="muted">Pack: {p.size}</p>}
          {p.flavours.length > 0 && <p className="muted">{p.flavours.length} flavour{p.flavours.length > 1 ? 's' : ''}: {p.flavours.join(', ')}</p>}
          <b className="price">{formatPrice(productPrice(p, code), code)}</b>
        </div>,
        document.body
      )}
    </article>
  )
}

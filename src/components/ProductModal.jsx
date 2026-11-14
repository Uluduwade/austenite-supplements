import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ShieldCheck, Plane, Utensils, Users, Lightbulb, MessageCircle, ShoppingCart, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Tub from './Tub.jsx'
import { formatPrice, productPrice, useCurrency } from '../currency.js'
import { CONTACT } from '../config.js'
import { useCart } from '../cart.js'
export default function ProductModal({ p, onClose }) {
  const [flavour, setFlavour] = useState(p.flavours[0] || '')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { code } = useCurrency()
  const { addItem, openCart } = useCart()
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  // A flavour can have its own photo via p.flavourImg; otherwise the main product image is used
  const art = { ...p, img: (p.flavourImg && p.flavourImg[flavour]) || p.img }
  const msg = p.soon
    ? `Hi Austenite, please let me know when ${p.name} ${p.size}${flavour ? ' (' + flavour + ')' : ''} is available.`
    : `Hi Austenite, I'd like to order ${qty} x ${p.name} ${p.size}${flavour ? ' (' + flavour + ')' : ''}.`
  // Portal to <body> so the popup escapes <main>'s stacking context and sits above the sticky navbar
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Close"><X size={16} aria-hidden="true" /></button>
        <div className="modal-art">
          <span className="modal-cat">{p.cat}</span>
          {p.soon && <span className="soon-badge">Coming soon</span>}
          <Tub p={art} big />
          <div className="modal-badges">
            <span><ShieldCheck size={15} aria-hidden="true" /> 100% original</span>
            {code === 'LKR' && <span><Plane size={15} aria-hidden="true" /> UK imported</span>}
          </div>
        </div>
        <div className="modal-info">
          <div className="modal-scroll">
          <h2>{p.name}</h2>
          {p.size && <p className="modal-size">{p.size}</p>}
          <p className="modal-about">{p.about || p.desc}</p>

          {p.highlights && (
            <ul className="modal-list">
              {p.highlights.map((h) => <li key={h}><Check size={16} aria-hidden="true" />{h}</li>)}
            </ul>
          )}

          <div className="modal-facts">
            {p.use && <div><Utensils size={18} aria-hidden="true" /><span><b>How to use</b>{p.use}</span></div>}
            {p.who && <div><Users size={18} aria-hidden="true" /><span><b>Best for</b>{p.who}</span></div>}
            {p.tip && <div><Lightbulb size={18} aria-hidden="true" /><span><b>Good to know</b>{p.tip}</span></div>}
          </div>
          </div>

          <div className="modal-foot">
          {p.flavours.length > 0 && (
            <div className="modal-opt">
              <p className="section-kicker">Flavour</p>
              <div className="chips">{p.flavours.map((f) => (
                <button key={f} className={'chip' + (f === flavour ? ' on' : '')} onClick={() => setFlavour(f)}>{f}</button>
              ))}</div>
            </div>
          )}
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">-</button><span>{qty}</span><button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
            <b className="price">{formatPrice(productPrice(p, code) * qty, code)}</b>
          </div>
          {!p.soon && (
            <>
              <button type="button" className="btn modal-order" onClick={() => { addItem(p.id, flavour, qty); setAdded(true); openCart() }}>
                <ShoppingCart size={18} aria-hidden="true" /> {added ? 'Add more to cart' : 'Add to cart'}
              </button>
              {added && <p className="cart-added" role="status">Added to cart. <Link to="/cart" onClick={onClose}>View cart</Link></p>}
            </>
          )}
          <a className="btn modal-order" href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> {p.soon ? 'Notify me on WhatsApp' : 'Order on WhatsApp'}</a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ShieldCheck, Plane, Utensils, Users, Lightbulb, MessageCircle, X } from 'lucide-react'
import Tub from './Tub.jsx'
import { formatPrice, useCurrency } from '../currency.js'
import { CONTACT } from '../config.js'
export default function ProductModal({ p, onClose }) {
  const [flavour, setFlavour] = useState(p.flavours[0] || '')
  const [qty, setQty] = useState(1)
  const { code } = useCurrency()
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  const msg = `Hi Austenite, I'd like to order ${qty} x ${p.name} ${p.size}${flavour ? ' (' + flavour + ')' : ''}.`
  // Portal to <body> so the popup escapes <main>'s stacking context and sits above the sticky navbar
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Close"><X size={16} aria-hidden="true" /></button>
        <div className="modal-art">
          <span className="modal-cat">{p.cat}</span>
          <Tub p={p} big />
          <div className="modal-badges">
            <span><ShieldCheck size={15} aria-hidden="true" /> 100% original</span>
            <span><Plane size={15} aria-hidden="true" /> UK imported</span>
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
            <b className="price">{formatPrice(p.price * qty, code)}</b>
          </div>
          <a className="btn modal-order" href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> Order on WhatsApp</a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

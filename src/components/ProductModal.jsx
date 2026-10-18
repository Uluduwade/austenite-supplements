import { useEffect, useState } from 'react'
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
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Close">Close</button>
        <Tub p={p} big />
        <div>
          <p className="muted">{p.cat}</p>
          <h2>{p.name}</h2>
          <p>{p.desc}</p>
          <p className="muted">{p.size && 'Pack: ' + p.size}</p>
          {p.flavours.length > 0 && (
            <div className="chips">{p.flavours.map((f) => (
              <button key={f} className={'chip' + (f === flavour ? ' on' : '')} onClick={() => setFlavour(f)}>{f}</button>
            ))}</div>
          )}
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button>
            <b className="price">{formatPrice(p.price * qty, code)}</b>
          </div>
          <a className="btn" href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer">Order on WhatsApp</a>
        </div>
      </div>
    </div>
  )
}

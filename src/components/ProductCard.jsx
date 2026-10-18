import Tub from './Tub.jsx'
import { formatPrice, useCurrency } from '../currency.js'
export default function ProductCard({ p, onOpen }) {
  const { code } = useCurrency()
  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
  }
  const reset = (e) => (e.currentTarget.style.transform = '')
  return (
    <button className="card" onMouseMove={tilt} onMouseLeave={reset} onClick={() => onOpen(p)}>
      <Tub p={p} />
      <h3>{p.name}</h3>
      <p className="muted">{p.size}</p>
      <p className="price">{formatPrice(p.price, code)}</p>
    </button>
  )
}

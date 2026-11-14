import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { CONTACT } from '../config.js'
import { useCart } from '../cart.js'
import { formatPrice, productPrice, useCurrency } from '../currency.js'
import { products } from '../data/products.js'
import Tub from '../components/Tub.jsx'

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCart()
  const { code } = useCurrency()
  const [delivery, setDelivery] = useState({ name: '', phone: '', address: '' })
  const productById = new Map(products.map((product) => [product.id, product]))
  const cartItems = items
    .map((item) => ({ ...item, product: productById.get(item.productId) }))
    .filter((item) => item.product)
  const total = cartItems.reduce((sum, item) => sum + productPrice(item.product, code) * item.quantity, 0)

  const submitOrder = (event) => {
    event.preventDefault()
    const orderLines = cartItems.map(({ product, flavour, quantity }) => {
      const variant = [product.size, flavour].filter(Boolean).join(' · ')
      return `• ${product.name}${variant ? ` (${variant})` : ''} x ${quantity} — ${formatPrice(productPrice(product, code) * quantity, code)}`
    })
    const message = [
      'Hi Austenite, I would like to place an order:',
      ...orderLines,
      `Subtotal: ${formatPrice(total, code)}`,
      '',
      'Delivery details:',
      `Name: ${delivery.name.trim()}`,
      `Phone: ${delivery.phone.trim()}`,
      `Address: ${delivery.address.trim()}`,
      '',
      'Please confirm availability, delivery fee and payment details. I understand the order is not confirmed until you reply.'
    ].join('\n')
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  if (!cartItems.length) {
    return (
      <section className="sec cart-page">
        <p className="section-kicker">Your basket</p>
        <h1>Your cart is empty.</h1>
        <p className="muted">Find something for your next session and add it here.</p>
        <Link className="btn cart-shop-link" to="/shop">Browse products</Link>
      </section>
    )
  }

  return (
    <section className="sec cart-page">
      <p className="section-kicker">Your basket</p>
      <h1>Cart</h1>
      <div className="cart-layout">
        <div className="cart-products">
          {cartItems.map(({ product, flavour, quantity }) => (
            <article className="cart-item" key={`${product.id}-${flavour}`}>
              <div className="cart-item-art"><Tub p={{ ...product, img: product.flavourImg?.[flavour] || product.img }} /></div>
              <div className="cart-item-info">
                <h2>{product.name}</h2>
                <p className="muted">{[product.size, flavour].filter(Boolean).join(' · ')}</p>
                <strong className="price">{formatPrice(productPrice(product, code) * quantity, code)}</strong>
                <div className="cart-item-actions">
                  <div className="qty cart-qty" aria-label={`Quantity for ${product.name}`}>
                    <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.id, flavour, Math.max(1, quantity - 1))}><Minus size={15} /></button>
                    <span>{quantity}</span>
                    <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.id, flavour, quantity + 1)}><Plus size={15} /></button>
                  </div>
                  <button type="button" className="cart-remove" onClick={() => removeItem(product.id, flavour)}><Trash2 size={15} aria-hidden="true" /> Remove</button>
                </div>
              </div>
            </article>
          ))}
          <Link className="cart-continue" to="/shop">Continue shopping</Link>
        </div>

        <aside className="cart-checkout">
          <div className="cart-total">
            <span>Subtotal</span>
            <strong className="price">{formatPrice(total, code)}</strong>
          </div>
          <p className="muted cart-delivery-note">Delivery fee and payment details will be confirmed with you on WhatsApp.</p>
          <form className="cart-form" onSubmit={submitOrder}>
            <h2>Delivery details</h2>
            <label>
              Your name
              <input autoComplete="name" required value={delivery.name} onChange={(event) => setDelivery({ ...delivery, name: event.target.value })} />
            </label>
            <label>
              Phone number
              <input type="tel" autoComplete="tel" inputMode="tel" minLength="7" required value={delivery.phone} onChange={(event) => setDelivery({ ...delivery, phone: event.target.value })} />
            </label>
            <label>
              Delivery address
              <textarea autoComplete="street-address" rows="3" required value={delivery.address} onChange={(event) => setDelivery({ ...delivery, address: event.target.value })} />
            </label>
            <button type="submit" className="btn cart-submit"><ShoppingCart size={18} aria-hidden="true" /> Send order on WhatsApp</button>
            <p className="cart-confirm-note">Your order is only confirmed after our team replies.</p>
          </form>
        </aside>
      </div>
    </section>
  )
}

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'
import { products } from '../data/products.js'
import { formatPrice, productPrice, useCurrency } from '../currency.js'
import { useCart } from '../cart.js'
import Tub from './Tub.jsx'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart()
  const { code } = useCurrency()
  const navigate = useNavigate()
  const productById = new Map(products.map((product) => [product.id, product]))
  const cartItems = items.map((item) => ({ ...item, product: productById.get(item.productId) })).filter((item) => item.product)
  const total = cartItems.reduce((sum, item) => sum + productPrice(item.product, code) * item.quantity, 0)

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') closeCart() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [closeCart, isOpen])

  if (!isOpen) return null

  const goToCheckout = (event) => {
    event.preventDefault()
    closeCart()
    navigate('/cart')
  }

  return createPortal(
    <div
      className="drawer-overlay"
      role="presentation"
      onClick={closeCart}
    >
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-head">
          <div><p className="section-kicker">Your basket</p><h2>Cart <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div>
          <button
            type="button"
            className="drawer-close"
            onClick={() => closeCart()}
            aria-label="Close cart"
            title="Close cart"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <div className="drawer-empty"><ShoppingCart size={34} aria-hidden="true" /><h3>Your cart is empty</h3><p className="muted">Add something for your next session.</p><Link className="btn" to="/shop" onClick={() => closeCart()}>Browse products</Link></div>
        ) : (
          <>
            <div className="drawer-items">
              {cartItems.map(({ product, flavour, quantity }) => (
                <article className="drawer-item" key={`${product.id}-${flavour}`}>
                  <div className="drawer-item-art"><Tub p={{ ...product, img: product.flavourImg?.[flavour] || product.img }} /></div>
                  <div className="drawer-item-info">
                    <h3>{product.name}</h3>
                    <p className="muted">{[product.size, flavour].filter(Boolean).join(' · ')}</p>
                    <strong className="price">{formatPrice(productPrice(product, code) * quantity, code)}</strong>
                    <div className="drawer-item-actions">
                      <div className="qty" aria-label={`Quantity for ${product.name}`}>
                        <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.id, flavour, Math.max(1, quantity - 1))}><Minus size={14} /></button>
                        <span>{quantity}</span>
                        <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.id, flavour, quantity + 1)}><Plus size={14} /></button>
                      </div>
                      <button type="button" className="cart-remove" onClick={() => removeItem(product.id, flavour)}><Trash2 size={14} aria-hidden="true" /> Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="cart-total"><span>Subtotal</span><strong className="price">{formatPrice(total, code)}</strong></div>
              <p className="muted cart-delivery-note">Delivery fee and payment details will be confirmed on WhatsApp.</p>
              <Link className="btn drawer-checkout" to="/cart" onClick={goToCheckout}>View cart & checkout</Link>
            </div>
          </>
        )}
      </aside>
    </div>,
    document.body
  )
}
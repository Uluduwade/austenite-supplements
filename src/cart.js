import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'austenite-cart'

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved)
      ? saved.filter((item) => item && typeof item.productId === 'string' && typeof item.flavour === 'string' && Number.isInteger(item.quantity) && item.quantity > 0)
      : []
  } catch (error) {
    console.error('Could not read the saved cart.', error)
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((open) => !open), [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => ({
    items,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    count: items.reduce((total, item) => total + item.quantity, 0),
    addItem(productId, flavour, quantity) {
      setItems((current) => {
        const existing = current.find((item) => item.productId === productId && item.flavour === flavour)
        if (existing) {
          return current.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item)
        }
        return [...current, { productId, flavour, quantity }]
      })
    },
    updateQuantity(productId, flavour, quantity) {
      setItems((current) => current.map((item) => (
        item.productId === productId && item.flavour === flavour ? { ...item, quantity } : item
      )))
    },
    removeItem(productId, flavour) {
      setItems((current) => current.filter((item) => item.productId !== productId || item.flavour !== flavour))
    }
  }), [closeCart, isOpen, items, openCart, toggleCart])

  return createElement(CartContext.Provider, { value }, children)
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart must be used inside CartProvider')
  return cart
}

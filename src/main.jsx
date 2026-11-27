import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CURRENCIES, CurrencyContext } from './currency.js'
import { CartProvider } from './cart.js'
import './styles.css'

function CurrencyProvider({ children }) {
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem('currency')
    return CURRENCIES[saved] ? saved : 'GBP'
  })

  useEffect(() => {
    if (CURRENCIES[localStorage.getItem('currency')]) return undefined

    let cancelled = false
    const detectCurrency = async () => {
      try {
        const response = await fetch('/api/region')
        if (!response.ok) throw new Error(`Region lookup failed with status ${response.status}`)
        const { country } = await response.json()
        if (!cancelled && !CURRENCIES[localStorage.getItem('currency')] && country === 'LK') {
          setCode('LKR')
        }
      } catch (error) {
        console.warn('Could not detect visitor region; keeping GBP as the default currency.', error)
      }
    }

    detectCurrency()
    return () => { cancelled = true }
  }, [])

  const value = useMemo(() => ({
    code,
    currency: CURRENCIES[code],
    setCurrency: (nextCode) => {
      if (!CURRENCIES[nextCode]) return
      setCode(nextCode)
      localStorage.setItem('currency', nextCode)
    }
  }), [code])
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter><CurrencyProvider><CartProvider><App /></CartProvider></CurrencyProvider></BrowserRouter>
)

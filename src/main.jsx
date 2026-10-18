import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CURRENCIES, CurrencyContext } from './currency.js'
import './styles.css'

function CurrencyProvider({ children }) {
  const [code, setCode] = useState(() => localStorage.getItem('currency') || 'GBP')
  const value = useMemo(() => ({
    code,
    currency: CURRENCIES[code],
    setCurrency: (nextCode) => {
      setCode(nextCode)
      localStorage.setItem('currency', nextCode)
    }
  }), [code])
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter><CurrencyProvider><App /></CurrencyProvider></BrowserRouter>
)

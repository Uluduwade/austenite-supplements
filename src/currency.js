import { createContext, useContext } from 'react'

export const CURRENCIES = {
  GBP: { code: 'GBP', label: 'GBP', flag: '/flags/gb.png', rateFromLkr: 1 / 400 },
  LKR: { code: 'LKR', label: 'LKR', flag: '/flags/lk.png', rateFromLkr: 1 }
}

export const CurrencyContext = createContext(null)

export function useCurrency() {
  const currency = useContext(CurrencyContext)
  if (!currency) throw new Error('useCurrency must be used inside CurrencyContext.Provider')
  return currency
}

// A product's price in the chosen currency. `price` is the LKR price and `gbp` is the GBP price;
// a product without its own `gbp` falls back to converting the LKR price at the fixed rate.
export function productPrice(p, currencyCode) {
  if (currencyCode === 'LKR') return p.price
  return p.gbp ?? p.price * CURRENCIES.GBP.rateFromLkr
}

// `amount` is already in the currency's own units (see productPrice)
export function formatPrice(amount, currencyCode) {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.GBP
  if (currency.code === 'LKR') return `${currency.code} ${Math.round(amount).toLocaleString('en-LK')}`
  return `${currency.code} ${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

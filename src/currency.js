import { createContext, useContext } from 'react'

export const CURRENCIES = {
  GBP: { code: 'GBP', label: 'GBP', emoji: '🇬🇧', rateFromLkr: 1 / 400 },
  LKR: { code: 'LKR', label: 'LKR', emoji: '🇱🇰', rateFromLkr: 1 }
}

export const CurrencyContext = createContext(null)

export function useCurrency() {
  const currency = useContext(CurrencyContext)
  if (!currency) throw new Error('useCurrency must be used inside CurrencyContext.Provider')
  return currency
}

export function formatPrice(amountLkr, currencyCode) {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.GBP
  const amount = amountLkr * currency.rateFromLkr
  if (currency.code === 'LKR') return `${currency.emoji} ${Math.round(amount).toLocaleString('en-LK')}`
  return `${currency.emoji} ${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

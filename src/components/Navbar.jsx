import { useEffect, useRef, useState } from 'react'
import { Search, ArrowRight, ChevronDown } from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { CURRENCIES, useCurrency } from '../currency.js'
import logo from '../public/logo.png'
const links = [['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About'], ['/contact', 'Contact us']]

// Custom dropdown, because a native <select> can't show flag images
function CurrencySwitcher() {
  const { code, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const away = (e) => { if (!box.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc) }
  }, [open])
  const cur = CURRENCIES[code] || CURRENCIES.GBP
  return (
    <div className="currency-switcher" ref={box}>
      <button type="button" className="currency-btn" aria-haspopup="listbox" aria-expanded={open} aria-label={'Currency: ' + cur.code} onClick={() => setOpen(!open)}>
        <img src={cur.flag} alt="" width="22" height="11" />
        <span>{cur.code}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <ul className="currency-menu" role="listbox" aria-label="Currency">
          {Object.values(CURRENCIES).map((c) => (
            <li key={c.code} role="option" aria-selected={c.code === code}>
              <button type="button" className={c.code === code ? 'on' : ''} onClick={() => { setCurrency(c.code); setOpen(false) }}>
                <img src={c.flag} alt="" width="22" height="11" />
                <span>{c.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const submit = (e) => {
    e.preventDefault()
    const t = q.trim()
    navigate(t ? '/shop?q=' + encodeURIComponent(t) : '/shop')
    setOpen(false)
  }
  return (
    <>
      
      <header className="nav">
        <Link to="/" className="logo" onClick={() => setOpen(false)} aria-label="Austenite Supplements home">
          <img className="logo-image" src={logo} alt="Austenite Supplements" />
        </Link>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? 'Close' : 'Menu'}</button>
        <nav className={open ? 'open' : ''}>
          {links.map(([to, t]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{t}</NavLink>
          ))}
          <form className="nav-search" role="search" onSubmit={submit}>
            <Search className="nav-search-icon" size={16} aria-hidden="true" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" />
            <button type="submit" className="nav-search-btn" aria-label="Search"><ArrowRight size={16} aria-hidden="true" /></button>
          </form>
          <CurrencySwitcher />
        </nav>
      </header>
    </>
  )
}

import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useCurrency } from '../currency.js'
import logo from '../public/logo.png'
const links = [['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About'], ['/contact', 'Contact us']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const { code, setCurrency } = useCurrency()
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
          <label className="currency-switcher">
            <span className="sr-only">Currency</span>
            <select value={code} onChange={(e) => setCurrency(e.target.value)} aria-label="Currency">
              <option value="GBP">🇬🇧 </option>
              <option value="LKR">🇱🇰 </option>
            </select>
          </label>
        </nav>
      </header>
    </>
  )
}

import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCurrency } from '../currency.js'
import logo from '../public/logo.png'
const links = [['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About us'], ['/search', 'Search'], ['/contact', 'Contact us']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { code, setCurrency } = useCurrency()
  return (
    <>
      <div className="promo">100% original UK imported Applied Nutrition. Order on WhatsApp.</div>
      <header className="nav">
        <Link to="/" className="logo" onClick={() => setOpen(false)} aria-label="Austenite Supplements home">
          <img className="logo-image" src={logo} alt="Austenite Supplements" />
        </Link>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? 'Close' : 'Menu'}</button>
        <nav className={open ? 'open' : ''}>
          {links.map(([to, t]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{t}</NavLink>
          ))}
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

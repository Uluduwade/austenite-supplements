import { Link } from 'react-router-dom'
import { Camera, Mail, Music2 } from 'lucide-react'
import { CONTACT } from '../config.js'
import logo from '../public/logo.png'
export default function Footer() {
  return (
    <footer className="foot">
      <div>
        <Link to="/" className="logo" aria-label="Austenite Supplements home">
          <img className="logo-image" src={logo} alt="Austenite Supplements" />
        </Link>
        <p>Original UK imported Applied Nutrition, delivered in Sri Lanka.</p>
      </div>
      <div className="fl"><Link to="/shop">Shop</Link><Link to="/about">About us</Link><Link to="/contact">Contact us</Link></div>
      <div className="fl foot-socials">
        <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={19} aria-hidden="true" /><span>Instagram</span></a>
        <a href={CONTACT.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={19} aria-hidden="true" /><span>TikTok</span></a>
        <a href={'mailto:' + CONTACT.email} aria-label={'Email ' + CONTACT.email}><Mail size={19} aria-hidden="true" /><span>{CONTACT.email}</span></a>
      </div>
    </footer>
  )
}

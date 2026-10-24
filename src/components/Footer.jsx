import { Link } from 'react-router-dom'
import { EmailIcon, InstagramIcon, TikTokIcon } from './SocialIcons.jsx'
import { CONTACT } from '../config.js'
import logo from '../public/logo-footer.png'
export default function Footer() {
  return (
    <footer className="foot">
      <div>
        <Link to="/" className="logo" aria-label="Austenite Supplements home">
          <img className="logo-image" src={logo} alt="Austenite Supplements" />
        </Link>
        {/* <p>Original UK Applied Nutrition Products</p> */}
      </div>
      <div className="fl"><Link to="/shop">Shop</Link><Link to="/about">About</Link><Link to="/contact">Contact us</Link><Link to="/privacy">Privacy Policy</Link></div>
      <div className="fl foot-socials">
        <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={19} /><span>Instagram</span></a>
        <a href={CONTACT.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon size={19} /><span>TikTok</span></a>
        <a href={'mailto:' + CONTACT.email} aria-label={'Email ' + CONTACT.email}><EmailIcon size={19} /><span>{CONTACT.email}</span></a>
      </div>
    </footer>
  )
}

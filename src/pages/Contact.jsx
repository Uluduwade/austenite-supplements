import { useState } from 'react'
import { ArrowUpRight, Clock3, MessageCircle, Phone, Send, ShieldCheck, Truck } from 'lucide-react'
import { EmailIcon, InstagramIcon, TikTokIcon } from '../components/SocialIcons.jsx'
import { CONTACT } from '../config.js'
import './contact.css'

export default function Contact() {
  const [f, setF] = useState({ name: '', message: '' })
  const send = (e) => {
    e.preventDefault()
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Enquiry from ' + f.name)}&body=${encodeURIComponent(f.message)}`
  }
  const channels = [
    { icon: MessageCircle, label: 'WhatsApp', value: CONTACT.phone, href: 'https://wa.me/' + CONTACT.whatsapp, note: 'Fastest way to order', featured: true },
    { icon: Phone, label: 'Call ' + CONTACT.person, value: CONTACT.phone, href: 'tel:' + CONTACT.phone.replace(/\s/g, ''), note: 'Speak with our team' },
    { icon: EmailIcon, label: 'Email', value: CONTACT.email, href: 'mailto:' + CONTACT.email, note: 'For detailed enquiries' },
    { icon: InstagramIcon, label: 'Instagram', value: (CONTACT.instagramHandle || '@ganithmalage'), href: CONTACT.instagram, note: 'Follow the latest drops' },
    { icon: TikTokIcon, label: 'TikTok', value: (CONTACT.tiktokHandle || '@ganith_malage'), href: CONTACT.tiktok, note: 'See us in action' },
  ]
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-in">
          <div>
            <p className="tag light">Customer care</p>
            <h1>Let&apos;s talk supplements.</h1>
            <p className="lead">Need help choosing a flavour, checking stock or arranging delivery? {CONTACT.person} and the team are ready to help.</p>
            <div className="contact-pills">
              <span><Clock3 size={16} /> Replies within 24 hours</span>
              <span><ShieldCheck size={16} /> 100% original UK stock</span>
              <span><Truck size={16} /> Island-wide delivery</span>
            </div>
          </div>
          <MessageCircle className="contact-mark" size={150} strokeWidth={1} aria-hidden="true" />
        </div>
      </section>

      <section className="contact-layout">
        <div>
          <p className="kicker">Choose your channel</p>
          <div className="contact-cards">
            {channels.map(({ icon: Icon, label, value, href, note, featured }) => {
              const ext = href.startsWith('http')
              return (
                <a key={label} href={href} className={'contact-card' + (featured ? ' featured' : '')} target={ext ? '_blank' : undefined} rel={ext ? 'noreferrer' : undefined}>
                  <span className="contact-icon"><Icon size={22} /></span>
                  <span className="contact-text"><strong>{label}</strong><small>{value}</small><em>{note}</em></span>
                  <ArrowUpRight size={18} className="contact-arrow" />
                </a>
              )
            })}
          </div>
        </div>

        <form onSubmit={send} className="contact-form">
          <p className="kicker">Send an enquiry</p>
          <h2>Tell us what you need.</h2>
          <p className="muted">We&apos;ll reply with a clear answer and the right recommendation.</p>
          <label>Your name<input required placeholder="e.g. Alex Jones" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
          <label>Your message<textarea required rows="5" placeholder="Ask about products, flavours or delivery..." value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></label>
          <button className="btn" type="submit"><Send size={17} /> Send email</button>
        </form>
      </section>
    </div>
  )
}
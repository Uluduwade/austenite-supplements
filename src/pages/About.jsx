import { Link } from 'react-router-dom'
import { ShieldCheck, BadgeCheck, Handshake, Hexagon, FlaskConical, ScanSearch, Award } from 'lucide-react'
import ProductGrid from '../components/ProductGrid.jsx'
import { products } from '../data/products.js'

const pillars = [
  [ShieldCheck, 'Quality assurance', 'Every product is checked and sourced with quality first.'],
  [BadgeCheck, 'Product authenticity', '100% genuine Applied Nutrition. Never relabelled, never second-hand.'],
  [Handshake, 'Customer trust', 'A destination where you never have to second-guess what you put into your body.'],
]
const brand = [
  [FlaskConical, 'Clinical testing'],
  [ScanSearch, 'Batch verification'],
  [Award, 'Exceptional quality control'],
]

export default function About() {
  return (
    <>
      <section className="about-hero">
        <p className="tag">Our story</p>
        <h1>About Austenite Supplements</h1>
        <p className="about-quote">“Train Harder Recover Faster”</p>
      </section>

      <section className="sec about-intro">
        <div className="about-copy">
          <p className="section-kicker">Who we are</p>
          <p className="lead">Founded by <b>Ganith Kavinda Malage</b>, Austenite Supplements was established with a clear mission: to give athletes, fitness enthusiasts and health driven individuals direct access to 100% authentic, world-class sports nutrition.</p>
          <p>We specialize exclusively in stocking and retailing genuine products from <b>Applied Nutrition</b>, one of the globally recognized leaders in performance and health supplementation.</p>
        </div>
        <aside className="about-name">
          <Hexagon className="about-name-icon" size={44} aria-hidden="true" />
          <h3>Why “Austenite”?</h3>
          <p>Named after austenite, the resilient, high-strength crystalline structure that gives advanced steel its toughness. Our store is dedicated to fuelling individuals who demand peak output and durability.</p>
        </aside>
      </section>

      <section className="sec">
        <p className="section-kicker">Our story &amp; purpose</p>
        <h2>Built for trust</h2>
        <p className="about-story">Austenite Supplements recognized the need for a retail brand focused entirely on quality assurance, product authenticity and customer trust. In an industry flooded with uncertainties, Austenite serves as a trusted destination where you never have to second-guess what you are putting into your body.</p>
        <div className="perks">
          {pillars.map(([Icon, t, d]) => (
            <div key={t} className="perk"><Icon size={28} aria-hidden="true" /><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="about-brand">
        <div>
          <p className="section-kicker">Why only Applied Nutrition</p>
          <h2>One brand. Done properly.</h2>
          <p>By focusing strictly on Applied Nutrition, we ensure that every protein tub, pre-workout tub and daily vitamin complex in our inventory comes directly from a brand renowned for clinical testing, batch verification and exceptional quality control.</p>
        </div>
        <ul className="about-brand-list">
          {brand.map(([Icon, t]) => <li key={t}><Icon size={24} aria-hidden="true" />{t}</li>)}
        </ul>
      </section>

      <section className="sec">
        <p className="section-kicker">Official collection</p>
        <h2>The Official Applied Nutrition Collection at Austenite</h2>
        <ProductGrid items={products} />
        <div className="row about-cta">
          <Link className="btn" to="/shop">Shop the collection</Link>
          <Link className="btn ghost" to="/contact">Talk to us</Link>
        </div>
      </section>
    </>
  )
}

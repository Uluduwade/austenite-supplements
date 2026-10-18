import { Link } from 'react-router-dom'
export default function About() {
  return (
    <section className="sec narrow">
      <h1>About Austenite</h1>
      <p className="lead">Austenite Supplements brings genuine Applied Nutrition products from the UK to athletes and everyday lifters in Sri Lanka.</p>
      <p>Counterfeit supplements are a real problem. We import directly so what is on the label is what is in the tub, from whey and creatine to wellness staples like Omega 3, Shilajit and collagen.</p>
      <div className="trio">
        <div><h3>Original only</h3><p>UK imported, sealed and authentic.</p></div>
        <div><h3>Honest pricing</h3><p>Clear prices with a simple currency switcher, no surprises at checkout.</p></div>
        <div><h3>Real people</h3><p>Message us and a person replies, not a bot.</p></div>
      </div>
      <Link className="btn" to="/contact">Talk to us</Link>
    </section>
  )
}

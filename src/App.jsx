import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import GhostCursor from './components/GhostCursor.jsx'
import PatternWaves from './components/PatternWaves.jsx'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    return undefined
  }, [pathname])
  return (
    <>
      <PatternWaves
        preset="silk"
        pattern="line"
        wave="silk"
        color="#667085"
        backgroundColor="#eef1f4"
        spacing={13}
        markSize={0.42}
        depth={0.8}
        shine={0.8}
        contrast={1.15}
        speed={0.24}
        scale={1.05}
        direction={20}
        opacity={0.42}
        fade="edges"
        fadeSize={0.35}
        interactive
        className="pattern-waves-background"
      />
      <GhostCursor
        color="#111111"
        theme="light"
        size={58}
        trailLength={38}
        turbulence={0.35}
        detail={0.65}
        targetPixels={260000}
        zIndex={30}
      />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

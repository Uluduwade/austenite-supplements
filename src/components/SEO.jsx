import { useEffect } from 'react'

const SITE_URL = 'https://austenitesupplements.uk'

const pageMeta = {
  '/': {
    title: 'Austenite Supplements | Authentic UK Sports Nutrition',
    description: 'Shop authentic Applied Nutrition supplements in the UK and Sri Lanka, including protein, creatine, pre-workout, vitamins and wellness products.',
  },
  '/shop': {
    title: 'Shop Supplements | Austenite Supplements',
    description: 'Browse authentic Applied Nutrition protein, creatine, pre-workout, vitamins and wellness supplements from Austenite Supplements.',
  },
  '/about': {
    title: 'About Austenite Supplements | Authentic Applied Nutrition',
    description: 'Learn how Austenite Supplements makes genuine Applied Nutrition sports nutrition easier to access for athletes and health-conscious customers.',
  },
  '/contact': {
    title: 'Contact Austenite Supplements',
    description: 'Contact Austenite Supplements for product advice, flavour availability, stock questions and delivery information.',
  },
  '/privacy': {
    title: 'Privacy Policy | Austenite Supplements',
    description: 'Read the Austenite Supplements privacy policy and learn how enquiries and order information are handled.',
  },
  '/cart': {
    title: 'Your Cart | Austenite Supplements',
    description: 'Review your Austenite Supplements order before sending your delivery details on WhatsApp.',
    noindex: true,
  },
}

function setMeta(name, content) {
  let tag = document.head.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setProperty(property, content) {
  let tag = document.head.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.content = content
}

export default function SEO({ pathname, products = [] }) {
  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
    const meta = pageMeta[path] || pageMeta['/']
    const canonical = SITE_URL + (path === '/' ? '/' : path)

    document.title = meta.title
    setMeta('description', meta.description)
    setMeta('robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
    setProperty('og:title', meta.title)
    setProperty('og:description', meta.description)
    setProperty('og:type', 'website')
    setProperty('og:url', canonical)
    setProperty('og:site_name', 'Austenite Supplements')
    setProperty('twitter:card', 'summary')

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    const existing = document.getElementById('seo-jsonld')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.id = 'seo-jsonld'
    script.type = 'application/ld+json'
    const structuredData = path === '/shop' && products.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: meta.title,
      description: meta.description,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          url: `${SITE_URL}/shop#${product.id}`,
        })),
      },
    } : {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Austenite Supplements',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        'https://www.instagram.com/ganithmalage/',
        'https://www.tiktok.com/@ganith_malage',
      ],
    }
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }, [pathname, products])

  return null
}

export { SITE_URL }

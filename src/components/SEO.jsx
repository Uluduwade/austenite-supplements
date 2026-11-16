import { useEffect } from 'react'

const SITE_URL = 'https://austenitesupplements.uk'

const pageMeta = {
  '/': {
    title: 'Austenite Supplements | Applied Nutrition Sri Lanka',
    description: 'Shop authentic UK-imported Applied Nutrition supplements in Sri Lanka from Austenite Supplements, including creatine, protein, pre-workout, vitamins and wellness products.',
  },
  '/shop': {
    title: 'Shop Applied Nutrition Supplements | Austenite Sri Lanka',
    description: 'Browse authentic Applied Nutrition creatine, protein, pre-workout, vitamins and wellness supplements, imported from the UK and available through Austenite Supplements in Sri Lanka.',
  },
  '/about': {
    title: 'About Austenite Supplements | Applied Nutrition Sri Lanka',
    description: 'Learn how Austenite Supplements provides genuine UK-imported Applied Nutrition sports nutrition to athletes and health-conscious customers in Sri Lanka.',
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
    const productItems = products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        '@id': `${SITE_URL}/shop#${product.id}`,
        name: product.name,
        image: [`${SITE_URL}${product.img}`],
        description: product.desc,
        category: product.cat,
        brand: { '@type': 'Brand', name: 'Applied Nutrition' },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/shop#${product.id}`,
          priceCurrency: 'GBP',
          price: String(product.gbp ?? product.price / 400),
          availability: `https://schema.org/${product.outOfStock ? 'OutOfStock' : product.soon ? 'PreOrder' : 'InStock'}`,
        },
      },
    }))
    const structuredData = products.length > 0 ? {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: meta.title,
          description: meta.description,
          url: canonical,
          mainEntity: { '@id': `${SITE_URL}/shop#product-list` },
        },
        {
          '@type': 'ItemList',
          '@id': `${SITE_URL}/shop#product-list`,
          itemListElement: productItems,
        },
      ],
    } : {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Austenite Supplements',
          alternateName: 'Austenite Applied Nutrition Sri Lanka',
          url: SITE_URL,
          logo: `${SITE_URL}/logo.jpeg`,
          description: 'Supplier of authentic UK-imported Applied Nutrition supplements in Sri Lanka.',
          areaServed: [
            { '@type': 'Country', name: 'Sri Lanka' },
            { '@type': 'Country', name: 'United Kingdom' },
          ],
          sameAs: [
            'https://www.instagram.com/ganithmalage/',
            'https://www.tiktok.com/@ganith_malage',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'Austenite Supplements',
          url: SITE_URL,
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
      ],
    }
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }, [pathname, products])

  return null
}

export { SITE_URL }

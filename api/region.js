export default function handler(request, response) {
  const country = request.headers['x-vercel-ip-country']
  response.setHeader('Cache-Control', 'no-store')
  response.status(200).json({
    country: typeof country === 'string' && /^[A-Z]{2}$/.test(country) ? country : null
  })
}

// Placeholder product art, replaced by a real photo when product.img is set.
const tone = { Protein: 0, Performance: 1, Wellness: 2, 'Fat Burners': 3 }
export default function Tub({ p, big }) {
  if (p.img) return <img className={'pimg' + (big ? ' big' : '')} src={p.img} alt={p.name} loading={big ? 'eager' : 'lazy'} />
  return (
    <div className={'tub t' + tone[p.cat] + (big ? ' big' : '')}>
      <div className="lid" />
      <div className="body"><small>APPLIED NUTRITION</small><b>{p.name}</b><i /><small>{p.size}</small></div>
    </div>
  )
}

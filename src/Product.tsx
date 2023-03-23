import { Link, useLocation } from 'react-router-dom'
import formatCurrency from './helpers/currencyHelper'
import ProductActions from './ProductActions'

const Product = () => {
  const location = useLocation()
  const { image, product } = location.state

  return (
    <div className='z-10'>
      <Link to='/products'>Back to Products</Link>
      <div
        className='mt-6 flex items-center rounded-lg bg-white/50 p-4 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-3xl transition-all hover:bg-white/75'
        key={product.id}
      >
        <img className='mr-6 max-w-xs rounded-md border object-cover' src={image?.link.href}></img>
        <div>
          <div className='flex flex-col gap-3 pb-3'>
            <p className='text-xl font-semibold'>{product.attributes.name}</p>
            <p>{product.attributes.description}</p>
            <p className='font-semibold'>
              Price:
              <span className='text-red-800'>
                {` ${formatCurrency(product.attributes.price.USD.amount)}`}
              </span>
            </p>
          </div>
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  )
}

export default Product

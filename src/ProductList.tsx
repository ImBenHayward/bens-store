import { ProductResponse, ShopperCatalogResourcePage } from '@moltin/sdk'
import { Link } from 'react-router-dom'
import formatCurrency from './helpers/currencyHelper'

interface IProps {
  resourcePage: ShopperCatalogResourcePage<ProductResponse>
}

const ProductList = (props: IProps) => {
  const { resourcePage } = props

  console.log('RPx', resourcePage)

  return (
    <div>
      <h2 className='mb-6 font-sans text-3xl font-semibold'>Product List:</h2>
      <div className='grid grid-cols-3 gap-4'>
        {resourcePage.data.map((product) => {
          const image = resourcePage.included?.main_images?.find(
            (x) => x.id === product.relationships.main_image?.data?.id,
          )

          return (
            <Link
              to={`/product/${product.id}`}
              state={{ image: image, product: product }}
              className='rounded-lg bg-white/50 p-4 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-3xl transition-all hover:bg-white/75'
              key={product.id}
            >
              <img
                className='mb-6 rounded-md object-cover ring-1 ring-black ring-opacity-5'
                src={image?.link.href}
              ></img>
              <div className='flex flex-col gap-3 pb-3'>
                <p className='text-lg font-semibold'>{product.attributes.name}</p>
                <p className='font-light'>
                  {product.attributes.description.length > 250
                    ? `${product.attributes.description.substring(0, 250)}...`
                    : product.attributes.description}
                </p>
                <p className='font-semibold'>
                  Price:
                  <span className='text-red-800'>
                    {` ${formatCurrency(product.attributes.price.USD.amount)}`}
                  </span>
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList

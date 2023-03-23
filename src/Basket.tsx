import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BasketContext } from './App'

const Basket = () => {
  const { basket } = useContext(BasketContext)

  return (
    <div>
      <h2 className='mb-6 font-sans text-3xl font-semibold'>Shopping Basket</h2>
      <div className='mt-6 flex flex-col justify-start rounded-lg bg-white/50 px-4 py-8 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-3xl transition-all hover:bg-white/75'>
        {basket === null ? (
          <span>Basket is empty</span>
        ) : (
          basket.data.map((item) => (
            <div key={item.id}>
              <div className='flex items-center'>
                <img
                  className='mr-6 max-w-[10rem] rounded-md border object-cover'
                  src={item.image.href}
                ></img>
                <div className='ml-4 flex flex-col gap-2'>
                  <p className='font-medium text-gray-900'>{item.name}</p>
                  <p className=' text-gray-500'>
                    {item.meta.display_price.with_tax.value.formatted}
                  </p>
                  <p className=' text-gray-500'>Quantity: {item.quantity}</p>
                </div>
              </div>
              <hr className='my-8 h-px border-0 bg-gray-200 dark:bg-gray-700'></hr>
            </div>
          ))
        )}
        <div className='flex items-center justify-between'>
          <Link
            to='/checkout/address-details'
            className='mt-2 flex flex-grow-0 rounded border bg-yellow-400 px-4 py-2 transition-all hover:bg-yellow-500'
          >
            Proceed to Checkout
          </Link>
          <span>
            <span className='font-medium'>Subtotal: </span>
            {basket?.meta.display_price.with_tax.formatted}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Basket

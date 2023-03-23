import { ProductResponse } from '@moltin/sdk'
import { useContext, useState } from 'react'
import { BasketContext } from './App'
import gateway from './epccGateway'

interface IProps {
  product: ProductResponse
}

const ProductActions = (props: IProps) => {
  const { product } = props
  const [quantity, setQuantity] = useState(0)
  const { setBasket, setAlert, setnewAlertStatusStatus } = useContext(BasketContext)

  const increment = () => {
    setQuantity(quantity + 1)
  }

  const decrement = () => {
    if (quantity === 0) {
      return
    }
    setQuantity(quantity - 1)
  }

  return (
    <div>
      {/* turn this into a component */}
      <div className='custom-number-input w-24'>
        <div className='relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent'>
          <button
            data-action='decrement'
            className='h-full w-16 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700'
            onClick={decrement}
          >
            <span className='m-auto text-2xl font-thin'>−</span>
          </button>
          <span className='text-md md:text-basecursor-default flex w-full items-center justify-center bg-gray-300 text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none'>
            {quantity}
          </span>
          <button
            data-action='increment'
            className='h-full w-16 cursor-pointer rounded-r bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700'
            onClick={increment}
          >
            <span className='m-auto text-2xl font-thin'>+</span>
          </button>
        </div>
      </div>
      <button
        onClick={addToBasket}
        className='mt-2 flex flex-grow-0 rounded border bg-green-400 px-4 py-2 transition-all hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400'
        disabled={quantity === 0}
      >
        Add To Basket
      </button>
    </div>
  )

  async function addToBasket() {
    gateway
      .Cart()
      .AddProduct(product.id, quantity, false)
      .then((res) => {
        setBasket(res)
        setQuantity(0)

        const alert = {
          show: true,
          message: product.attributes.name,
          subMessage: 'Was added to the basket',
        }

        setAlert(alert)
        setnewAlertStatusStatus(true)
      })
  }
}

export default ProductActions

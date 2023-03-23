import { Address, Order, PaymentRequestBody, Resource } from '@moltin/sdk'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BasketContext } from './App'
import gateway from './epccGateway'

const AddressDetails = () => {
  const defaultBilling: Partial<Address> = {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '1234 Disney Drive',
    line_2: 'Disney Resort',
    city: 'Anaheim',
    county: 'Orange',
    region: 'CA',
    postcode: '92802',
    country: 'US',
  }

  const customer = {
    email: 'john@moltin.com',
    name: 'John Doe',
  }

  const payment: PaymentRequestBody = {
    gateway: 'manual',
    method: 'authorize',
    paymentmethod_meta: {
      name: 'payment method name',
      custom_reference: 'custom reference',
    },
  }

  const { state } = useLocation()
  const { setBasket, setAlert, setnewAlertStatusStatus } = useContext(BasketContext)
  const [order, setOrder] = useState<Resource<Order> | null>(null)
  const [billing, setBilling] = useState<Partial<Address>>(defaultBilling)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBilling((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  if (state) {
    useEffect(() => {
      setBilling(state.billing)
    }, [state.billing])
  }

  return (
    <div>
      <form className='w-full'>
        <div className='-mx-3 mb-6 flex flex-wrap'>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
            <label
              className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
              htmlFor='grid-first-name'
            >
              First Name
            </label>
            <input
              className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none'
              id='grid-first-name'
              type='text'
              name='first_name'
              value={billing?.first_name}
              onChange={handleChange}
            />
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label
              className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
              htmlFor='grid-last-name'
            >
              Last Name
            </label>
            <input
              className='block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
              id='grid-last-name'
              type='text'
              name='last_name'
              value={billing?.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='-mx-3 mb-6 flex flex-wrap'>
          <div className='w-full px-3'>
            <label
              className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
              htmlFor='grid-line-1'
            >
              Address Line 1
            </label>
            <input
              className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
              id='grid-line-1'
              type='text'
              name='line_1'
              value={billing?.line_1}
              onChange={handleChange}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
              htmlFor='grid-line-2'
            >
              Address Line 2
            </label>
            <input
              className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
              id='grid-line-2'
              type='text'
              name='line_2'
              value={billing?.line_2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='-mx-3 mb-2 flex flex-wrap'>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/3'>
            <label
              className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
              htmlFor='grid-city'
            >
              City
            </label>
            <input
              className='block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
              id='grid-city'
              type='text'
              name='city'
              value={billing?.city}
              onChange={handleChange}
            />
          </div>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/3'>
            <label
              className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
              htmlFor='grid-state'
            >
              City
            </label>
            <input
              className='block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
              id='grid-state'
              type='text'
              name='county'
              value={billing?.county}
              onChange={handleChange}
            />
          </div>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/3'>
            <label
              className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700'
              htmlFor='grid-zip'
            >
              Zip
            </label>
            <input
              className='block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
              id='grid-zip'
              type='text'
              name='postcode'
              value={billing?.postcode}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <div className='mt-6 flex items-center gap-4'>
        <button
          className='mt-2 flex flex-grow-0 rounded border border-yellow-400 bg-transparent px-4 py-2 transition-all hover:bg-yellow-500'
          onClick={() => navigate('/basket')}
        >
          Go Back
        </button>
        <button
          className='mt-2 flex flex-grow-0 rounded border bg-yellow-400 px-4 py-2 transition-all hover:bg-yellow-500'
          onClick={checkout}
        >
          Complete Order
        </button>
      </div>
    </div>
  )

  function checkout() {
    if (!billing) {
      console.log('Error, billing details are required')
      return
    }

    gateway
      .Cart()
      .Checkout(customer, billing)
      .then((order) => {
        setOrder(order)

        gateway.Orders.Payment(order.data.id, payment).then(() => {
          gateway
            .Cart()
            .RemoveAllItems()
            .then(() => {
              gateway
                .Cart()
                .Items()
                .then((res) => {
                  setBasket(res)
                })
                .then(() => {
                  const alert = {
                    show: true,
                    message: 'Order was placed successfully!',
                    subMessage: 'Thank you for shopping with Bens Golf',
                  }
                  navigate('/products')
                  setAlert(alert)
                  setnewAlertStatusStatus(true)
                })
            })
        })
      })
  }
}

export default AddressDetails

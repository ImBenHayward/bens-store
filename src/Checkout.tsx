import { Outlet } from 'react-router-dom'

const Checkout = () => {
  return (
    <div className='mx-auto flex max-w-xl flex-col'>
      <h2 className='mb-6 font-sans text-3xl font-semibold'>Checkout</h2>
      <div className='mt-6 flex flex-col justify-start rounded-lg bg-white/50 px-4 py-8 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-3xl transition-all hover:bg-white/75'>
        <Outlet />
      </div>
    </div>
  )
}

export default Checkout

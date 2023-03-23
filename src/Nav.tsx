import { Link } from 'react-router-dom'
import BasketPopover from './BasketPopover'

const Nav = () => {
  return (
    <div className='relative mb-6 flex w-full justify-between bg-white/50 py-6 px-12'>
      <div>
        <span className='font-bold'>BENS</span>
        Golf
      </div>
      <div className='flex gap-8'>
        <div className='flex gap-4'>
          <Link to='/'>Home</Link>
          <Link to='products'>Products</Link>
          <Link to='basket'>Basket</Link>
        </div>
      </div>
    </div>
  )
}

export default Nav

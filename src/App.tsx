import { Outlet } from 'react-router-dom'
import { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react'
import Nav from './Nav'
import { CartItemsResponse } from '@moltin/sdk'
import gateway from './epccGateway'
import Alert from './Alert'

interface AlertInterface {
  show: boolean
  message: string
  subMessage: string
}

interface BasketContextInterface {
  basket: CartItemsResponse | null
  setBasket: Dispatch<SetStateAction<CartItemsResponse | null>>
  alert: AlertInterface | null
  setAlert: Dispatch<SetStateAction<AlertInterface | null>>
  newAlertStatus: boolean | null
  setnewAlertStatusStatus: Dispatch<SetStateAction<boolean | null>>
}

export const basketContextDefaultValue: BasketContextInterface = {
  basket: null,
  setBasket: () => null,
  alert: null,
  setAlert: () => null,
  newAlertStatus: false,
  setnewAlertStatusStatus: () => false,
}

export const BasketContext = createContext<BasketContextInterface>(basketContextDefaultValue)

function App() {
  const [basket, setBasket] = useState<CartItemsResponse | null>(null)
  const [alert, setAlert] = useState<AlertInterface | null>(null)
  const [newAlertStatus, setnewAlertStatusStatus] = useState<boolean | null>(null)

  useEffect(() => {
    gateway
      .Cart()
      .Items()
      .then((res) => {
        setBasket(res)
      })
  }, [setBasket])

  return (
    <div>
      <BasketContext.Provider
        value={{
          basket: basket,
          setBasket: setBasket,
          alert: alert,
          setAlert: setAlert,
          newAlertStatus: newAlertStatus,
          setnewAlertStatusStatus: setnewAlertStatusStatus,
        }}
      >
        <div className='flex justify-center'>
          <Alert />
        </div>
        <Nav></Nav>
        <div className='m-20 flex max-h-max flex-col'>
          <Outlet />
        </div>
      </BasketContext.Provider>
    </div>
  )
}

export default App

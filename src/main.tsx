import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddressDetails from './AddressDetails'
import App from './App'
import Basket from './Basket'
import Checkout from './Checkout'
import Product from './Product'
import ProductsView from './ProductsView'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'products',
        element: <ProductsView />,
      },
      {
        path: 'product/:id',
        element: <Product />,
      },
      {
        path: '/basket',
        element: <Basket />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
        children: [
          {
            path: '/checkout/address-details',
            element: <AddressDetails />,
          },
          // {
          //   path: '/checkout/payment-details',
          //   element: <PaymentDetails />,
          // },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

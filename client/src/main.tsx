import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  Route, RouterProvider, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home'
import Logins from './pages/Logins'
import Register from './pages/Register'
import Otp from './pages/Otp'
import Admin from './pages/Admin'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Users from './pages/Users'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import Category from './pages/Category'
import ProductList from './pages/ProductList'
import UserOrder from './pages/UserOrder'
import UserCart from './pages/UserCart'
import ProductView from './pages/ProductView'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import OrderView from './pages/OrderView'
import UserIndivualOrder from './pages/UserIndivualOrder'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  >
       <Route path='' element={<Home />} />
       <Route path='/login' element={<Logins />} />
       <Route path='/register' element={<Register />} />
       <Route path='/otp' element={<Otp />} />
       <Route path='/admin' element={<Admin />} />
       <Route path='/products' element={<Products />} />
       <Route path='/orders' element={<Orders />} /> 
       <Route path='/users' element={<Users />} />
       <Route path='/category' element={<Category />} />
       <Route path='/productlist' element={<ProductList />} />
       <Route path='/user' element={<UserOrder />} />
       <Route path='/userorder/' element={<UserIndivualOrder />} />
       <Route path='/cart' element={<UserCart />} />
       <Route path='/view/:id' element={<ProductView />} />
       <Route path='/checkout' element={<Checkout />} />
       <Route path='/success' element={<PaymentSuccess />} />
       <Route path='/orderview/:id/' element={<OrderView />} />
    </Route> 
  )
    
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </React.StrictMode>,
)

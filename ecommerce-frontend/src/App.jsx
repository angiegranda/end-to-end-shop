import {Routes, Route} from 'react-router'
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/tracking/TrackingPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Routes compotent tells react all the pages that are in the website
// Route is basically a page

function App() {

  const [cart, setCart] = useState([]);
  useEffect(() => 
  {
      const getCartItems = async () => {
        const response = await axios.get('/api/cart-items?expand=product');
        setCart(response.data);
      }

      getCartItems();

  }, []); 

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart}/>} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>} />
      <Route path="*" element={<NotFoundPage cart={cart}/> } />
    </Routes>
  )
}

export default App

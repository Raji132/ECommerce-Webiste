import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const navigationType = window.performance
      .getEntriesByType('navigation')[0]?.type

    if (navigationType === 'reload' && location.pathname !== '/login') {
      navigate('/login', { replace: true })
    }
  }, [location.pathname, navigate])

  return (
    <WishlistProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </WishlistProvider>
  )
}

export default App

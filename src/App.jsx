import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

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
      <AppRoutes />
    </WishlistProvider>
  )
}

export default App

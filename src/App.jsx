import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'

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

  return <AppRoutes />
}

export default App

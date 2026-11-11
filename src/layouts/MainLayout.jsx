import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'

function MainLayout() {
  const { pathname } = useLocation()
  const isLogin = [
    '/login',
    '/register',
    '/forgot-password',
    '/verify-code',
    '/reset-password',
  ].includes(pathname)

  return (
    <div className={`site-layout${isLogin ? ' site-layout--login' : ''}`}>
      <Header />
      <div className="site-layout__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout

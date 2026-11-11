import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'

function MainLayout() {
  return (
    <div className="site-layout">
      <Header />
      <div className="site-layout__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout

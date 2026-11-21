import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './MyAccount.css'

const menuItems = [
  { label: 'Account', to: '/my-account', end: true },
  { label: 'Profile', to: '/my-account/profile' },
  { label: 'My orders', to: '/my-account/orders' },
  { label: 'Wishlist', to: '/my-account/wishlist' },
  { label: 'Addresses', to: '/my-account/addresses' },
  { label: 'Payment methods', to: '/my-account/payment-methods' },
  { label: 'Notifications', to: '/my-account/notifications' },
  { label: 'Support', to: '/my-account/support' },
]

const pageNames = {
  '/my-account': 'Account',
  '/my-account/profile': 'Profile',
  '/my-account/orders': 'My orders',
  '/my-account/orders/track': 'Order tracking',
  '/my-account/wishlist': 'Wishlist',
  '/my-account/addresses': 'Addresses',
  '/my-account/payment-methods': 'Payment methods',
  '/my-account/notifications': 'Notifications',
  '/my-account/support': 'Support',
}

function AccountLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const currentPage = pageNames[pathname] || 'Account'

  return (
    <main className="account-page">
      <nav className="account-breadcrumb" aria-label="Breadcrumb">
        <Link to="/home">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/my-account">My account</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{currentPage}</span>
      </nav>

      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="account-sidebar__garage">
            <span>Your garage</span>
            <strong>Arjun Mehta</strong>
          </div>
          <nav className="account-sidebar__menu" aria-label="My account">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `account-sidebar__link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button className="account-sidebar__signout" type="button" onClick={() => navigate('/login')}>
            Sign out <span aria-hidden="true">↗</span>
          </button>
        </aside>

        <label className="account-mobile-menu">
          <span className="visually-hidden">My account section</span>
          <select value={pathname} onChange={(event) => navigate(event.target.value)}>
            {menuItems.map((item) => (
              <option key={item.to} value={item.to}>{item.label}</option>
            ))}
            {pathname === '/my-account/orders/track' && (
              <option value="/my-account/orders/track">Order tracking</option>
            )}
          </select>
        </label>

        <section className="account-content">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default AccountLayout

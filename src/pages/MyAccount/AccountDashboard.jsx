import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { useWishlist } from '../../context/WishlistContext.jsx'

function AccountDashboard() {
  const { user } = useAuth()
  const { wishlistCount } = useWishlist()
  const displayName = user?.name || user?.email?.split('@')[0] || ''

  const summaryCards = [
    { value: '0', label: 'Orders placed' },
    { value: String(wishlistCount), label: 'Wishlist favorites' },
    { value: '0', label: 'Collector points' },
  ]

  return (
    <>
      <header className="account-heading">
        <h1>Welcome to your garage{displayName ? `, ${displayName}` : ''}.</h1>
        <p>Collector{user?.email ? ` · ${user.email}` : ''}</p>
      </header>

      <div className="account-summary" aria-label="Account summary">
        {summaryCards.map((card) => (
          <article className="account-summary__card" key={card.label}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
          </article>
        ))}
      </div>

      <section className="account-panel account-latest-order">
        <div>
          <h2>No recent orders</h2>
          <p>Start collecting diecast models to track your shipments here.</p>
        </div>
        <Link to="/product_listing">Shop now <span aria-hidden="true">›</span></Link>
      </section>

      <section className="account-panel account-management">
        <div>
          <h2>Keep your garage up to date</h2>
          <p>Manage addresses, payment methods and preferences.</p>
        </div>
        <Link to="/my-account/profile">Manage <span aria-hidden="true">›</span></Link>
      </section>

      <section className="account-banner">
        <p>The collector&apos;s club</p>
        <strong>You&apos;re in good company. Next drop: Friday, 6 PM.</strong>
      </section>
    </>
  )
}

export default AccountDashboard

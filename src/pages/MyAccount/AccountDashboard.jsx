import { Link } from 'react-router-dom'

const summaryCards = [
  { value: '12', label: 'Orders placed' },
  { value: '4', label: 'Wishlist favorites' },
  { value: '320', label: 'Collector points' },
]

function AccountDashboard() {
  return (
    <>
      <header className="account-heading">
        <h1>Welcome to your garage, Arjun.</h1>
        <p>Collector since March 2023 · Member #APX-03234</p>
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
          <h2>Your latest order · #APX-10482</h2>
          <p>In transit · 2 items · Expected 13–15 Nov</p>
        </div>
        <Link to="/my-account/orders/track">Track <span aria-hidden="true">›</span></Link>
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

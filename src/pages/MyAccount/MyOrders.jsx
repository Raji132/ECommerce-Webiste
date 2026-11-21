import { Link } from 'react-router-dom'

function MyOrders() {
  return (
    <>
      <header className="account-heading">
        <h1>My orders.</h1>
        <p>Review recent purchases and keep up with deliveries.</p>
      </header>
      <article className="account-panel account-order-list">
        <div>
          <h2>Order #APX-10482</h2>
          <p>2 items · In transit · Placed 8 November</p>
        </div>
        <Link to="/my-account/orders/track">Track order <span aria-hidden="true">›</span></Link>
      </article>
    </>
  )
}

export default MyOrders

import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import './OrderConfirmation.css'

const FALLBACK_ORDER = {
  id: 'APX-10482',
  placedDate: '10 November 2026',
  estimatedDelivery: '13–15 November 2026',
  email: 'arjun.mehta@gmail.com',
  itemCount: 2,
  paymentSummary: 'Paid via UPI',
  total: 1978,
  address: {
    name: 'Arjun Mehta',
    street: '42, Palm Grove, Indiranagar',
    city: 'Bengaluru',
    postalCode: '560038',
  },
}

function getStoredOrder() {
  try {
    const raw = sessionStorage.getItem('apex_last_order')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function OrderConfirmation() {
  const location = useLocation()
  const { user } = useAuth()

  const order = location.state?.order || getStoredOrder() || {
    ...FALLBACK_ORDER,
    email: user?.email || FALLBACK_ORDER.email,
  }

  const itemCount = order.itemCount || 2
  const itemLabel = itemCount === 1 ? '1 collectible' : `${itemCount} collectibles`
  const formattedTotal = Number(order.total || 0).toLocaleString('en-IN')
  const deliveryLine = [
    order.address?.street,
    order.address?.city && order.address?.postalCode
      ? `${order.address.city} ${order.address.postalCode}`
      : order.address?.city || order.address?.postalCode,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <main className="order-confirm-page">
      <div className="order-confirm-container">
        {/* Green Confirmation Banner */}
        <section className="order-confirm-banner" aria-label="Order confirmation status">
          <div className="order-confirm-banner__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="order-confirm-banner__title">
            Your next legends are on the way.
          </h1>
          <p className="order-confirm-banner__meta">
            Order #{order.id} &nbsp;·&nbsp; Placed on {order.placedDate}
          </p>
          <p className="order-confirm-banner__email">
            Confirmation sent to {order.email}
          </p>
        </section>

        {/* Order Details & Actions */}
        <section className="order-confirm-details" aria-label="Delivery and payment summary">
          <p className="order-confirm-label">Estimated delivery</p>
          <h2 className="order-confirm-date">{order.estimatedDelivery}</h2>

          <div className="order-confirm-address">
            <p>Delivering to {order.address?.name || 'Collector'}</p>
            <p>{deliveryLine}</p>
          </div>

          <p className="order-confirm-summary-line">
            <span>{itemLabel}</span>
            <span className="order-confirm-dot" aria-hidden="true">•</span>
            <span>{order.paymentSummary}</span>
            <span className="order-confirm-dot" aria-hidden="true">•</span>
            <span>Total ₹{formattedTotal}</span>
          </p>

          <div className="order-confirm-actions">
            <Link
              to={`/my-account/orders/track?orderId=${encodeURIComponent(order.id)}`}
              className="order-confirm-btn order-confirm-btn--primary"
            >
              Track order →
            </Link>
            <Link
              to="/product_listing"
              className="order-confirm-btn order-confirm-btn--dark"
            >
              Continue exploring
            </Link>
          </div>

          <p className="order-confirm-support">
            <Link to="/my-account/support">Need help? Contact collector support</Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default OrderConfirmation

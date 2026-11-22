import { Link, Navigate, useParams } from 'react-router-dom'
import { getOrder } from './orderData.js'

function OrderDetails() {
  const { orderId } = useParams()
  const order = getOrder(orderId)

  if (!order) return <Navigate to="/my-account/orders" replace />

  return (
    <>
      <header className="account-heading">
        <h1>Order #{order.id}</h1>
        <p>Placed {order.placed} · {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · {order.payment}</p>
      </header>

      <div className={`order-status-banner${order.status === 'In transit' ? ' is-in-transit' : ''}`}>
        <span aria-hidden="true">●</span>
        {order.status === 'In transit' ? `In transit · Expected ${order.expected}` : order.status}
      </div>

      <section className="order-items" aria-label="Items in this order">
        {order.items.map((item, index) => (
          <article className="order-item" key={`${item.name}-${index}`}>
            <img src={item.image} alt={item.name} />
            <div className="order-item__details">
              <h2>{item.name}</h2>
              <p>{item.brand} · Qty {item.quantity}</p>
            </div>
            <strong>{item.price}</strong>
          </article>
        ))}
      </section>

      <div className="order-totals">
        <p>Subtotal {order.subtotal} <span>−</span> Discount −{order.discount} <span>+</span> Shipping FREE</p>
        <strong>Total paid {order.total} <span>· Tax included</span></strong>
      </div>

      <div className="order-actions">
        {order.status === 'In transit' && (
          <Link className="order-button order-button--primary" to={`/my-account/orders/track?orderId=${order.id}`}>
            Track order
          </Link>
        )}
        <Link className="order-button order-button--dark" to={`/my-account/orders/${order.id}/invoice`}>
          Download invoice
        </Link>
      </div>

      <p className="order-support">Need help with this order? <Link to="/my-account/support">Contact support <span aria-hidden="true">→</span></Link></p>
    </>
  )
}

export default OrderDetails

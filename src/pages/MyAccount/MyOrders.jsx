import { useState } from 'react'
import { Link } from 'react-router-dom'
import { orders } from './orderData.js'

const filters = ['All orders', 'In transit', 'Delivered', 'Cancelled']

function MyOrders() {
  const [activeFilter, setActiveFilter] = useState('All orders')
  const visibleOrders = orders.filter((order) => {
    if (activeFilter === 'All orders') return true
    if (activeFilter === 'Cancelled') return order.status === 'Cancelled' || order.status === 'Refunded'
    return order.status === activeFilter
  })

  return (
    <>
      <header className="account-heading">
        <h1>Your orders.</h1>
        <p>Every great collection has a story. Here&apos;s yours.</p>
      </header>

      <div className="orders-filters" role="tablist" aria-label="Filter orders">
        {filters.map((filter) => (
          <button
            aria-selected={activeFilter === filter}
            className={activeFilter === filter ? 'is-active' : ''}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            role="tab"
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="orders-list" aria-label={`${activeFilter} list`}>
        {visibleOrders.length ? visibleOrders.map((order) => (
          <article className="orders-list__item" key={order.id}>
            <div>
              <h2>#{order.id}</h2>
              <p>{order.placed} · {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · {order.total} · {order.status}</p>
            </div>
            <Link to={`/my-account/orders/${order.id}`}>View details <span aria-hidden="true">→</span></Link>
          </article>
        )) : (
          <p className="orders-list__empty">No orders in this category yet.</p>
        )}
      </section>
    </>
  )
}

export default MyOrders

import { Link, Navigate, useParams } from 'react-router-dom'
import { getOrder } from './orderData.js'

function OrderInvoice() {
  const { orderId } = useParams()
  const order = getOrder(orderId)

  if (!order) return <Navigate to="/my-account/orders" replace />

  return (
    <>
      <header className="account-heading">
        <h1>Tax invoice.</h1>
        <p>Invoice INV-2026-{order.id.replace('APX-', '')} · Issued {order.placed}</p>
      </header>

      <article className="invoice-document">
        <header className="invoice-document__header">
          <strong>APEX COLLECTIBLES</strong>
          <p>GSTIN: 29ABCD1234F1Z5 <span>/</span> TAX INVOICE</p>
        </header>

        <section className="invoice-document__bill">
          <strong>BILL TO: Arjun Mehta</strong>
          <p>42, Palm Grove, Indiranagar, Bengaluru 560038</p>
        </section>

        <div className="invoice-table-wrap">
          <table className="invoice-table">
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Tax</th><th>Total</th></tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={`${item.name}-${index}`}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.tax}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="invoice-document__summary">
          Subtotal {order.subtotal} <span>·</span> Discount −{order.discount} <span>·</span> Tax included
        </p>

        <div className="invoice-document__grand-total">
          <strong>Grand total</strong>
          <strong>{order.total}</strong>
        </div>

        <p className="invoice-document__thanks">{order.payment} · Thank you for collecting with APEX.</p>
      </article>

      <div className="invoice-actions">
        <button className="order-button order-button--primary" onClick={() => window.print()} type="button">
          Download PDF
        </button>
        <Link className="invoice-actions__back" to={`/my-account/orders/${order.id}`}>Back to order details</Link>
      </div>
    </>
  )
}

export default OrderInvoice

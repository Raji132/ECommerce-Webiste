const trackingSteps = [
  { title: 'Order confirmed', date: '10 Nov, 10:42 AM · Payment received', complete: true },
  { title: 'Packed with care', date: '10 Nov, 02:15 PM · APEX warehouse, Mumbai', complete: true },
  { title: 'In transit', date: '11 Nov, 09:30 AM · Departed Mumbai hub', complete: true, active: true },
  { title: 'Out for delivery', date: 'Your final courier will contact you', complete: false },
  { title: 'Delivered', date: 'A new legend joins your garage', complete: false },
]

function OrderTracking() {
  return (
    <>
      <header className="account-heading account-heading--tracking">
        <h1>On its way to your garage.</h1>
        <p>Order #APX-10482 · Delivery · AWB 78410585235</p>
      </header>
      <section className="tracking-arrival">
        <span>Arriving</span>
        <strong>Friday, 13 November</strong>
      </section>
      <ol className="tracking-list">
        {trackingSteps.map((step) => (
          <li
            className={`${step.complete ? 'is-complete' : ''}${step.active ? ' is-active' : ''}`}
            key={step.title}
          >
            <span className="tracking-list__marker" aria-hidden="true" />
            <div>
              <strong>{step.title}</strong>
              <p>{step.date}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

export default OrderTracking

import { useState } from 'react'

const helpTopics = [
  {
    question: 'Where is my order?',
    keywords: 'track tracking delivery shipment status',
    answer: 'You can follow every order from My orders. Open an order to see its latest tracking updates. Tracking becomes available as soon as your parcel is dispatched.',
  },
  {
    question: 'How do I request a return?',
    keywords: 'refund exchange cancel damaged',
    answer: 'Eligible items can be returned within 7 days of delivery, in their original condition and packaging. Open the order in My orders and contact us with the order number to get started.',
  },
  {
    question: 'Are all products authentic?',
    keywords: 'genuine original real authenticity',
    answer: 'Yes. Every collectible is sourced from trusted brands and authorized distributors, and checked by our team before it is listed.',
  },
  {
    question: 'What payment methods can I use?',
    keywords: 'card upi checkout pay',
    answer: 'Checkout supports major credit and debit cards and UPI. You can manage saved payment methods from the Payment methods section of your account.',
  },
]

function Support() {
  const [search, setSearch] = useState('')
  const query = search.trim().toLowerCase()
  const filteredTopics = helpTopics.filter(({ question, keywords, answer }) =>
    `${question} ${keywords} ${answer}`.toLowerCase().includes(query)
  )
  const supportEmail = 'support@apexcollectibles.com'

  return (
    <>
      <header className="account-heading support-heading">
        <h1>How can we help?</h1>
        <p>Real people. Real collectibles. We’ve got your back.</p>
      </header>

      <section className="support-center" aria-label="Help center">
        <label className="support-search">
          <span>Search the help center</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={'Try “delivery”, “returns” or “authenticity”'}
          />
        </label>

        <div className="support-faq">
          {filteredTopics.length > 0 ? filteredTopics.map(({ question, answer }) => (
            <details className="support-faq__item" key={question}>
              <summary>
                <span>{question}<small>Get answers from the collector help center</small></span>
                <span className="support-faq__open">Open <span aria-hidden="true">→</span></span>
              </summary>
              <p>{answer}</p>
            </details>
          )) : (
            <p className="support-faq__empty" role="status">
              No help articles match “{search}”. Try another search or contact our support team.
            </p>
          )}
        </div>
      </section>

      <section className="support-contact" aria-label="Contact support">
        <p>Still need a hand? We reply within 24 hours.</p>
        <div className="support-contact__actions">
          <a className="support-contact__conversation" href={`mailto:${supportEmail}?subject=Help%20with%20my%20APEX%20order`}>
            Start a conversation
          </a>
          <a className="support-contact__email" href={`mailto:${supportEmail}`}>
            Email support
          </a>
        </div>
      </section>
    </>
  )
}

export default Support

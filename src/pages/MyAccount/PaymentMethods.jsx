import { useState } from 'react'
import Modal from '../../components/common/Modal.jsx'

const initialMethods = [
  {
    id: 'card-4242',
    type: 'card',
    label: 'VISA',
    detail: '•••• 4242',
    owner: 'Arjun Mehta',
    expires: '08/28',
    isDefault: true,
  },
  {
    id: 'upi-arjun',
    type: 'upi',
    label: 'UPI',
    detail: 'arjun.mehta@okaxis',
    isDefault: false,
  },
]

function PaymentMethods() {
  const [methods, setMethods] = useState(initialMethods)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [methodType, setMethodType] = useState('card')
  const [cardholder, setCardholder] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [upiId, setUpiId] = useState('')

  function closeModal() {
    setIsModalOpen(false)
  }

  function openModal() {
    setMethodType('card')
    setCardholder('')
    setCardNumber('')
    setExpiry('')
    setUpiId('')
    setIsModalOpen(true)
  }

  function addMethod(event) {
    event.preventDefault()
    const isFirstMethod = methods.length === 0
    const method = methodType === 'card'
      ? {
          id: `card-${Date.now()}`,
          type: 'card',
          label: 'CARD',
          detail: `•••• ${cardNumber.replace(/\D/g, '').slice(-4)}`,
          owner: cardholder.trim(),
          expires: expiry,
          isDefault: isFirstMethod,
        }
      : {
          id: `upi-${Date.now()}`,
          type: 'upi',
          label: 'UPI',
          detail: upiId.trim(),
          isDefault: isFirstMethod,
        }

    setMethods((currentMethods) => [...currentMethods, method])
    closeModal()
  }

  function removeMethod(methodId) {
    setMethods((currentMethods) => {
      const removedMethod = currentMethods.find((method) => method.id === methodId)
      const remainingMethods = currentMethods.filter((method) => method.id !== methodId)

      if (removedMethod?.isDefault && remainingMethods.length > 0) {
        return remainingMethods.map((method, index) => ({
          ...method,
          isDefault: index === 0,
        }))
      }

      return remainingMethods
    })
  }

  function makeDefault(methodId) {
    setMethods((currentMethods) => currentMethods.map((method) => ({
      ...method,
      isDefault: method.id === methodId,
    })))
  }

  return (
    <>
      <header className="account-heading">
        <h1>Payment methods.</h1>
        <p>Secure, simple and ready for your next drop.</p>
      </header>

      <section className="payment-methods" aria-label="Saved payment methods">
        {methods.length === 0 ? (
          <p className="payment-methods__empty">You have no saved payment methods yet.</p>
        ) : methods.map((method) => (
          <article className="payment-method" key={method.id}>
            <div className="payment-method__details">
              <h2>{method.label} <span>{method.detail}</span></h2>
              <p>
                {method.type === 'card'
                  ? `${method.owner} · Expires ${method.expires}`
                  : 'Verified UPI account'}
                {method.isDefault ? ' · Default' : ''}
              </p>
            </div>
            <div className="payment-method__actions">
              {!method.isDefault && (
                <button type="button" onClick={() => makeDefault(method.id)}>
                  Make default
                </button>
              )}
              <button
                className="payment-method__remove"
                type="button"
                onClick={() => removeMethod(method.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>

      <button className="payment-methods__add" type="button" onClick={openModal}>
        + Add payment method
      </button>
      <p className="payment-methods__note">
        Only masked card details are shown here. Secure payment processing requires a payment provider.
      </p>

      <Modal isOpen={isModalOpen} title="Add payment method" onClose={closeModal}>
        <form className="payment-form" onSubmit={addMethod}>
          <label className="payment-form__field payment-form__field--full">
            <span>Payment type</span>
            <select value={methodType} onChange={(event) => setMethodType(event.target.value)}>
              <option value="card">Credit or debit card</option>
              <option value="upi">UPI</option>
            </select>
          </label>

          {methodType === 'card' ? (
            <>
              <label className="payment-form__field payment-form__field--full">
                <span>Name on card</span>
                <input
                  autoComplete="cc-name"
                  required
                  value={cardholder}
                  onChange={(event) => setCardholder(event.target.value)}
                />
              </label>
              <label className="payment-form__field payment-form__field--full">
                <span>Card number</span>
                <input
                  autoComplete="cc-number"
                  inputMode="numeric"
                  maxLength={19}
                  minLength={12}
                  pattern="[0-9]{12,19}"
                  placeholder="1234 5678 9012 3456"
                  required
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value.replace(/\D/g, ''))}
                />
              </label>
              <label className="payment-form__field">
                <span>Expiry (MM/YY)</span>
                <input
                  autoComplete="cc-exp"
                  maxLength={5}
                  pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                  placeholder="MM/YY"
                  required
                  value={expiry}
                  onChange={(event) => setExpiry(event.target.value.replace(/[^0-9/]/g, ''))}
                />
              </label>
            </>
          ) : (
            <label className="payment-form__field payment-form__field--full">
              <span>UPI ID</span>
              <input
                autoComplete="off"
                placeholder="name@bank"
                required
                value={upiId}
                onChange={(event) => setUpiId(event.target.value)}
              />
            </label>
          )}

          <p className="payment-form__notice">
            This demo keeps only a masked card number. CVV is never requested or saved.
          </p>
          <button className="payment-form__submit payment-form__field--full" type="submit">
            Add payment method
          </button>
        </form>
      </Modal>
    </>
  )
}

export default PaymentMethods

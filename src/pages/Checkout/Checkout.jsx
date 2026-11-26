import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import Modal from '../../components/common/Modal.jsx'
import './Checkout.css'

const DEFAULT_ADDRESSES = [
  {
    id: 'home',
    label: 'Home',
    name: 'Arjun Mehta',
    phone: '+91 98765 43210',
    street: '42, Palm Grove, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    isDefault: true,
  },
  {
    id: 'office',
    label: 'Office',
    name: 'Arjun Mehta',
    phone: '+91 98765 43210',
    street: 'Waverly Galaxy, Residency Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560025',
    isDefault: false,
  },
]

const EMPTY_ADDRESS = {
  label: '',
  name: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
}

const COD_FEE = 49

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(value, prevValue) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (prevValue && value.length < prevValue.length && prevValue.endsWith(' / ')) {
    return digits.slice(0, 1)
  }
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  }
  if (digits.length === 2 && (!prevValue || value.length > prevValue.length)) {
    return `${digits} / `
  }
  return digits
}

function Checkout({ initialMethod = 'upi' }) {
  const navigate = useNavigate()
  const {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    total,
    couponCode,
    clearCart,
  } = useCart()
  const { user } = useAuth()

  const [step, setStep] = useState('checkout') // 'checkout' | 'review'
  const [addresses, setAddresses] = useState(() => {
    if (user?.name && user.name !== 'Collector') {
      return DEFAULT_ADDRESSES.map((addr, idx) =>
        idx === 0 ? { ...addr, name: addr.name || user.name } : addr
      )
    }
    return DEFAULT_ADDRESSES
  })
  const [selectedAddressId, setSelectedAddressId] = useState(DEFAULT_ADDRESSES[0].id)

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState(EMPTY_ADDRESS)

  const [paymentMethod, setPaymentMethod] = useState(initialMethod) // 'upi' | 'card' | 'cod'
  const [showMethodSelector, setShowMethodSelector] = useState(initialMethod !== 'card')
  const [upiId, setUpiId] = useState('arjun.mehta@okaxis')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  })
  const [saveCard, setSaveCard] = useState(true)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedAddress =
    addresses.find((addr) => addr.id === selectedAddressId) || addresses[0]

  const codFee = paymentMethod === 'cod' ? COD_FEE : 0
  const finalTotal = total + codFee

  const handleOpenAddressModal = () => {
    setShowNewAddressForm(false)
    setNewAddress(EMPTY_ADDRESS)
    setIsAddressModalOpen(true)
  }

  const handleAddNewAddress = (e) => {
    e.preventDefault()
    const created = {
      ...newAddress,
      id: `addr-${Date.now()}`,
      label: newAddress.label.trim() || `Address ${addresses.length + 1}`,
      isDefault: false,
    }
    setAddresses((prev) => [...prev, created])
    setSelectedAddressId(created.id)
    setShowNewAddressForm(false)
    setNewAddress(EMPTY_ADDRESS)
    setIsAddressModalOpen(false)
  }

  const validateCheckout = () => {
    if (!selectedAddress) {
      return 'Please select a delivery address.'
    }
    if (paymentMethod === 'upi') {
      const trimmedUpi = upiId.trim()
      if (!trimmedUpi || !/^[\w.-]+@[\w.-]+$/.test(trimmedUpi)) {
        return 'Please enter a valid UPI ID (e.g. name@okaxis).'
      }
    }
    if (paymentMethod === 'card') {
      const cleanNumber = cardDetails.number.replace(/\D/g, '')
      const cleanExpiry = cardDetails.expiry.replace(/\s+/g, '')
      if (
        cleanNumber.length < 12 ||
        !cardDetails.name.trim() ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cleanExpiry) ||
        cardDetails.cvv.trim().length < 3
      ) {
        return 'Please complete all credit / debit card details (use MM / YY for expiry).'
      }
    }
    if (!agreeTerms) {
      return 'Please agree to the terms & conditions and returns policy.'
    }
    return ''
  }

  const handleReviewStep = () => {
    const validationError = validateCheckout()
    if (validationError) {
      setErrorMsg(validationError)
      return
    }
    setErrorMsg('')
    setStep('review')
  }

  const handlePlaceOrder = () => {
    const validationError = validateCheckout()
    if (validationError) {
      setErrorMsg(validationError)
      return
    }
    setErrorMsg('')
    setIsProcessing(true)

    setTimeout(() => {
      const orderNumber = `APX-${Math.floor(10500 + Math.random() * 89000)}`
      const paymentSummary =
        paymentMethod === 'upi'
          ? 'Paid via UPI'
          : paymentMethod === 'card'
            ? 'Paid via Card'
            : 'Cash on delivery'

      const placedDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      const newOrder = {
        id: orderNumber,
        placedDate,
        estimatedDelivery: '13–15 November 2026',
        email: user?.email || 'arjun.mehta@gmail.com',
        items: [...cart],
        itemCount: cartCount,
        subtotal,
        discountAmount,
        couponCode,
        codFee,
        total: finalTotal,
        address: selectedAddress,
        paymentSummary,
      }

      try {
        sessionStorage.setItem('apex_last_order', JSON.stringify(newOrder))
        if (paymentMethod === 'card' && saveCard) {
          const existingSaved = JSON.parse(localStorage.getItem('apex_saved_cards') || '[]')
          const last4 = cardDetails.number.replace(/\D/g, '').slice(-4) || '4242'
          existingSaved.push({
            id: `card-${Date.now()}`,
            type: 'card',
            label: 'CARD',
            detail: `•••• ${last4}`,
            owner: cardDetails.name.trim(),
            expires: cardDetails.expiry.replace(/\s+/g, ''),
          })
          localStorage.setItem('apex_saved_cards', JSON.stringify(existingSaved))
        }
      } catch {
        // Ignore storage errors
      }

      clearCart()
      setIsProcessing(false)
      navigate('/order-confirmation', { state: { order: newOrder } })
    }, 650)
  }

  const scrollToSection = (sectionId) => {
    if (step !== 'checkout') {
      setStep('checkout')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <header className="checkout-header">
            <h1 className="checkout-title">Make it yours.</h1>
          </header>
          <div className="checkout-empty-state">
            <h2>Your bag is currently empty</h2>
            <p>Add collectibles to your bag before proceeding to checkout.</p>
            <div className="checkout-empty-actions">
              <Link to="/product_listing" className="checkout-primary-link">
                Explore collectibles
              </Link>
              <Link to="/cart" className="checkout-secondary-link">
                Return to bag
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* Page Heading & Steps */}
        <header className="checkout-header">
          <h1 className="checkout-title">Make it yours.</h1>
          <nav className="checkout-steps" aria-label="Checkout steps">
            <button
              type="button"
              className={`checkout-step ${step === 'checkout' ? 'is-active' : 'is-completed'}`}
              onClick={() => scrollToSection('checkout-delivery')}
            >
              1 Delivery
            </button>
            <button
              type="button"
              className={`checkout-step ${step === 'checkout' ? 'is-active' : 'is-completed'}`}
              onClick={() => scrollToSection('checkout-payment')}
            >
              2 Payment
            </button>
            <button
              type="button"
              className={`checkout-step ${step === 'review' ? 'is-active' : ''}`}
              onClick={handleReviewStep}
            >
              3 Review
            </button>
          </nav>
        </header>

        <div className="checkout-layout">
          {/* Left Column */}
          <div className="checkout-main">
            {step === 'review' ? (
              <section className="checkout-review-section" aria-label="Review your order">
                <div className="checkout-card">
                  <div className="checkout-card__header-row">
                    <h2 className="checkout-section-title">03 &nbsp;Review items ({cartCount})</h2>
                    <button
                      type="button"
                      className="checkout-change-btn"
                      onClick={() => setStep('checkout')}
                    >
                      Edit details
                    </button>
                  </div>

                  <div className="checkout-review-items">
                    {cart.map((item) => (
                      <div className="checkout-review-item" key={item.id}>
                        <div className="checkout-review-item__media">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="checkout-review-item__info">
                          <h3>{item.name}</h3>
                          <p>{item.subDetails}</p>
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <span className="checkout-review-item__price">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-review-meta">
                    <div>
                      <strong>Delivering to</strong>
                      <p>
                        {selectedAddress.label} - {selectedAddress.name}, {selectedAddress.street},{' '}
                        {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                      </p>
                    </div>
                    <div>
                      <strong>Payment method</strong>
                      <p>
                        {paymentMethod === 'upi'
                          ? `UPI (${upiId})`
                          : paymentMethod === 'card'
                            ? `Card (•••• ${cardDetails.number.replace(/\D/g, '').slice(-4) || '4242'})`
                            : 'Cash on delivery (₹49 fee)'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <>
                {/* 01 Delivery Address */}
                <section
                  id="checkout-delivery"
                  className="checkout-card checkout-address-card"
                  aria-label="Delivery address"
                >
                  <h2 className="checkout-section-title">
                    <span className="checkout-section-num">01</span> Delivery address
                  </h2>

                  <div className="checkout-address-row">
                    <div className="checkout-address-info">
                      <div className="checkout-address-title">
                        <span className="checkout-radio-dot is-selected" aria-hidden="true" />
                        <strong>
                          {selectedAddress.label} - {selectedAddress.name}
                        </strong>
                      </div>
                      <address className="checkout-address-lines">
                        {selectedAddress.street}
                        <br />
                        {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                        <br />
                        {selectedAddress.phone}
                      </address>
                    </div>

                    <button
                      type="button"
                      className="checkout-change-btn"
                      onClick={handleOpenAddressModal}
                    >
                      Change
                    </button>
                  </div>
                </section>

                {/* 02 Payment Method */}
                <section
                  id="checkout-payment"
                  className="checkout-payment-section"
                  aria-label="Payment method"
                >
                  {paymentMethod === 'card' && !showMethodSelector ? (
                    <>
                      <div className="checkout-card__header-row checkout-payment-header-row">
                        <h2 className="checkout-section-title">
                          <span className="checkout-section-num">02</span> Pay by credit / debit card
                        </h2>
                        <button
                          type="button"
                          className="checkout-change-btn"
                          onClick={() => setShowMethodSelector(true)}
                        >
                          Change method
                        </button>
                      </div>

                      <div className="checkout-payment-details checkout-payment-details--card checkout-card-fields">
                        <div className="checkout-field-group">
                          <label htmlFor="checkout-card-number" className="checkout-field-label">
                            Card number
                          </label>
                          <input
                            id="checkout-card-number"
                            type="text"
                            inputMode="numeric"
                            maxLength={19}
                            className="checkout-input"
                            value={cardDetails.number}
                            onChange={(e) =>
                              setCardDetails((prev) => ({
                                ...prev,
                                number: formatCardNumber(e.target.value),
                              }))
                            }
                            placeholder="4242  4242  4242  4242"
                            autoComplete="cc-number"
                          />
                        </div>

                        <div className="checkout-field-group">
                          <label htmlFor="checkout-card-name" className="checkout-field-label">
                            Name on card
                          </label>
                          <input
                            id="checkout-card-name"
                            type="text"
                            className="checkout-input"
                            value={cardDetails.name}
                            onChange={(e) =>
                              setCardDetails((prev) => ({ ...prev, name: e.target.value }))
                            }
                            placeholder="ARJUN MEHTA"
                            autoComplete="cc-name"
                          />
                        </div>

                        <div className="checkout-card-split">
                          <div className="checkout-field-group">
                            <label htmlFor="checkout-card-exp" className="checkout-field-label">
                              Expiry
                            </label>
                            <input
                              id="checkout-card-exp"
                              type="text"
                              inputMode="numeric"
                              maxLength={7}
                              className="checkout-input"
                              value={cardDetails.expiry}
                              onChange={(e) =>
                                setCardDetails((prev) => ({
                                  ...prev,
                                  expiry: formatExpiry(e.target.value, prev.expiry),
                                }))
                              }
                              placeholder="08 / 28"
                              autoComplete="cc-exp"
                            />
                          </div>
                          <div className="checkout-field-group">
                            <label htmlFor="checkout-card-cvv" className="checkout-field-label">
                              CVV
                            </label>
                            <input
                              id="checkout-card-cvv"
                              type="password"
                              inputMode="numeric"
                              maxLength={4}
                              className="checkout-input"
                              value={cardDetails.cvv}
                              onChange={(e) =>
                                setCardDetails((prev) => ({
                                  ...prev,
                                  cvv: e.target.value.replace(/\D/g, ''),
                                }))
                              }
                              placeholder="•••"
                              autoComplete="cc-csc"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="checkout-checkbox-stack">
                        <label className="checkout-terms">
                          <input
                            type="checkbox"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                          />
                          <span>Save this card securely for next time</span>
                        </label>

                        <label className="checkout-terms">
                          <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => {
                              setAgreeTerms(e.target.checked)
                              if (e.target.checked) setErrorMsg('')
                            }}
                          />
                          <span>I agree to the terms and returns policy.</span>
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="checkout-section-title">
                        <span className="checkout-section-num">02</span> Payment method
                      </h2>

                      <div className="checkout-payment-options" role="radiogroup" aria-label="Choose payment method">
                        {/* UPI */}
                        <label
                          className={`checkout-payment-option ${paymentMethod === 'upi' ? 'is-selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={paymentMethod === 'upi'}
                            onChange={() => {
                              setPaymentMethod('upi')
                              setShowMethodSelector(true)
                              setErrorMsg('')
                            }}
                          />
                          <span
                            className={`checkout-radio-dot ${paymentMethod === 'upi' ? 'is-selected' : ''}`}
                            aria-hidden="true"
                          />
                          <span className="checkout-payment-option__text">
                            UPI — Pay with any UPI app
                          </span>
                        </label>

                        {/* Credit / Debit Card */}
                        <label
                          className={`checkout-payment-option ${paymentMethod === 'card' ? 'is-selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => {
                              setPaymentMethod('card')
                              setShowMethodSelector(false)
                              setErrorMsg('')
                            }}
                          />
                          <span
                            className={`checkout-radio-dot ${paymentMethod === 'card' ? 'is-selected' : ''}`}
                            aria-hidden="true"
                          />
                          <span className="checkout-payment-option__text">
                            Credit / debit card
                          </span>
                        </label>

                        {/* Cash on Delivery */}
                        <label
                          className={`checkout-payment-option ${paymentMethod === 'cod' ? 'is-selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => {
                              setPaymentMethod('cod')
                              setShowMethodSelector(true)
                              setErrorMsg('')
                            }}
                          />
                          <span
                            className={`checkout-radio-dot ${paymentMethod === 'cod' ? 'is-selected' : ''}`}
                            aria-hidden="true"
                          />
                          <span className="checkout-payment-option__text">
                            Cash on delivery · ₹49 fee
                          </span>
                        </label>
                      </div>

                      {/* Conditional Payment Input Block */}
                      {paymentMethod === 'upi' && (
                        <div className="checkout-payment-details">
                          <label htmlFor="checkout-upi-id" className="checkout-field-label">
                            UPI ID
                          </label>
                          <input
                            id="checkout-upi-id"
                            type="text"
                            className="checkout-input"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="arjun.mehta@okaxis"
                            autoComplete="off"
                          />
                          <p className="checkout-security-note">
                            Your payment is encrypted and secure.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="checkout-payment-details">
                          <p className="checkout-cod-note">
                            Pay in cash or UPI upon delivery. A ₹49 cash handling fee is included in your order total.
                          </p>
                          <p className="checkout-security-note">
                            Your order is protected with collector-first delivery verification.
                          </p>
                        </div>
                      )}

                      {/* Terms Checkbox */}
                      <label className="checkout-terms">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => {
                            setAgreeTerms(e.target.checked)
                            if (e.target.checked) setErrorMsg('')
                          }}
                        />
                        <span>I agree to the terms &amp; conditions and returns policy.</span>
                      </label>
                    </>
                  )}

                  {errorMsg && (
                    <p className="checkout-error-msg" role="alert">
                      {errorMsg}
                    </p>
                  )}
                </section>
              </>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <aside className="checkout-summary-section" aria-label="Order summary">
            <div className="checkout-summary-card">
              <h2 className="checkout-summary-title">Order summary</h2>

              <div className="checkout-summary-row">
                <span>
                  Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span className="checkout-shipping-free">FREE</span>
              </div>

              {discountAmount > 0 && (
                <div className="checkout-summary-row checkout-summary-row--discount">
                  <span>Discount &nbsp;·&nbsp; {couponCode}</span>
                  <span>−₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {codFee > 0 && (
                <div className="checkout-summary-row">
                  <span>COD fee</span>
                  <span>₹{codFee}</span>
                </div>
              )}

              <div className="checkout-summary-row">
                <span>Taxes</span>
                <span className="checkout-tax-included">Included</span>
              </div>

              <div className="checkout-summary-divider" />

              <div className="checkout-summary-total-row">
                <span className="checkout-summary-total-label">Total</span>
                <span className="checkout-summary-total-amount">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <p className="checkout-summary-savings">
                  You&apos;re saving ₹{discountAmount.toLocaleString('en-IN')} on this order
                </p>
              )}

              <button
                type="button"
                className={`checkout-pay-btn ${isProcessing ? 'is-loading' : ''}`}
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing
                  ? 'Processing payment...'
                  : paymentMethod === 'cod'
                    ? `Place order · ₹${finalTotal.toLocaleString('en-IN')} →`
                    : `Pay ₹${finalTotal.toLocaleString('en-IN')} securely →`}
              </button>
            </div>

            <div className="checkout-delivery-estimate">
              <p>Arrives Nov 13–15</p>
              <p>Ships with protective collector packaging.</p>
            </div>
          </aside>
        </div>
      </div>

      {/* Change Delivery Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        title={showNewAddressForm ? 'Add delivery address' : 'Select delivery address'}
        onClose={() => setIsAddressModalOpen(false)}
      >
        {showNewAddressForm ? (
          <form className="checkout-modal-form" onSubmit={handleAddNewAddress}>
            <label className="checkout-modal-field">
              <span>Label (e.g. Home, Office)</span>
              <input
                type="text"
                value={newAddress.label}
                onChange={(e) => setNewAddress((p) => ({ ...p, label: e.target.value }))}
                placeholder="Home"
              />
            </label>
            <label className="checkout-modal-field">
              <span>Full name</span>
              <input
                type="text"
                required
                value={newAddress.name}
                onChange={(e) => setNewAddress((p) => ({ ...p, name: e.target.value }))}
                placeholder="Arjun Mehta"
              />
            </label>
            <label className="checkout-modal-field">
              <span>Phone number</span>
              <input
                type="tel"
                required
                value={newAddress.phone}
                onChange={(e) => setNewAddress((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </label>
            <label className="checkout-modal-field">
              <span>Street address</span>
              <input
                type="text"
                required
                value={newAddress.street}
                onChange={(e) => setNewAddress((p) => ({ ...p, street: e.target.value }))}
                placeholder="42, Palm Grove, Indiranagar"
              />
            </label>
            <div className="checkout-modal-split">
              <label className="checkout-modal-field">
                <span>City</span>
                <input
                  type="text"
                  required
                  value={newAddress.city}
                  onChange={(e) => setNewAddress((p) => ({ ...p, city: e.target.value }))}
                  placeholder="Bengaluru"
                />
              </label>
              <label className="checkout-modal-field">
                <span>Postal code</span>
                <input
                  type="text"
                  required
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress((p) => ({ ...p, postalCode: e.target.value }))}
                  placeholder="560038"
                />
              </label>
            </div>
            <label className="checkout-modal-field">
              <span>State</span>
              <input
                type="text"
                required
                value={newAddress.state}
                onChange={(e) => setNewAddress((p) => ({ ...p, state: e.target.value }))}
                placeholder="Karnataka"
              />
            </label>
            <div className="checkout-modal-actions">
              <button
                type="button"
                className="checkout-modal-cancel"
                onClick={() => setShowNewAddressForm(false)}
              >
                Back
              </button>
              <button type="submit" className="checkout-modal-submit">
                Save &amp; use address
              </button>
            </div>
          </form>
        ) : (
          <div className="checkout-modal-addresses">
            {addresses.map((addr) => (
              <button
                type="button"
                key={addr.id}
                className={`checkout-modal-address-item ${addr.id === selectedAddressId ? 'is-selected' : ''}`}
                onClick={() => {
                  setSelectedAddressId(addr.id)
                  setIsAddressModalOpen(false)
                }}
              >
                <div className="checkout-modal-address-top">
                  <span
                    className={`checkout-radio-dot ${addr.id === selectedAddressId ? 'is-selected' : ''}`}
                    aria-hidden="true"
                  />
                  <strong>
                    {addr.label} - {addr.name}
                  </strong>
                </div>
                <p>
                  {addr.street}, {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <span>{addr.phone}</span>
              </button>
            ))}

            <button
              type="button"
              className="checkout-modal-add-btn"
              onClick={() => setShowNewAddressForm(true)}
            >
              + Add new address
            </button>
          </div>
        )}
      </Modal>
    </main>
  )
}

export default Checkout

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    total,
    couponCode,
    updateQuantity,
    removeFromCart,
    applyCoupon,
  } = useCart()

  const { toggleWishlist, isWishlisted } = useWishlist()

  const [inputCoupon, setInputCoupon] = useState(couponCode || 'FIRST10')
  const [couponFeedback, setCouponFeedback] = useState('')
  const [checkoutNotice, setCheckoutNotice] = useState(false)

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!inputCoupon.trim()) return
    const result = applyCoupon(inputCoupon)
    setCouponFeedback(result.message)
    setTimeout(() => setCouponFeedback(''), 3000)
  }

  const handleSaveForLater = (item) => {
    toggleWishlist(item)
    removeFromCart(item.id)
  }

  const handleProceedCheckout = () => {
    setCheckoutNotice(true)
    setTimeout(() => {
      setCheckoutNotice(false)
      navigate('/checkout')
    }, 300)
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        {/* Page Title & Subtitle */}
        <header className="cart-header">
          <h1 className="cart-title">Your bag. Great taste.</h1>
          <p className="cart-subtitle">
            {cartCount} {cartCount === 1 ? 'collectible' : 'collectibles'} &nbsp;•&nbsp; Ready for your garage
          </p>
        </header>

        {/* Free Shipping Alert Banner */}
        <div className="cart-shipping-banner" role="status">
          <span className="cart-shipping-banner__icon">✓</span>
          <span>You&apos;ve unlocked FREE shipping. Nice haul!</span>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">🛍</div>
            <h2>Your bag is currently empty</h2>
            <p>Your garage is waiting for its next legend. Explore our authentic diecast collections.</p>
            <Link to="/product_listing" className="cart-explore-btn">
              Explore collectibles
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left Column: Cart Items List */}
            <section className="cart-items-section" aria-label="Shopping bag items">
              <div className="cart-items-list">
                {cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div className="cart-item__media">
                      <Link to={`/product_details/${item.id}`} aria-label={`View ${item.name}`}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </div>

                    <div className="cart-item__content">
                      <div className="cart-item__top-row">
                        <div>
                          <h2 className="cart-item__title">
                            <Link to={`/product_details/${item.id}`}>{item.name}</Link>
                          </h2>
                          <p className="cart-item__details">{item.subDetails}</p>
                        </div>
                        <span className="cart-item__price">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="cart-item__actions-row">
                        {/* Quantity Counter */}
                        <div className="cart-item__qty-box" aria-label="Quantity selector">
                          <button
                            type="button"
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="cart-item__qty-num">{item.quantity}</span>
                          <button
                            type="button"
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Save for later */}
                        <button
                          type="button"
                          className="cart-item__action-link"
                          onClick={() => handleSaveForLater(item)}
                        >
                          <span aria-hidden="true">♡</span> Save for later
                        </button>

                        {/* Remove */}
                        <button
                          type="button"
                          className="cart-item__action-link cart-item__action-link--remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Have a coupon? */}
              <div className="cart-coupon-block">
                <span className="cart-coupon-label">Have a coupon?</span>
                <form className="cart-coupon-form" onSubmit={handleApplyCoupon}>
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    aria-label="Coupon code"
                  />
                  <button type="submit" className="cart-coupon-apply-btn">
                    Apply
                  </button>
                </form>
                {couponFeedback && (
                  <span className="cart-coupon-msg">{couponFeedback}</span>
                )}
              </div>
            </section>

            {/* Right Column: Order Summary */}
            <aside className="cart-summary-section" aria-label="Order summary">
              <div className="cart-summary-card">
                <h2 className="cart-summary-title">Order summary</h2>

                <div className="cart-summary-row">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span className="cart-shipping-free">FREE</span>
                </div>

                {discountAmount > 0 && (
                  <div className="cart-summary-row cart-summary-row--discount">
                    <span>Discount &nbsp;·&nbsp; {couponCode}</span>
                    <span>−₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="cart-summary-row">
                  <span>Taxes</span>
                  <span className="cart-tax-included">Included</span>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-total-row">
                  <span className="cart-summary-total-label">Total</span>
                  <span className="cart-summary-total-amount">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <p className="cart-summary-savings">
                    You&apos;re saving ₹{discountAmount.toLocaleString('en-IN')} on this order
                  </p>
                )}

                <button
                  type="button"
                  className={`cart-checkout-btn ${checkoutNotice ? 'is-loading' : ''}`}
                  onClick={handleProceedCheckout}
                >
                  {checkoutNotice ? 'Securing order...' : 'Proceed to checkout →'}
                </button>
              </div>

              <Link to="/product_listing" className="cart-continue-link">
                Continue shopping &nbsp;←
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

export default Cart
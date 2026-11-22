import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import './Wishlist.css'

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [addedItems, setAddedItems] = useState({})
  const [movedAll, setMovedAll] = useState(false)

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    setAddedItems((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }))
    }, 1200)
  }

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => addToCart(product, 1))
    setMovedAll(true)
    setTimeout(() => {
      setMovedAll(false)
    }, 2500)
  }

  return (
    <main className="wishlist-page">
      <div className="wishlist-container">
        {/* Breadcrumb */}
        <nav className="wishlist-breadcrumb" aria-label="Breadcrumb">
          <Link to="/home">Home</Link>
          <span className="wishlist-breadcrumb__divider">/</span>
          <span className="wishlist-breadcrumb__current">Wishlist</span>
        </nav>

        {/* Page Header */}
        <header className="wishlist-header">
          <div className="wishlist-header__copy">
            <h1 className="wishlist-title">Saved for your garage.</h1>
            <p className="wishlist-subtitle">
              {wishlist.length} {wishlist.length === 1 ? 'collectible' : 'collectibles'} you&apos;ve got your eye on.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              type="button"
              className={`wishlist-move-all-btn ${movedAll ? 'is-moved' : ''}`}
              onClick={handleMoveAllToCart}
            >
              {movedAll ? '✓ Moved to cart' : 'Move all to cart'}
            </button>
          )}
        </header>

        {/* Product Cards Grid or Empty State */}
        {wishlist.length === 0 ? (
          <div className="wishlist-empty-state">
            <div className="wishlist-empty-icon">♡</div>
            <h2>Your garage is empty</h2>
            <p>Explore our curated diecast models and tap the heart icon to save your favorites.</p>
            <Link to="/product_listing" className="wishlist-explore-btn">
              Explore collectibles
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => {
              const isAdded = !!addedItems[product.id]

              return (
                <article className="wishlist-card" key={product.id}>
                  <div className="wishlist-card__media">
                    <Link
                      to={`/product_details/${product.id}`}
                      aria-label={`View ${product.name}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />
                    </Link>
                    <button
                      type="button"
                      className="wishlist-card__heart"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      title="Remove from wishlist"
                    >
                      ♡
                    </button>
                  </div>

                  <div className="wishlist-card__body">
                    <div className="wishlist-card__tag">
                      {product.brandTag}
                    </div>

                    <h2 className="wishlist-card__title">
                      <Link to={`/product_details/${product.id}`}>{product.name}</Link>
                    </h2>

                    <div className="wishlist-card__meta">
                      <span className="wishlist-card__rating">
                        ★ {product.rating}
                      </span>
                      {product.reviews && (
                        <span className="wishlist-card__reviews">
                          ({product.reviews})
                        </span>
                      )}
                      <span className="wishlist-card__dot">•</span>
                      <span className="wishlist-card__stock">In stock</span>
                    </div>

                    <div className="wishlist-card__footer">
                      <span className="wishlist-card__price">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        className={`wishlist-card__add ${
                          isAdded ? 'wishlist-card__add--added' : ''
                        }`}
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {isAdded ? '✓' : '+'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Bottom Banner */}
        {wishlist.length > 0 && (
          <div className="wishlist-banner" role="note">
            <p>Good things don&apos;t stay in stock forever. Your saved picks are waiting.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Wishlist
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import '../Wishlist/Wishlist.css'

function AccountWishlist() {
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
    <div className="account-wishlist">
      <header className="account-heading account-wishlist__header">
        <div>
          <h1>Wishlist.</h1>
          <p>
            {wishlist.length} {wishlist.length === 1 ? 'collectible' : 'collectibles'} saved for your garage.
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

      {wishlist.length === 0 ? (
        <div className="wishlist-empty-state">
          <div className="wishlist-empty-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>Explore our curated diecast models and tap the heart icon to save your favorites.</p>
          <Link to="/product_listing" className="wishlist-explore-btn">
            Explore collectibles
          </Link>
        </div>
      ) : (
        <>
          <div className="wishlist-grid account-wishlist__grid">
            {wishlist.map((product) => {
              const isAdded = Boolean(addedItems[product.id])
              const priceValue = Number(product.price || 0)

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
                    {(product.brandTag || product.brand) && (
                      <div className="wishlist-card__tag">
                        {product.brandTag || product.brand}
                      </div>
                    )}

                    <h2 className="wishlist-card__title">
                      <Link to={`/product_details/${product.id}`}>{product.name}</Link>
                    </h2>

                    <div className="wishlist-card__meta">
                      {product.rating && (
                        <span className="wishlist-card__rating">
                          ★ {product.rating}
                        </span>
                      )}
                      {product.reviews && (
                        <span className="wishlist-card__reviews">
                          ({product.reviews})
                        </span>
                      )}
                      {(product.rating || product.reviews) && (
                        <span className="wishlist-card__dot">•</span>
                      )}
                      <span className="wishlist-card__stock">In stock</span>
                    </div>

                    <div className="wishlist-card__footer">
                      <span className="wishlist-card__price">
                        ₹{priceValue.toLocaleString('en-IN')}
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

          <div className="wishlist-banner" role="note">
            <p>Good things don&apos;t stay in stock forever. Your saved picks are waiting.</p>
          </div>
        </>
      )}
    </div>
  )
}

export default AccountWishlist

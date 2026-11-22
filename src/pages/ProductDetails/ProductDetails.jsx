import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext.jsx'
import supraImage from '../../assets/images/07a9431e8b005f2559ec35d4678f0e2a0f2c4b73.png'
import porscheImage from '../../assets/images/183b86ba9b7783d8e8c3cf047ad82b14dc5984fd.png'
import skylineImage from '../../assets/images/9062b76dc21645cb357456380dbf236aa64f9583.jpg'
import defenderImage from '../../assets/images/cd63661889dad3d8cbd1714ec55b6ec7a12450ca.png'
import './ProductDetails.css'

const PRODUCTS_DATABASE = {
  1: {
    id: 1,
    name: 'Nissan Skyline GT-R R34',
    shortName: 'Nissan GT-R R34',
    brand: 'Mini GT',
    brandTag: 'MINI GT / 1:64 SCALE',
    scale: '1:64',
    color: 'Bayside Blue',
    modelCode: 'Model #MGT00571',
    rating: '4.9',
    ratingScore: '4.9 | 5',
    reviewsCount: '124',
    price: 1299,
    originalPrice: 1499,
    discount: 'SAVE 13%',
    stockCount: 8,
    stockStatus: 'In stock - Only 8 left',
    description:
      'An icon, down to the last detail. Precision diecast body, rubber tyres and an authentic Bayside Blue finish.',
    material: 'Diecast metal / rubber tyres',
    dimensions: '7.2 × 3.1 × 2.4 cm',
    recommendedAge: '14+ · Collector model',
    testimonialHeading: 'Made for the detail-obsessed.',
    testimonialQuote:
      '“The paint, wheels and stance are spot on. A must-have for any JDM collection.”',
    testimonialAuthor: 'Arjun M. · Verified collector',
    image: skylineImage,
  },
  2: {
    id: 2,
    name: 'Porsche 911 GT3 RS',
    shortName: 'Porsche 911 GT3 RS',
    brand: 'Hot Wheels',
    brandTag: 'HOT WHEELS / 1:64 SCALE',
    scale: '1:64',
    color: 'Lava Orange',
    modelCode: 'Model #HWP00911',
    rating: '4.8',
    ratingScore: '4.8 | 5',
    reviewsCount: '98',
    price: 899,
    originalPrice: 1099,
    discount: 'SAVE 18%',
    stockCount: 5,
    stockStatus: 'In stock - Only 5 left',
    description:
      'Track weapon in 1:64 scale. Aerodynamic wing, lightweight alloys and authentic Weissach package detailing.',
    material: 'Diecast metal / rubber tyres',
    dimensions: '7.1 × 3.0 × 2.2 cm',
    recommendedAge: '14+ · Collector model',
    testimonialHeading: 'Track-ready precision.',
    testimonialQuote:
      '“The aero detail, stance and paint finish are unmatched at this price point.”',
    testimonialAuthor: 'Vikram S. · Verified collector',
    image: porscheImage,
  },
  3: {
    id: 3,
    name: 'Land Rover Defender 110',
    shortName: 'Land Rover Defender',
    brand: 'Matchbox',
    brandTag: 'MATCHBOX / 1:64 SCALE',
    scale: '1:64',
    color: 'Pangea Green',
    modelCode: 'Model #MBX00110',
    rating: '4.8',
    ratingScore: '4.8 | 5',
    reviewsCount: '82',
    price: 649,
    originalPrice: 799,
    discount: 'SAVE 19%',
    stockCount: 12,
    stockStatus: 'In stock - Only 12 left',
    description:
      'Legendary off-road capability in miniature. Rugged chassis, roof rack, and authentic terrain-ready wheels.',
    material: 'Diecast metal / rubber tyres',
    dimensions: '7.5 × 3.2 × 2.8 cm',
    recommendedAge: '14+ · Collector model',
    testimonialHeading: 'Built for rugged nostalgia.',
    testimonialQuote:
      '“Heavier cast than usual, great green finish and crisp details. A real classic piece.”',
    testimonialAuthor: 'Karan P. · Verified collector',
    image: defenderImage,
  },
  4: {
    id: 4,
    name: 'Toyota Supra MK4 Turbo',
    shortName: 'Toyota Supra MK4',
    brand: 'Mini GT',
    brandTag: 'MINI GT / 1:64 SCALE',
    scale: '1:64',
    color: 'Super White',
    modelCode: 'Model #MGT00080',
    rating: '4.9',
    ratingScore: '4.9 | 5',
    reviewsCount: '156',
    price: 1199,
    originalPrice: 1399,
    discount: 'SAVE 14%',
    stockCount: 4,
    stockStatus: 'In stock - Only 4 left',
    description:
      'The tuner king. Twin turbo stance, polished silver rims, and precision cast rear wing in pristine white.',
    material: 'Diecast metal / rubber tyres',
    dimensions: '7.0 × 3.0 × 2.3 cm',
    recommendedAge: '14+ · Collector model',
    testimonialHeading: 'The 90s legend reborn.',
    testimonialQuote:
      '“Stunning detail on the headlights, exhaust and factory wing. Timeless silhouette.”',
    testimonialAuthor: 'Rahul D. · Verified collector',
    image: supraImage,
  },
}

// Recommended / Related products
const RELATED_PRODUCTS = [
  {
    id: 1,
    name: 'Nissan GT-R R34',
    brandTag: 'MINI GT / 1:64 SCALE',
    rating: '4.8 (124)',
    inStock: true,
    price: 1299,
    image: skylineImage,
  },
  {
    id: 2,
    name: 'Porsche 911 GT3 RS',
    brandTag: 'HOT WHEELS / 1:64 SCALE',
    rating: '4.8 (124)',
    inStock: true,
    price: 899,
    image: porscheImage,
  },
  {
    id: 3,
    name: 'Land Rover Defender',
    brandTag: 'MATCHBOX / 1:64 SCALE',
    rating: '4.8 (124)',
    inStock: true,
    price: 649,
    image: defenderImage,
  },
  {
    id: 4,
    name: 'Toyota Supra MK4',
    brandTag: 'MINI GT / 1:64 SCALE',
    rating: '4.8 (124)',
    inStock: true,
    price: 1199,
    image: supraImage,
  },
]

function ProductDetails() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const productId = Number(id || searchParams.get('id')) || 1
  const product = PRODUCTS_DATABASE[productId] || PRODUCTS_DATABASE[1]
  const isSaved = isWishlisted(product.id)

  const [quantity, setQuantity] = useState(1)
  const [selectedThumb, setSelectedThumb] = useState(0)
  const [activeTab, setActiveTab] = useState('details')
  const [addedNotice, setAddedNotice] = useState(false)
  const [zoomStyle, setZoomStyle] = useState({})

  // Reset states when product changes
  useEffect(() => {
    setQuantity(1)
    setSelectedThumb(0)
    setAddedNotice(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId])

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.5)',
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)',
    })
  }

  const handleAddToCart = () => {
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 2000)
  }

  const thumbnails = [
    product.image,
    product.image,
    product.image,
    product.image,
  ]

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/home">Home</Link>
          <span className="pd-breadcrumb__divider">/</span>
          <Link to="/product_listing">{product.brand}</Link>
          <span className="pd-breadcrumb__divider">/</span>
          <span className="pd-breadcrumb__current">{product.name}</span>
        </nav>

        {/* Main Product Section: Gallery & Info */}
        <section className="pd-hero" aria-label="Product display and purchasing options">
          {/* Left Column: Image Gallery */}
          <div className="pd-gallery">
            <div
              className="pd-gallery__main"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={thumbnails[selectedThumb]}
                alt={product.name}
                style={zoomStyle}
                className="pd-gallery__main-img"
              />
              <span className="pd-gallery__zoom-hint" aria-hidden="true">
                <span className="pd-gallery__zoom-icon">⌕</span> Hover to zoom
              </span>
            </div>

            {/* Thumbnail Row */}
            <div className="pd-thumbnails" role="tablist" aria-label="Product image thumbnails">
              {thumbnails.map((thumb, index) => (
                <button
                  type="button"
                  key={index}
                  className={`pd-thumbnail-btn ${selectedThumb === index ? 'is-active' : ''}`}
                  onClick={() => setSelectedThumb(index)}
                  aria-label={`View image angle ${index + 1}`}
                >
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="pd-info">
            <div className="pd-info__tag">{product.brandTag}</div>
            <h1 className="pd-info__title">{product.name}</h1>
            <p className="pd-info__subtitle">
              {product.color} &nbsp;·&nbsp; {product.modelCode}
            </p>

            {/* Star Rating & Reviews */}
            <div className="pd-info__rating">
              <span className="pd-info__stars" aria-label="Rating: 5 stars">
                ★★★★★
              </span>
              <span className="pd-info__rating-text">
                {product.ratingScore} &nbsp;·&nbsp; {product.reviewsCount} reviews
              </span>
            </div>

            {/* Price Row */}
            <div className="pd-price-block">
              <div className="pd-price-row">
                <span className="pd-price-current">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="pd-price-original">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="pd-discount-badge">{product.discount}</span>
              </div>
              <span className="pd-price-tax-note">Inclusive of all taxes</span>
            </div>

            {/* Stock Indicator */}
            <div className="pd-stock">
              <span className="pd-stock__dot" aria-hidden="true" />
              <span className="pd-stock__text">{product.stockStatus}</span>
            </div>

            {/* Product Description */}
            <p className="pd-description">{product.description}</p>

            {/* Quantity Selector & Add to Cart */}
            <div className="pd-purchase-row">
              <div className="pd-quantity" aria-label="Quantity selector">
                <button
                  type="button"
                  className="pd-qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="pd-qty-value">{quantity}</span>
                <button
                  type="button"
                  className="pd-qty-btn"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`pd-add-to-cart-btn ${addedNotice ? 'is-added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedNotice ? '✓ Added to bag' : 'Add to cart'}
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              type="button"
              className="pd-buy-now-btn"
              onClick={handleAddToCart}
            >
              Buy now
            </button>

            {/* Wishlist & Share Links */}
            <div className="pd-actions-row">
              <button
                type="button"
                className="pd-action-link"
                onClick={() => toggleWishlist(product)}
              >
                <span className="pd-heart-icon">{isSaved ? '♥' : '♡'}</span>
                <span>{isSaved ? 'Added to wishlist' : 'Add to wishlist'}</span>
              </button>
              <span className="pd-actions-divider">·</span>
              <button
                type="button"
                className="pd-action-link"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Product link copied to clipboard!')
                  }
                }}
              >
                Share <span aria-hidden="true">↗</span>
              </button>
            </div>

            {/* Trust Features */}
            <div className="pd-trust-row" aria-label="Guarantees">
              <span>✓ Authentic casting</span>
              <span className="pd-trust-dot">·</span>
              <span>✓ Secure payment</span>
              <span className="pd-trust-dot">·</span>
              <span>✓ Safe packaging</span>
            </div>
          </div>
        </section>

        {/* Tabs Section: Details, Shipping, Reviews */}
        <section className="pd-tabs-section" aria-label="Specifications and details">
          <div className="pd-tab-headers" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'details'}
              className={`pd-tab-header ${activeTab === 'details' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details &amp; specifications
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'shipping'}
              className={`pd-tab-header ${activeTab === 'shipping' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping &amp; returns
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'reviews'}
              className={`pd-tab-header ${activeTab === 'reviews' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewsCount})
            </button>
          </div>

          <div className="pd-tab-content">
            {activeTab === 'details' && (
              <div className="pd-details-grid">
                {/* Left Table */}
                <div className="pd-spec-table">
                  <div className="pd-spec-row">
                    <span className="pd-spec-label">Brand</span>
                    <span className="pd-spec-value">{product.brand}</span>
                  </div>
                  <div className="pd-spec-row">
                    <span className="pd-spec-label">Scale</span>
                    <span className="pd-spec-value">{product.scale}</span>
                  </div>
                  <div className="pd-spec-row">
                    <span className="pd-spec-label">Material</span>
                    <span className="pd-spec-value">{product.material}</span>
                  </div>
                  <div className="pd-spec-row">
                    <span className="pd-spec-label">Dimensions</span>
                    <span className="pd-spec-value">{product.dimensions}</span>
                  </div>
                  <div className="pd-spec-row">
                    <span className="pd-spec-label">Recommended age</span>
                    <span className="pd-spec-value">{product.recommendedAge}</span>
                  </div>
                </div>

                {/* Right Collector Quote */}
                <div className="pd-testimonial">
                  <h3 className="pd-testimonial__heading">
                    {product.testimonialHeading}
                  </h3>
                  <blockquote className="pd-testimonial__quote">
                    {product.testimonialQuote}
                  </blockquote>
                  <div className="pd-testimonial__author">
                    <span className="pd-testimonial__stars">★★★★★</span>
                    <span>{product.testimonialAuthor}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="pd-shipping-content">
                <h3>Delivery &amp; Packaging Promise</h3>
                <p>
                  All collectible diecast models are dispatched in reinforced dual-wall box packaging with shock-absorbing foam inserts to guarantee collector-grade box condition.
                </p>
                <ul>
                  <li><strong>Free express delivery:</strong> On orders above ₹1,999.</li>
                  <li><strong>Estimated transit:</strong> 2-4 business days across India.</li>
                  <li><strong>7-Day replacement:</strong> Hassle-free replacement for transit damage.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="pd-reviews-content">
                <div className="pd-reviews-summary">
                  <span className="pd-reviews-big">{product.rating}</span>
                  <div>
                    <div className="pd-testimonial__stars">★★★★★</div>
                    <p>Based on {product.reviewsCount} verified collector ratings</p>
                  </div>
                </div>
                <blockquote className="pd-testimonial__quote">
                  {product.testimonialQuote}
                </blockquote>
                <p className="pd-testimonial__author">
                  <span>{product.testimonialAuthor}</span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* "Your garage, upgraded." Related Products Section */}
        <section className="pd-related" aria-label="Related collectibles">
          <h2 className="pd-related__title">Your garage, upgraded.</h2>
          <div className="pd-related__grid">
            {RELATED_PRODUCTS.map((item) => (
              <article className="pd-related-card" key={item.id}>
                <div className="pd-related-card__media">
                  <Link
                    to={`/product_details/${item.id}`}
                    aria-label={`View ${item.name}`}
                  >
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </Link>
                  <button
                    type="button"
                    className="pd-related-card__wishlist"
                    onClick={() => toggleWishlist(item)}
                    aria-label={
                      isWishlisted(item.id)
                        ? `Remove ${item.name} from wishlist`
                        : `Add ${item.name} to wishlist`
                    }
                  >
                    {isWishlisted(item.id) ? '♥' : '♡'}
                  </button>
                </div>

                <div className="pd-related-card__body">
                  <div className="pd-related-card__tag">{item.brandTag}</div>
                  <h3 className="pd-related-card__title">
                    <Link to={`/product_details/${item.id}`}>{item.name}</Link>
                  </h3>
                  <div className="pd-related-card__meta">
                    <span>★ {item.rating}</span>
                    <span>•</span>
                    <span>In stock</span>
                  </div>
                  <div className="pd-related-card__footer">
                    <span className="pd-related-card__price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      type="button"
                      className="pd-related-card__add"
                      onClick={handleAddToCart}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProductDetails
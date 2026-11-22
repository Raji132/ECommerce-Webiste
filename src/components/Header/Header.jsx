import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import './Header.css'

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { wishlistCount } = useWishlist()
  const { cartCount } = useCart()

  const currentSearchParam = searchParams.get('q') || searchParams.get('search') || ''
  const [searchInputValue, setSearchInputValue] = useState(currentSearchParam)

  // Keep input synced when URL query changes
  useEffect(() => {
    setSearchInputValue(currentSearchParam)
  }, [currentSearchParam])

  const isAuthPage = [
    '/login',
    '/register',
    '/forgot-password',
    '/verify-code',
    '/reset-password',
  ].includes(pathname)

  function handleSearch(event) {
    event.preventDefault()
    const trimmed = searchInputValue.trim()
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/product_listing')
  }

  function handleInputChange(event) {
    const val = event.target.value
    setSearchInputValue(val)
    if (val.trim() === '' && (pathname === '/search' || pathname === '/search_results')) {
      navigate('/product_listing')
    }
  }

  const isListingActive = [
    '/product_listing',
    '/product-listing',
    '/shop',
    '/services',
  ].includes(pathname)

  return (
    <header className="site-header site-header--store">
      {/* Top Black Announcement Bar */}
      <div className="store-announcement-bar">
        <p className="store-announcement-bar__text">
          FOR THE LOVE OF SMALL CARS. Free shipping on orders ₹1,999+ &nbsp;•&nbsp; 100% authentic collectibles
        </p>
      </div>

      {/* Main Store Header */}
      <div className="store-header__top">
        <Link className="site-header__brand" to="/home" aria-label="Apex Collectibles home">
          <span className="site-header__brand-name">APEX</span>
          <span className="site-header__brand-caption">COLLECTIBLES</span>
        </Link>

        {!isAuthPage && (
          <form className="store-header__search" onSubmit={handleSearch} role="search">
            <input
              type="search"
              name="search"
              value={searchInputValue}
              onChange={handleInputChange}
              placeholder="Search cars, brands, castings and more"
              aria-label="Search cars, brands, castings and more"
            />
            <button type="submit" aria-label="Search">⌕</button>
          </form>
        )}

        <div className="site-header__actions" aria-label="Account links">
          <Link to="/login">Account</Link>
          <Link to="/wishlist" className={pathname === '/wishlist' ? 'is-active' : ''}>
            <span aria-hidden="true">♡</span> Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}
          </Link>
          <Link to="/cart" className={pathname === '/cart' || pathname === '/bag' ? 'is-active' : ''}>
            Bag ({cartCount})
          </Link>
        </div>
      </div>

      {/* Categories & Navigation Bottom Bar */}
      {!isAuthPage && (
        <div className="store-header__bottom">
          <nav className="site-header__navigation" aria-label="Shop navigation">
            <Link className={`site-header__link ${isListingActive ? 'is-active' : ''}`} to="/product_listing">Shop all</Link>
            <Link className="site-header__link" to="/product_listing">New arrivals</Link>
            <Link className="site-header__link" to="/product_listing">Hot Wheels</Link>
            <Link className="site-header__link" to="/product_listing">Mini GT</Link>
            <Link className="site-header__link" to="/product_listing">Matchbox</Link>
            <Link className="site-header__link" to="/product_listing">Collections</Link>
            <Link className="site-header__link" to="/product_listing">Accessories</Link>
          </nav>
          <Link className="store-header__sale" to="/product_listing">SALE <span aria-hidden="true">↗</span></Link>
        </div>
      )}
    </header>
  )
}

export default Header
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import './Header.css'

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  function handleSearch(event) {
    event.preventDefault()
    const search = new FormData(event.currentTarget).get('search')?.toString().trim()
    navigate(search ? `/home?search=${encodeURIComponent(search)}` : '/home')
  }

  if (pathname === '/home' || pathname === '/') {
    return (
      <header className="site-header site-header--home">
        <div className="store-header__top">
          <Link className="site-header__brand" to="/home" aria-label="Apex Collectibles home">
            <span className="site-header__brand-name">APEX</span>
            <span className="site-header__brand-caption">COLLECTIBLES</span>
          </Link>
          <form className="store-header__search" onSubmit={handleSearch} role="search">
            <input
              type="search"
              name="search"
              defaultValue={searchParams.get('search') || ''}
              placeholder="Search cars, brands and more"
              aria-label="Search cars, brands and more"
              onChange={(event) => {
                if (!event.currentTarget.value && searchParams.get('search')) {
                  navigate('/home')
                }
              }}
            />
            <button type="submit" aria-label="Search">⌕</button>
          </form>
          <div className="site-header__actions" aria-label="Account links">
            <Link to="/login">Account</Link>
            <Link to="/login"><span aria-hidden="true">♡</span> Wishlist</Link>
            <Link to="/home">Bag ()</Link>
          </div>
        </div>
        <div className="store-header__bottom">
          <nav className="site-header__navigation" aria-label="Shop navigation">
            <Link className="site-header__link" to="/services">Shop all</Link>
            <Link className="site-header__link" to="/services">New arrivals</Link>
            <Link className="site-header__link" to="/services">Hot Wheels</Link>
            <Link className="site-header__link" to="/services">Mini GT</Link>
            <Link className="site-header__link" to="/services">Matchbox</Link>
            <Link className="site-header__link" to="/services">Collections</Link>
            <Link className="site-header__link" to="/services">Accessories</Link>
          </nav>
          <Link className="store-header__sale" to="/services">SALE <span aria-hidden="true">↗</span></Link>
        </div>
      </header>
    )
  }

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link className="site-header__brand" to="/home" aria-label="Apex Collectibles home">
          <span className="site-header__brand-name">APEX</span>
          <span className="site-header__brand-caption">COLLECTIBLES</span>
        </Link>
        <nav className="site-header__navigation" aria-label="Main navigation">
          <Link className="site-header__link" to="/home">Shop all</Link>
          <Link className="site-header__link" to="/services">New arrivals</Link>
          <Link className="site-header__link" to="/for-professionals">Brands</Link>
          <Link className="site-header__link" to="/services">Collections</Link>
        </nav>
        <div className="site-header__actions" aria-label="Account links">
          <Link to="/login">Account</Link>
          <Link to="/login"><span aria-hidden="true">♡</span> Wishlist</Link>
          <Link to="/home">Bag (2)</Link>
        </div>
      </div>
    </header>
  )
}

export default Header

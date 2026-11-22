import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  const isMinimalFooter = [
    '/login',
    '/register',
    '/forgot-password',
    '/verify-code',
    '/reset-password',
    '/cart',
    '/bag',
    '/add_to_cart',
    '/add-to-cart',
  ].includes(pathname)

  if (isMinimalFooter) {
    return (
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <strong>APEX&nbsp; / &nbsp;COLLECTIBLES</strong>
            <span>© {year} APEX Collectibles. All rights reserved.</span>
          </div>
          <div className="site-footer__details">
            <p>100% authentic · Secure checkout · Collector-first support</p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="site-footer site-footer--home">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <strong className="home-footer__logo">APEX</strong>
          <span className="home-footer__tagline">Small scale. Endless obsession.</span>
          <span>Curated diecast. Authentic brands. Collector-first.</span>
        </div>

        <div className="home-footer-columns">
          <section>
            <h2>EXPLORE</h2>
            <Link to="/product_listing">New arrivals</Link>
            <Link to="/product_listing">Bestsellers</Link>
            <Link to="/product_listing">Premium collections</Link>
          </section>
          <section>
            <h2>HELP</h2>
            <Link to="/how-it-works">Shipping &amp; delivery</Link>
            <Link to="/how-it-works">Returns &amp; refunds</Link>
            <Link to="/how-it-works">Contact us</Link>
          </section>
          <section>
            <h2>STAY IN THE LOOP</h2>
            <p>New drops. No noise.<br />Your email address.</p>
            <form className="home-footer__subscribe" onSubmit={(event) => event.preventDefault()}>
              <label className="visually-hidden" htmlFor="footer-email">Your email address</label>
              <input id="footer-email" type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          </section>
        </div>

        <div className="home-footer__bottom">
          <span>© {year} APEX Collectibles</span>
          <i aria-hidden="true">·</i>
          <Link to="/home">Privacy policy</Link>
          <i aria-hidden="true">·</i>
          <Link to="/home">Terms of service</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
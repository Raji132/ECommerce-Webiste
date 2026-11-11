import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === '/home'
  const year = new Date().getFullYear()

  return (
    <footer className={`site-footer${isHome ? ' site-footer--home' : ''}`}>
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          {isHome ? (
            <>
              <strong className="home-footer__logo">APEX</strong>
              <span className="home-footer__tagline">Small scale. Endless obsession.</span>
              <span>Curated diecast. Authentic brands. Collector-first.</span>
            </>
          ) : (
            <>
              <strong>APEX&nbsp; / &nbsp;COLLECTIBLES</strong>
              <span>© {year} Apex Collectibles. All rights reserved.</span>
            </>
          )}
        </div>

        {!isHome && <div className="site-footer__details"><p>100% authentic · Secure checkout · Collector-first support</p></div>}

        {isHome && (
          <>
            <div className="home-footer-columns">
              <section>
                <h2>EXPLORE</h2>
                <Link to="/services">New arrivals</Link>
                <Link to="/services">Best sellers</Link>
                <Link to="/services">Premium collection</Link>
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
          </>
        )}
      </div>
    </footer>
  )
}

export default Footer

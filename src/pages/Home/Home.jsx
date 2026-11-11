import { Link, useSearchParams } from 'react-router-dom'
import loginImage from '../../assets/images/login_logo.jpg'
import supraImage from '../../assets/images/07a9431e8b005f2559ec35d4678f0e2a0f2c4b73.png'
import porscheImage from '../../assets/images/183b86ba9b7783d8e8c3cf047ad82b14dc5984fd.png'
import skylineImage from '../../assets/images/9062b76dc21645cb357456380dbf236aa64f9583.jpg'
import defenderImage from '../../assets/images/cd63661889dad3d8cbd1714ec55b6ec7a12450ca.png'
import './Home.css'

const categories = ['HOT WHEELS', 'MINI GT', 'MATCHBOX', 'TARMAC WORKS']

const arrivals = [
  { name: 'Supra Turbo Coupe', brand: 'MINI GT', price: '₹1,899', image: supraImage },
  { name: '911 GT3 RS', brand: 'HOT WHEELS', price: '₹1,299', image: porscheImage },
  { name: 'Skyline GT-R R34', brand: 'TARMAC WORKS', price: '₹2,499', image: skylineImage },
  { name: 'Defender 110', brand: 'MATCHBOX', price: '₹999', image: defenderImage },
]

const favorites = [
  { name: 'Skyline GT-R R34', brand: 'TARMAC WORKS', price: '₹2,499', image: skylineImage },
  { name: 'Defender 110', brand: 'MATCHBOX', price: '₹999', image: defenderImage },
  { name: 'Supra Turbo Coupe', brand: 'MINI GT', price: '₹1,899', image: supraImage },
  { name: '911 GT3 RS', brand: 'HOT WHEELS', price: '₹1,299', image: porscheImage },
]

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <article className="product-card" key={product.name}>
          <Link className="product-card__image" to="/services" aria-label={`View ${product.name}`}>
            <img
              src={product.image || loginImage}
              alt={product.image ? product.name : `Temporary product image for ${product.name}`}
              style={{ objectPosition: product.position ? `${product.position} center` : 'center' }}
            />
            {index === 0 && <span className="product-card__badge">NEW DROP</span>}
          </Link>
          <div className="product-card__info">
            <div>
              <span className="product-card__brand">{product.brand}</span>
              <h3><Link to="/services">{product.name}</Link></h3>
              <strong>{product.price}</strong>
            </div>
            <button type="button" aria-label={`Add ${product.name} to bag`}>+</button>
          </div>
        </article>
      ))}
    </div>
  )
}

function Home() {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('search') || '').trim()
  const searchableProducts = arrivals
  const matchingProducts = searchableProducts.filter((product) =>
    `${product.name} ${product.brand}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  )

  return (
    <main className="home-page">
      {query ? (
        <section className="home-section home-search-results" aria-live="polite">
          <div className="home-section__heading">
            <div>
              <p className="home-eyebrow">SEARCH</p>
              <h1>Results for “{query}”</h1>
            </div>
            <Link to="/home" className="home-text-link">Clear search</Link>
          </div>
          {matchingProducts.length ? (
            <ProductGrid products={matchingProducts} />
          ) : (
            <p className="home-search-empty">No products matched “{query}”. Try a car name or brand.</p>
          )}
        </section>
      ) : (
        <>
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="home-eyebrow">THE COLLECTOR&apos;S GARAGE</p>
          <h1>Small scale.<br />Legendary status.</h1>
          <p className="home-hero__description">Tiny cars. Big stories. Find the next icon for your shelf.</p>
          <Link className="home-button" to="/services">Explore the collection <span aria-hidden="true">→</span></Link>
        </div>
        <img className="home-hero__image" src={loginImage} alt="Blue collector model car on a dark road" />
        <div className="home-hero__index">01 <span /> 04</div>
      </section>

      <div className="home-trust" aria-label="Shopping benefits">
        <span>100% authentic</span><i aria-hidden="true" />
        <span>Secure checkout</span><i aria-hidden="true" />
        <span>Collector-first support</span>
      </div>

      <section className="home-section home-categories">
        <div className="home-section__heading">
          <div>
            <p className="home-eyebrow">YOUR NEXT OBSESSION</p>
            <h2>Find your next obsession.</h2>
            <p>Explore the names every collector knows.</p>
          </div>
          <Link to="/services" className="home-text-link">View all brands <span aria-hidden="true">→</span></Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className="category-tile" to="/services" key={category}>
              <span>{category}</span><span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <div>
            <p className="home-eyebrow">JUST ARRIVED</p>
            <h2>Fresh off the box.</h2>
          </div>
          <Link to="/services" className="home-text-link">Shop new arrivals <span aria-hidden="true">→</span></Link>
        </div>
        <ProductGrid products={arrivals} />
      </section>

      <section className="home-feature">
        <div>
          <p className="home-eyebrow">MORE THAN A MODEL</p>
          <h2>Not just a hobby.<br />A whole world.</h2>
          <p>Discover the stories, details, and community behind every little legend.</p>
        </div>
        <Link className="home-button home-button--dark" to="/how-it-works">Join the community <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-section home-favorites">
        <div className="home-section__heading">
          <div>
            <p className="home-eyebrow">LOVED BY COLLECTORS</p>
            <h2>The crowd favorites.</h2>
          </div>
          <Link to="/services" className="home-text-link">Shop best sellers <span aria-hidden="true">→</span></Link>
        </div>
        <ProductGrid products={favorites} />
      </section>
        </>
      )}
    </main>
  )
}

export default Home

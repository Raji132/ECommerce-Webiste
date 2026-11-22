import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext.jsx'
import supraImage from '../../assets/images/07a9431e8b005f2559ec35d4678f0e2a0f2c4b73.png'
import porscheImage from '../../assets/images/183b86ba9b7783d8e8c3cf047ad82b14dc5984fd.png'
import skylineImage from '../../assets/images/9062b76dc21645cb357456380dbf236aa64f9583.jpg'
import defenderImage from '../../assets/images/cd63661889dad3d8cbd1714ec55b6ec7a12450ca.png'
import './SearchResults.css'

const FULL_CATALOG = [
  {
    id: 1,
    name: 'Nissan GT-R R34',
    brand: 'Mini GT',
    brandTag: 'MINI GT / 1:64 SCALE',
    scale: '1:64',
    category: 'Diecast cars',
    rating: '4.8',
    reviews: '124',
    inStock: true,
    price: 1299,
    image: skylineImage,
    keywords: 'nissan skyline gt-r r34 jdm japanese sports coupe blue bayside',
  },
  {
    id: 4,
    name: 'Toyota Supra MK4',
    brand: 'Mini GT',
    brandTag: 'MINI GT / 1:64 SCALE',
    scale: '1:64',
    category: 'Diecast cars',
    rating: '4.8',
    reviews: '124',
    inStock: true,
    price: 1199,
    image: supraImage,
    keywords: 'toyota toyo supra mk4 jdm japanese sports coupe white turbo',
  },
  {
    id: 2,
    name: 'Porsche 911 GT3 RS',
    brand: 'Hot Wheels',
    brandTag: 'HOT WHEELS / 1:64 SCALE',
    scale: '1:64',
    category: 'Diecast cars',
    rating: '4.8',
    reviews: '98',
    inStock: true,
    price: 899,
    image: porscheImage,
    keywords: 'porsche 911 gt3 rs german track supercar orange weissach hot wheels',
  },
  {
    id: 3,
    name: 'Land Rover Defender',
    brand: 'Matchbox',
    brandTag: 'MATCHBOX / 1:64 SCALE',
    scale: '1:64',
    category: 'Diecast cars',
    rating: '4.8',
    reviews: '82',
    inStock: true,
    price: 649,
    image: defenderImage,
    keywords: 'land rover defender 110 suv 4x4 offroad green matchbox',
  },
  {
    id: 5,
    name: 'Nissan GT-R R34 V-Spec',
    brand: 'Mini GT',
    brandTag: 'MINI GT / 1:64 SCALE',
    scale: '1:64',
    category: 'Diecast cars',
    rating: '4.9',
    reviews: '142',
    inStock: true,
    price: 1299,
    image: skylineImage,
    keywords: 'nissan skyline gt-r r34 v-spec jdm japanese sports blue',
  },
  {
    id: 8,
    name: 'Toyota Supra MK4 Turbo',
    brand: 'Mini GT',
    brandTag: 'MINI GT / 1:64 SCALE',
    scale: '1:64',
    category: 'Diecast cars',
    rating: '4.9',
    reviews: '156',
    inStock: true,
    price: 1199,
    image: supraImage,
    keywords: 'toyota toyo supra mk4 turbo twin turbo jdm white coupe',
  },
  {
    id: 6,
    name: 'Porsche 911 GT3 RS Weissach',
    brand: 'Hot Wheels',
    brandTag: 'HOT WHEELS / 1:64 SCALE',
    scale: '1:64',
    category: 'Diecast cars',
    rating: '4.8',
    reviews: '110',
    inStock: true,
    price: 899,
    image: porscheImage,
    keywords: 'porsche 911 gt3 rs weissach hot wheels orange track car',
  },
  {
    id: 7,
    name: 'Land Rover Defender 110',
    brand: 'Matchbox',
    brandTag: 'MATCHBOX / 1:64 SCALE',
    scale: '1:64',
    category: 'Diecast cars',
    rating: '4.7',
    reviews: '64',
    inStock: true,
    price: 649,
    image: defenderImage,
    keywords: 'land rover defender 110 4x4 offroad green matchbox adventure',
  },
]

const ITEMS_PER_PAGE = 8

function SearchResults() {
  const [searchParams] = useSearchParams()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const rawQuery = searchParams.get('q') || searchParams.get('search') || ''
  const searchQuery = rawQuery.trim()
  const hasQuery = searchQuery.length > 0

  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedScales, setSelectedScales] = useState([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [maxPrice, setMaxPrice] = useState(4999)
  const [sortBy, setSortBy] = useState('featured')
  const [addedItems, setAddedItems] = useState({})
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
    setCurrentPage(1)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
    setCurrentPage(1)
  }

  const handleScaleChange = (scale) => {
    setSelectedScales((prev) =>
      prev.includes(scale) ? prev.filter((s) => s !== scale) : [...prev, scale]
    )
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedScales([])
    setInStockOnly(false)
    setMaxPrice(4999)
    setCurrentPage(1)
  }

  const handleAddToCart = (idx) => {
    setAddedItems((prev) => ({ ...prev, [idx]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [idx]: false }))
    }, 1200)
  }

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    const queryLower = searchQuery.toLowerCase()

    return FULL_CATALOG.filter((product) => {
      if (hasQuery) {
        const matchesName = product.name.toLowerCase().includes(queryLower)
        const matchesBrand = product.brand.toLowerCase().includes(queryLower)
        const matchesKeywords = product.keywords.toLowerCase().includes(queryLower)
        const matchesTag = product.brandTag.toLowerCase().includes(queryLower)

        if (!matchesName && !matchesBrand && !matchesKeywords && !matchesTag) {
          return false
        }
      }

      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }
      if (selectedScales.length > 0 && !selectedScales.includes(product.scale)) {
        return false
      }
      if (inStockOnly && !product.inStock) {
        return false
      }
      if (product.price > maxPrice) {
        return false
      }
      return true
    })
  }, [hasQuery, searchQuery, selectedBrands, selectedCategories, selectedScales, inStockOnly, maxPrice])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return Number(b.rating) - Number(a.rating)
      return 0
    })
  }, [filteredProducts, sortBy])

  // Real dynamic total pages
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE))

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  // Paginated items
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [sortedProducts, currentPage])

  // Dynamic page numbers: ONLY show pages that exist!
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages]
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, '...', currentPage, '...', totalPages]
  }, [totalPages, currentPage])

  const startIndex = sortedProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)

  return (
    <main className="search-page">
      <div className="search-container">
        {/* Breadcrumb */}
        <nav className="search-breadcrumb" aria-label="Breadcrumb">
          <Link to="/home">Home</Link>
          <span className="search-breadcrumb__divider">/</span>
          <span className="search-breadcrumb__current">
            {hasQuery ? 'Search' : 'Shop all'}
          </span>
        </nav>

        {/* Heading Section */}
        <header className="search-header">
          {hasQuery ? (
            <>
              <h1 className="search-title">Results for &ldquo;{searchQuery}&rdquo;</h1>
              <p className="search-subtitle">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'result' : 'results'} &nbsp;•&nbsp;{' '}
                {sortedProducts.length > 0
                  ? 'Discover authentic collector castings.'
                  : 'No matching collectibles found.'}
              </p>
            </>
          ) : (
            <>
              <h1 className="search-title">Find your next grail.</h1>
              <p className="search-subtitle">
                Diecast icons, handpicked for your collection. {sortedProducts.length} collectibles.
              </p>
            </>
          )}
        </header>

        {/* Mobile Filter Toggle Bar */}
        <div className="search-mobile-filter-bar">
          <button
            type="button"
            className="search-filter-toggle-btn"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            aria-expanded={mobileFilterOpen}
          >
            <span>⚙ Filters {selectedBrands.length > 0 ? `(${selectedBrands.length})` : ''}</span>
            <span>{mobileFilterOpen ? '▲ Hide' : '▼ Show'}</span>
          </button>

          <div className="search-mobile-sort">
            <label htmlFor="search-mobile-sort-select">Sort by:</label>
            <select
              id="search-mobile-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Sidebar + Product Cards */}
        <div className="search-layout">
          {/* Sidebar */}
          <aside
            className={`search-sidebar ${mobileFilterOpen ? 'search-sidebar--open' : ''}`}
            aria-label="Filter search results"
          >
            <div className="search-sidebar__header">
              <h2>Filters</h2>
              <button
                type="button"
                className="search-sidebar__reset"
                onClick={handleResetFilters}
              >
                Reset
              </button>
            </div>

            {/* BRANDS */}
            <div className="search-filter-group">
              <h3 className="search-filter-group__title">BRANDS</h3>
              <div className="search-filter-options">
                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes('Mini GT')}
                    onChange={() => handleBrandChange('Mini GT')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">Mini GT</span>
                </label>

                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes('Hot Wheels')}
                    onChange={() => handleBrandChange('Hot Wheels')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">Hot Wheels</span>
                </label>

                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes('Matchbox')}
                    onChange={() => handleBrandChange('Matchbox')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">Matchbox</span>
                </label>
              </div>
            </div>

            {/* CATEGORY */}
            <div className="search-filter-group">
              <h3 className="search-filter-group__title">CATEGORY</h3>
              <div className="search-filter-options">
                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('Diecast cars')}
                    onChange={() => handleCategoryChange('Diecast cars')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">Diecast cars</span>
                </label>

                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('Premium series')}
                    onChange={() => handleCategoryChange('Premium series')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">Premium series</span>
                </label>

                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('Limited editions')}
                    onChange={() => handleCategoryChange('Limited editions')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">Limited editions</span>
                </label>
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="search-filter-group">
              <h3 className="search-filter-group__title">PRICE RANGE</h3>
              <div className="search-price-slider-wrap">
                <input
                  type="range"
                  min="199"
                  max="4999"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="search-price-range"
                  aria-label="Price range"
                />
                <div className="search-price-values">
                  <span>₹199</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* SCALE */}
            <div className="search-filter-group">
              <h3 className="search-filter-group__title">SCALE</h3>
              <div className="search-filter-options">
                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedScales.includes('1:64')}
                    onChange={() => handleScaleChange('1:64')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">1:64</span>
                </label>

                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedScales.includes('1:43')}
                    onChange={() => handleScaleChange('1:43')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">1:43</span>
                </label>

                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedScales.includes('1:24')}
                    onChange={() => handleScaleChange('1:24')}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">1:24</span>
                </label>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="search-filter-group">
              <h3 className="search-filter-group__title">AVAILABILITY</h3>
              <div className="search-filter-options">
                <label className="search-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => {
                      setInStockOnly(e.target.checked)
                      setCurrentPage(1)
                    }}
                  />
                  <span className="search-filter-custom-check" />
                  <span className="search-filter-label">In stock only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Search Content & Cards */}
          <section className="search-content">
            {/* Toolbar */}
            <div className="search-toolbar">
              <span className="search-count">
                {hasQuery
                  ? `${sortedProducts.length} matching collectibles`
                  : `Showing ${startIndex}-${endIndex} of ${sortedProducts.length} products`}
              </span>

              <div className="search-sort desktop-sort">
                <label htmlFor="search-sort-select">Sort by:</label>
                <div className="search-sort-select-wrapper">
                  <select
                    id="search-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                  <span className="search-sort-caret" aria-hidden="true">⌄</span>
                </div>
              </div>
            </div>

            {/* Grid or Empty State */}
            {paginatedProducts.length === 0 ? (
              <div className="search-no-results">
                <h3>No collectibles match &ldquo;{searchQuery}&rdquo;</h3>
                <p>
                  Try checking the spelling, or search for other popular brands like &ldquo;Toyota&rdquo;, &ldquo;Nissan&rdquo;, &ldquo;Porsche&rdquo;, or &ldquo;Defender&rdquo;.
                </p>
                <button
                  type="button"
                  className="search-reset-button"
                  onClick={handleResetFilters}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="search-grid">
                {paginatedProducts.map((product, idx) => {
                  const isSaved = isWishlisted(product.id)
                  const isAdded = !!addedItems[product.id]

                  return (
                    <article className="search-card" key={`${product.id}-${idx}`}>
                      <div className="search-card__media">
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
                          className={`search-card__wishlist ${
                            isSaved ? 'search-card__wishlist--active' : ''
                          }`}
                          onClick={() => toggleWishlist(product)}
                          aria-label={
                            isSaved
                              ? `Remove ${product.name} from wishlist`
                              : `Add ${product.name} to wishlist`
                          }
                        >
                          {isSaved ? '♥' : '♡'}
                        </button>
                      </div>

                      <div className="search-card__body">
                        <div className="search-card__tag">
                          {product.brandTag}
                        </div>

                        <h2 className="search-card__title">
                          <Link to={`/product_details/${product.id}`}>{product.name}</Link>
                        </h2>

                        <div className="search-card__meta">
                          <span className="search-card__rating">
                            ★ {product.rating}
                          </span>
                          <span className="search-card__reviews">
                            ({product.reviews})
                          </span>
                          <span className="search-card__dot">•</span>
                          <span className="search-card__stock">In stock</span>
                        </div>

                        <div className="search-card__footer">
                          <span className="search-card__price">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            type="button"
                            className={`search-card__add ${
                              isAdded ? 'search-card__add--added' : ''
                            }`}
                            onClick={() => handleAddToCart(product.id)}
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

            {/* Dynamic Pagination: ONLY shows real pages */}
            {sortedProducts.length > 0 && (
              <nav className="search-pagination" aria-label="Pagination">
                <button
                  type="button"
                  className="search-pagination__prev"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  ← Previous
                </button>

                <div className="search-pagination__numbers">
                  {pageNumbers.map((num, i) =>
                    num === '...' ? (
                      <span className="search-pagination__ellipsis" key={`dots-${i}`}>
                        ...
                      </span>
                    ) : (
                      <button
                        type="button"
                        key={num}
                        className={`search-pagination__num ${currentPage === num ? 'is-active' : ''}`}
                        onClick={() => {
                          setCurrentPage(num)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      >
                        {num}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="search-pagination__next"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Next →
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default SearchResults
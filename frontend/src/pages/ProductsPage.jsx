
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getProducts,
  getAveragePrice,
  getProductsAboveAveragePrice
} from '../api/productApi'

const demoProducts = [
  {
    id: 1,
    name: 'Portfolio Website Template',
    category: { name: 'Developer Templates' },
    price: 499,
    stock: 20,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=90'
  },
  {
    id: 2,
    name: 'Minimal Figma UI Kit',
    category: { name: 'Design Resources' },
    price: 349,
    stock: 20,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=90'
  },
  {
    id: 3,
    name: 'AI Prompt Collection',
    category: { name: 'AI Resources' },
    price: 299,
    stock: 20,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=90'
  },
  {
    id: 4,
    name: 'Premium Resume Pack',
    category: { name: 'Resume & Career' },
    price: 249,
    stock: 20,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=90'
  },
  {
    id: 5,
    name: 'Java Study Notes',
    category: { name: 'Study Materials' },
    price: 199,
    stock: 20,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=90'
  },
  {
    id: 6,
    name: 'Project Presentation Pack',
    category: { name: 'Presentation Templates' },
    price: 279,
    stock: 20,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=90'
  },
  {
    id: 7,
    name: 'Business Proposal Template',
    category: { name: 'Business Templates' },
    price: 329,
    stock: 20,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=90'
  },
  {
    id: 8,
    name: 'Digital Study Planner',
    category: { name: 'Digital Planners' },
    price: 179,
    stock: 20,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=90'
  }
]

function ProductsPage() {
  const [products, setProducts] = useState(demoProducts)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [averagePrice, setAveragePrice] = useState(0)
  const [aboveAverageProducts, setAboveAverageProducts] = useState([])

  useEffect(() => {
    getProducts()
      .then(data => {
        const mapped = data.map((product, index) => ({
          ...product,
          id: product.productId,
          rating: 4.7 + (index % 3) * 0.1,
          image: demoProducts[index % demoProducts.length].image
        }))

        setProducts(mapped)
      })
      .catch(error => {
        console.error('Failed to load products:', error)
      })

    getAveragePrice()
      .then(data => {
        setAveragePrice(data)
      })
      .catch(error => {
        console.error('Failed to load average price:', error)
      })

    getProductsAboveAveragePrice()
      .then(data => {
        setAboveAverageProducts(data)
      })
      .catch(error => {
        console.error(
          'Failed to load above-average products:',
          error
        )
      })
  }, [])

  const categories = [
    'All',
    ...new Set(
      products
        .map(product => product.category?.name)
        .filter(Boolean)
    )
  ]

  const filteredProducts = products.filter(product => {
    const productCategory = product.category?.name || ''

    return (
      (category === 'All' || productCategory === category) &&
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <main className="page">
      <div className="catalog-heading">
        <div>
          <span className="section-label">
            THE COLLECTION
          </span>

          <h1>Explore everything.</h1>

          <p>
            Digital resources curated for people who create.
          </p>

          <p>
            Average product price: ₹{averagePrice.toFixed(2)}
          </p>
        </div>

        <div className="catalog-count">
          <strong>{filteredProducts.length}</strong>
          <span>products</span>
        </div>
      </div>

      <div className="catalog-tools">
        <div className="catalog-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
          />
        </div>

        <div className="filters">
          {categories.map(item => (
            <button
              key={item}
              className={
                category === item
                  ? 'filter active'
                  : 'filter'
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-grid">
        {filteredProducts.map(product => (
          <Link
            to={`/product/${product.id}`}
            className="catalog-card"
            key={product.id}
          >
            <div className="catalog-image">
              <img
                src={product.image}
                alt={product.name}
              />

              <button
                type="button"
                className="heart-button"
                onClick={e => e.preventDefault()}
              >
                ♡
              </button>
            </div>

            <div className="catalog-info">
              <span>
                {product.category?.name || 'Digital Resource'}
              </span>

              <h3>{product.name}</h3>

              <div className="catalog-meta">
                <strong>₹{product.price}</strong>

                <small>
                  ★ {product.rating || 4.8}
                </small>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="above-average-section">
        <div className="catalog-heading">
          <div>
            <span className="section-label">
              SUBQUERY RESULT
            </span>

            <h2>Above Average Price Products</h2>

            <p>
              Products priced higher than the average
              product price.
            </p>
          </div>
        </div>

        <div className="catalog-grid">
          {aboveAverageProducts.map(product => (
            <Link
              to={`/product/${product.productId}`}
              className="catalog-card"
              key={product.productId}
            >
              <div className="catalog-image">
                <img
                  src={
                    demoProducts[
                      product.productId % demoProducts.length
                    ].image
                  }
                  alt={product.name}
                />
              </div>

              <div className="catalog-info">
                <span>
                  {product.category?.name || 'Digital Resource'}
                </span>

                <h3>{product.name}</h3>

                <div className="catalog-meta">
                  <strong>₹{product.price}</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ProductsPage

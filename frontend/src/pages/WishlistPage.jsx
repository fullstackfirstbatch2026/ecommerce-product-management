
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function WishlistPage() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem('wishlist') || '[]'
    )

    setWishlist(savedWishlist)
  }, [])

  const removeFromWishlist = id => {
    const updatedWishlist = wishlist.filter(
      product => product.id !== id
    )

    setWishlist(updatedWishlist)

    localStorage.setItem(
      'wishlist',
      JSON.stringify(updatedWishlist)
    )
  }

  return (
    <main className="page">
      <div className="catalog-heading">
        <div>
          <span className="section-label">
            SAVED FOR LATER
          </span>

          <h1>Your wishlist.</h1>

          <p>Ideas you don't want to lose.</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <h2>Your wishlist is empty</h2>

          <p>
            Add products to your wishlist from the
            product details page.
          </p>

          <Link
            to="/products"
            className="button button-dark"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="catalog-grid">
          {wishlist.map(product => (
            <div
              className="catalog-card"
              key={product.id}
            >
              <Link
                to={`/product/${product.id}`}
                className="catalog-card-link"
              >
                <div className="catalog-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="catalog-info">
                  <span>{product.category}</span>

                  <h3>{product.name}</h3>

                  <div className="catalog-meta">
                    <strong>₹{product.price}</strong>

                    <small>
                      ★ {product.rating}
                    </small>
                  </div>
                </div>
              </Link>

              <button
                type="button"
                className="heart-button"
                onClick={() =>
                  removeFromWishlist(product.id)
                }
              >
                ♥
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default WishlistPage

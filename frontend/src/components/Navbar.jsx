import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const isActive = path =>
    location.pathname === path ? 'nav-link active' : 'nav-link'

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <span className="logo-box">H</span>
          <span className="logo-text">
            Hamsi<span>Hub</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          <Link className={isActive('/')} to="/">
            Home
          </Link>

          <Link
            className={isActive('/products')}
            to="/products"
          >
            Explore
          </Link>

          <Link
            className={isActive('/categories')}
            to="/categories"
          >
            Categories
          </Link>

          <Link
            className={isActive('/deals')}
            to="/deals"
          >
            Deals
          </Link>
        </nav>

        <div className="nav-right">
          <Link
            to="/wishlist"
            className="icon-button"
            aria-label="Wishlist"
          >
            ♡
          </Link>

          <Link
            to="/cart"
            className="icon-button"
            aria-label="Cart"
          >
            <span className="cart-icon">⌑</span>
          </Link>

          <Link
            className={isActive('/orders')}
            to="/orders"
          >
            Orders
          </Link>

          <Link
            to="/profile"
            className="avatar"
            aria-label="Profile"
          >
            H
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
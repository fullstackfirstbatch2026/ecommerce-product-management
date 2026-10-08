import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createOrder } from '../api/orderApi'

function CartPage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    )

    setItems(savedCart)
  }, [])

  const removeItem = id => {
    const updatedCart = items.filter(
      item => item.id !== id
    )

    setItems(updatedCart)

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    )
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const discount = items.length > 0 ? 50 : 0
  const total = subtotal - discount

  const checkout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }

    try {
      for (const item of items) {
        await createOrder(
          1,
          item.id,
          item.quantity
        )
      }

      alert('Order created successfully')

      localStorage.removeItem('cart')
      setItems([])
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Checkout failed')
    }
  }

  return (
    <main className="page">
      <div className="catalog-heading">
        <div>
          <span className="section-label">YOUR BAG</span>
          <h1>Ready when you are.</h1>
          <p>Your selected digital resources.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add a product to your cart first.</p>

          <Link
            to="/products"
            className="button button-dark"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <div
                className="cart-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">
                  <span>
                    {item.category || 'Digital Resource'}
                  </span>

                  <h3>{item.name}</h3>

                  <strong>
                    ₹{item.price} × {item.quantity}
                  </strong>
                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <aside className="order-summary">
            <span className="section-label">
              SUMMARY
            </span>

            <h2>Order total</h2>

            <div className="summary-line">
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div className="summary-line">
              <span>Discount</span>
              <strong>-₹{discount}</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <button
              type="button"
              className="button button-light full-button"
              onClick={checkout}
            >
              Proceed to checkout
            </button>

            <Link
              to="/products"
              className="continue-link"
            >
              ← Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CartPage
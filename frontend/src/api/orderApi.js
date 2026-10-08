const API_URL = 'http://localhost:8080/api/orders'

export async function createOrder(customerId, productId, quantity) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customerId,
      productId,
      quantity
    })
  })

  if (!response.ok) {
    throw new Error('Failed to create order')
  }

  return response.text()
}
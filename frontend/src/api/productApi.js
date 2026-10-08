const API_URL = 'http://localhost:8080/api/products'

export async function getProducts() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to load products')
  }

  return response.json()
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Failed to load product')
  }

  return response.json()
}

export async function getAveragePrice() {
  const response = await fetch(
    `${API_URL}/price/average`
  )

  if (!response.ok) {
    throw new Error('Failed to load average price')
  }

  return response.json()
}

export async function getProductsAboveAveragePrice() {
  const response = await fetch(
    `${API_URL}/price/above-average`
  )

  if (!response.ok) {
    throw new Error('Failed to load above-average products')
  }

  return response.json()
}
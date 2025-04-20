import React, { useState, useContext } from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const OrderPlacement = () => {
  const { cartList, removeAllCartItems } = useContext(CartContext)
  const [buyerName, setBuyerName] = useState('')
  const [buyerContact, setBuyerContact] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [orderStatus, setOrderStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    setOrderStatus(null)

    const orderData = {
      buyer_name: buyerName,
      buyer_contact: buyerContact,
      delivery_address: deliveryAddress,
      items: cartList.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    }

    try {
      const response = await fetch('http://localhost:3000/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const data = await response.json()
        setOrderStatus(`Order placed successfully! Order ID: ${data.orderId}`)
        removeAllCartItems()
        setBuyerName('')
        setBuyerContact('')
        setDeliveryAddress('')
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || 'Failed to place order')
      }
    } catch (error) {
      setErrorMessage('Failed to place order')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="order-placement-container">
      <h1>Place Your Order</h1>
      <form className="order-form" onSubmit={handleSubmit}>
        <label htmlFor="buyerName">Name:</label>
        <input
          id="buyerName"
          type="text"
          value={buyerName}
          onChange={e => setBuyerName(e.target.value)}
          required
        />

        <label htmlFor="buyerContact">Contact:</label>
        <input
          id="buyerContact"
          type="text"
          value={buyerContact}
          onChange={e => setBuyerContact(e.target.value)}
          required
        />

        <label htmlFor="deliveryAddress">Delivery Address:</label>
        <textarea
          id="deliveryAddress"
          value={deliveryAddress}
          onChange={e => setDeliveryAddress(e.target.value)}
          required
        />

        <button type="submit" disabled={isSubmitting || cartList.length === 0}>
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
      {orderStatus && <p className="success-message">{orderStatus}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}

export default OrderPlacement

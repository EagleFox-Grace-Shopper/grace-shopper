import React from 'react'

export default function OrderRow(props) {
  const order = props.order
  return (
    <div>
      <h3>{order.id}</h3>
      <h3>Total Amount: {(order.totalAmount / 100).toFixed(2)}</h3>
      <h3>Quantity</h3>
    </div>
  )
}


import React from 'react'

export default function OrderRow(props) {
  const order = props.order
  return (
    <div>
      <h3>{order.id}</h3>
      <h3>Total Amount: {order.totalAmount}</h3>
      <h3>Quantity</h3>
    </div>
  )
}




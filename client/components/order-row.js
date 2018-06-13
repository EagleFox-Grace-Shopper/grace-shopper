import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TableRow = styled.tr`
  border: 1px solid rgba(255, 193, 128, 1);
  width: 100%;
  margin: .25em;
`

export default function OrderRow(props) {
  const order = props.order
  return (
    <TableRow>

      <td>
        <Link to={`/orders/${order.id}`}>
          {order.id}
        </Link>
      </td>
      <td>{order.createdAt}</td>
      <td>{(order.totalAmount/100).toFixed(2)}</td>
      <td>{order.status}</td>
    </TableRow>
  )
}


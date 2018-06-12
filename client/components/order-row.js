import React from 'react'
import styled from 'styled-components'

const TableRow = styled.tr`
  border: 1px solid rgba(255, 193, 128, 1);
  width: 100%;
  margin: .25em;
`

export default function OrderRow(props) {
  const order = props.order
  return (
    <TableRow>
      <td>{order.id}</td>
      <td>{order.createdAt}</td>
      <td>{order.totalAmount}</td>
      <td>Status</td>
    </TableRow>
  )
}


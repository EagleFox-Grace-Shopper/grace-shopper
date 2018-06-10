import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TableRow = styled.tr`
  border: 1px solid rgba(255, 193, 128, 1);
  width: 100%;
  margin: .25em;
`
const CartImage = styled.img`
  max-height: 100px;
  max-width: 150px;
  height: auto;
  width: auto;
`
const CartRowForm = styled.div`
  display: flex;
  justify-content: center;
`
const QtyInput = styled.input`
  width: 3em;
  font-size 1.1em;
  margin: 0 .25em;
`
const TdImg = styled.td`
`
const TdTitle = styled.td`
`
const TdPrice = styled.td`
`
const TdForm = styled.td`
  text-align: center;
`

export default function CartRow(props) {
  const product = props.cartItem.product
  return (
    <TableRow>
      <TdImg>
        <Link to={`products/${product.id}`}>
          <CartImage src={product.imageUrl} />
        </Link>
      </TdImg>
      <TdTitle>
        <Link to={`products/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>
      </TdTitle>
      <TdPrice>
        ${product.price}
      </TdPrice>
      <TdPrice>
        ${product.price * props.cartItem.quantity}
      </TdPrice>
      <TdForm>
        <CartRowForm>
          <form>
            <QtyInput
              type="number"
              name="quantity"
              min="1"
              defaultValue={props.cartItem.quantity}
              onClick={(evt) => props.handleClick({
                ...props.cartItem,
                quantity: evt.target.value
              })} />
          </form>
          <button type="button">Remove</button>
        </CartRowForm>
      </TdForm>
    </TableRow>
  )
}

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonAddToCart } from '.'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 310px;
  height: 310px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
`
const CardImage = styled.img`
  max-height: 200px;
  max-width: 300px;
  height: auto;
  width: auto;
`
const H3NoMargin = styled.h3`
  margin: 0;
`

export default function ProductCard(props) {
  const product = props.product
  const cartItem = {
    productId: product.id,
    quantity: 1
  }
  return (
    <Wrapper>
      <Link to={`/products/${product.id}`}>
        <H3NoMargin>{product.title}</H3NoMargin>
      </Link>
      <H3NoMargin>${product.price}</H3NoMargin>
      <Link to={`/products/${product.id}`}>
        <CardImage src={product.imageUrl} />
      </Link>
      <ButtonAddToCart cartItem={cartItem} />
    </Wrapper>
  )
}


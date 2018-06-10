import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`
const CardImage = styled.img`
  max-height: 200px;
  max-width: 300px;
  height: auto;
  width: auto;
`

export default function ProductCard(props) {
  const product = props.product
  return (
    <Wrapper>
      <Link to={`products/${product.id}`}>
        <h3>{product.title}</h3>
      </Link>
      <div>
        <h3>${product.price}</h3>
      </div>
      <Link to={`products/${product.id}`}>
        <CardImage src={product.imageUrl} />
      </Link>
    </Wrapper>
  )
}


import React from 'react'
import { Link } from 'react-router-dom'

const ButtonAddReview = (props) => {
  const productId = props.prodId

  return (
    <div>
      <Link to={`/products/${productId}/editReview`} >
        <button type="button"> Add Review </button>
      </Link>
    </div>
  )
}

export default ButtonAddReview

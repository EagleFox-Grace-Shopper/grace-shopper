import React from 'react'

export default function ProductCard (props) {

  const product = props.selectedProduct

  render () {
    return (
      <div>
        <h4>{product.title}</h4>
      </div>

      <div>
        <h3>${product.price}</h3>
      </div>

      <div>
          <img src={product.imageUrl} />
      </div>
    )
  }
}

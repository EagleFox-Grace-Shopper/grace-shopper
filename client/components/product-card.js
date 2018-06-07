import React from 'react'

export default function ProductCard (props) {

  const product = props.product
    return (
      <div>
        <div>
          <h4>{product.title}</h4>
        </div>

        <div>
          <h3>${product.price}</h3>
        </div>

        <div className='product-card'>
            <img src={product.imageUrl} />
        </div>
      </div>
    )
}


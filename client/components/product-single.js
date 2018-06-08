import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonAddToCart } from './index'
import { Link } from 'react-router-dom'

import { getInitialProductThunk } from '../store'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: this.props.selectedProduct,
    }
  }
  async componentDidMount() {
    const urlId = Number(this.props.match.params.id)
    await this.props.getInitialProduct(urlId)
    this.setState({ selectedProduct: this.props.selectedProduct })
  }

  render() {
    const productId = Number(this.props.match.params.id)

    const title = this.state.selectedProduct.title
    const description = this.state.selectedProduct.description
    const price = this.state.selectedProduct.price
    const quantity = this.state.selectedProduct.quantity
    const imageUrl = this.state.selectedProduct.imageUrl

    return (
      <div>
        <div>
          <h1>
            {title}
          </h1>
        </div>

        <div>
          <p>
            {description}
          </p>
        </div>

        <div>
          <h3>
            $
            {price}
          </h3>
        </div>

        <div>
          <p>
            {quantity} available in store
          </p>
        </div>

        <div>
          <img src={imageUrl} />
        </div>
        <ButtonAddToCart itemId={productId} />

        <Link to={`/products/${productId}/edit`}>
          <button type="button">Edit Product</button>
        </Link>

      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    selectedProduct: store.product.selectedProduct,
    isAdmin: !!store.user.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialProduct(productId) {
      return dispatch(getInitialProductThunk(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

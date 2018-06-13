import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonAddToCart, ReviewList, ButtonAddReview} from './index'
import { Link } from 'react-router-dom'
import { getInitialProductThunk } from '../store'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: this.props.selectedProduct,
      cartItem: {
        productId: this.props.selectedProduct.id,
        quantity: 1
      },
    }
  }
  async componentDidMount() {
    const urlId = Number(this.props.match.params.id)
    await this.props.getInitialProduct(urlId)
    this.setState({
      selectedProduct: this.props.selectedProduct,
      cartItem: {
        productId: this.props.selectedProduct.id,
        quantity: 1
      }
    })
  }
  handleChange = (evt) => {
    this.setState({
      cartItem: {
        ...this.state.cartItem,
        quantity: Number(evt.target.value)
      }
    })
  }
  render() {
    const productId = Number(this.props.match.params.id)
    const title = this.state.selectedProduct.title
    const description = this.state.selectedProduct.description
    const price = (this.state.selectedProduct.price / 100).toFixed(2)
    const quantity = this.state.selectedProduct.quantity
    const imageUrl = this.state.selectedProduct.imageUrl
    return (
      <div>
        <h1>
          {title}
        </h1>
        <p>
          {description}
        </p>
        <h3>
          $
          {price}
        </h3>
        <p>
          {quantity} available in store
        </p>
        <img src={imageUrl} />
        <form>
          <label name="quantity">Qty:
            <input
              type="number"
              name="quantity"
              min="1"
              value={this.state.cartItem.quantity}
              onChange={this.handleChange}
            />
          </label>
          <ButtonAddToCart redirect={true} cartItem={this.state.cartItem} />
        </form>
        {
          this.props.isAdmin &&
          <Link to={`/products/${productId}/edit`}>
            <button type="button">Edit Product</button>
          </Link>
        }
        <ReviewList prodId={productId} />
        {this.props.isAdmin && <ButtonAddReview prodId={productId} />}
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

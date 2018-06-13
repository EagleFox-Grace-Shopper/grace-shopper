import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonAddToCart, ReviewList, ButtonAddReview} from './index'
import { Link } from 'react-router-dom'
import { getInitialProductThunk } from '../store'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 80%;
  margin: auto;
`
const Details = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
`
const Image = styled.img`
  max-height: 35em;
  max-width: 50%;
  width: auto;
  height: auto;
  padding: .5em;
`
const ProductInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: .5em;
  padding: 1em;
  border: 1px solid rgb(201, 161, 109);
  background-color: rgb(235, 235, 235);
  border-radius: 5px;
  min-width: 50%;
`
const CartUI = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`
const H1 = styled.div`
  font-size: 2em;
  font-weight: bold;
`
const Input = styled.input`
  width: 3em;
`
const Hr = styled.hr`
  border-top: 1px solid rgb(201, 161, 109);
  width: 90%;
`

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
      <Wrapper>
        <Details>
          <Image src={imageUrl} />
          <ProductInfo>
            <H1>{title}</H1>
            <h3>Price: ${price}</h3>
            <p>{description}</p>
            <Hr />
            <CartUI>
              <Form>
                <label name="quantity">Qty:
                  <Input
                    type="number"
                    name="quantity"
                    min="1"
                    value={this.state.cartItem.quantity}
                    onChange={this.handleChange}
                  />
                </label>
                <ButtonAddToCart redirect={true} prodQty={quantity} cartItem={this.state.cartItem} />
              </Form>
              <p>
                {quantity} available in store
              </p>
              {this.props.isAdmin &&
                <Link to={`/products/${productId}/edit`}>
                  <button type="button">Edit Product</button>
                </Link>
              }
            </CartUI>
          </ProductInfo>
        </Details>
        <Hr />
        <ReviewList prodId={productId} />
        {this.props.isAdmin && <ButtonAddReview prodId={productId} />}
      </Wrapper>
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

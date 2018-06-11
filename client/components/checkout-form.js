import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { checkoutThunk } from '../store'
import styled from 'styled-components'
import stripeCheckout from 'react-stripe-checkout'

const Wrapper = styled.div`
  position: relative;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`

/**
 * COMPONENT
 */
export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      shipping: {
        address: '',
        city: '',
        state: '',
        zip: 10000,
      },
      billing: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: 10000,
      }
    }
  }
  async componentDidMount() {
  }
  handleChange = (evt) => {
    const prevState = { ...this.state }
    this.setState({
      ...prevState,
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit = async (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    if (formName === 'addProduct') {
      await this.props.addProduct(this.state.selectedProduct)
    } else {
      await this.props.editProduct(this.state.selectedProduct)
    }
    await this.setState({
      selectedProduct: this.props.selectedProduct,
      redirect: true
    })
  }
  render() {
    return (
      <Wrapper>
        <h2>Check Out</h2>
        <Form onSubmit={this.handleSubmit} name={this.props.name} onChange={this.handleChange} >
          <div>
            <label htmlFor="name"><small>Full Name</small>
              <input name="name" type="text" value={this.state.name} />
            </label>
          </div>
          <div>
            <label htmlFor="email"><small>Email</small>
              <input name="email" type="text" value={this.state.email} />
            </label>
          </div>
          <div>
            <label htmlFor="address"><small>Address</small>
              <input name="address" type="text" value={this.state.shipping.address} />
            </label>
          </div>
          <div>
            <label htmlFor="city"><small>City</small>
              <input name="city" type="number" value={this.state.shipping.city} />
            </label>
          </div>
          <div>
            <label htmlFor="state"><small>State</small>
              <input name="state" type="text" value={this.state.shipping.state || ''} />
            </label>
          </div>
          <div>
            <label htmlFor="zip"><small>State</small>
              <input name="zip" type="text" value={this.state.shipping.zip || ''} />
            </label>
          </div>
          <div>
            <button type="submit">Checkout</button>
          </div>
        </Form>
      </Wrapper>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    user: store.user,
    cartTotal: store.cart.cartTotal,
    order: store.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: () => {
      return dispatch(checkoutThunk())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

/**
 * PROP TYPES
 */
// ProductForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
// }

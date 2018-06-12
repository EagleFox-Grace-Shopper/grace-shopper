import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { checkoutThunk, setOrder } from '../store'
import styled from 'styled-components'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { STRIPE_PUBLISHABLE_KEY } from '../../secrets'

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 30em;
  margin: auto;
  display: flex;
  flex-direction: column;
`
const Header = styled.h2`
  text-align: center;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const LabelFull = styled.label`
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`
const LabelLeft = styled.label`
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`
const LabelSmall = styled.small`
  width: 6em;
  text-align: right;
  padding-right: .5em;
`
const InputFull = styled.input`
  width: 100%;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
`
const InnerHeader = styled.div`
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0;
`
const CartInfo = styled.div`
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  margin: 5px;
`

const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
`
const AddressField = (props) => {
  return (
    <FieldSet onChange={props.handleChange}>
      <LabelFull htmlFor={`${props.name}Address`}><LabelSmall>Address: </LabelSmall>
        <InputFull name={`${props.name}Address`} type="text" value={props.state.sAddress} />
      </LabelFull>
      <LabelFull htmlFor={`${props.name}City`}> <LabelSmall>City: </LabelSmall>
        <InputFull name={`${props.name}City`} type="text" value={props.state.sCity} />
      </LabelFull >
      <LabelFull htmlFor={`${props.name}State`}> <LabelSmall>State: </LabelSmall>
        <InputFull name={`${props.name}State`} type="text" value={props.state.sState} />
      </LabelFull >
      <LabelFull htmlFor={`${props.name}Zip`}> <LabelSmall>Zip Code: </LabelSmall>
        <InputFull name={`${props.name}Zip`} type="text" value={props.state.sZip} />
      </LabelFull >
    </FieldSet >
  )
}

/**
 * COMPONENT
 */
export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      shipAddress: '',
      shipCity: '',
      shipState: '',
      shipZip: 10000,
      billName: '',
      billAddress: '',
      billCity: '',
      billState: '',
      billZip: 10000,
      shipBillSame: false,
      redirect: false,
    }
  }
  async componentDidMount() {
  }
  handleChange = (evt) => {
    const prevState = { ...this.state }
    if (evt.target.name === 'shipBillSame') {
      this.setState({ shipBillSame: !prevState.shipBillSame })
    } else {
      this.setState({
        ...prevState,
        [evt.target.name]: evt.target.value
      })
    }
  }
  handleSubmit = async (evt) => {
    evt.preventDefault()
    const checkoutProps = { ...this.state }
    if (checkoutProps.shipBillSame) {
      checkoutProps.billAddress = this.state.shipAddress
      checkoutProps.billCity = this.state.shipCity
      checkoutProps.billState = this.state.shipState
      checkoutProps.billZip = this.state.shipZip
    }
  }
  onToken = (amount) => async (token) => {
    const checkoutProps = {
      ...this.state,
      stripe: {
        source: token.id,
        currency: 'USD',
        amount
      }
    }
    if (checkoutProps.shipBillSame) {
      checkoutProps.billAddress = this.state.shipAddress
      checkoutProps.billCity = this.state.shipCity
      checkoutProps.billState = this.state.shipState
      checkoutProps.billZip = this.state.shipZip
    }
    const response = await this.props.checkout(checkoutProps)
    this.setState({ redirect: response })
  }
  onClose = () => {
    console.log('checkout complete')
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={`orders/${this.state.redirect}`} />
    }
    return (
      <Wrapper>
        <Header>Check Out</Header>
        <Form onSubmit={this.handleSubmit} name="checkout-form" onChange={this.handleChange} >
          <LabelFull htmlFor="name">
            <LabelSmall>Full Name: </LabelSmall>
            <InputFull name="name" type="text" value={this.state.name} />
          </LabelFull>
          <LabelFull htmlFor="email"><LabelSmall>Email: </LabelSmall>
            <InputFull name="email" type="text" value={this.state.email} />
          </LabelFull>
          <InnerHeader>Shipping Address</InnerHeader>
          <AddressField onChange={this.handleChange} name="ship" state={this.state} />
          <LabelLeft htmlFor="shipBillSame">
            <LabelSmall />
            <input id="shipBillSame" name="shipBillSame" type="checkbox" />
            <small>Billing address same as shipping address?</small>
          </LabelLeft>
          {!this.state.shipBillSame &&
            <React.Fragment>
              <InnerHeader>Billing Address</InnerHeader>
              <AddressField onChange={this.handleChange} name="bill" state={this.state} />
            </React.Fragment>
          }
          <CartInfo>
            <h3>Total Cost: </h3>
            <h3>${(this.props.cartTotal / 100).toFixed(2)}</h3>
          </CartInfo>
          <StripeCheckout
            name="EagleFox Shopper"
            description=""
            image="/favicon.ico" // the pop-in header image (default none)
            ComponentClass="div"
            panelLabel=""
            amount={this.props.cartTotal} // cents
            currency="USD"
            stripeKey={STRIPE_PUBLISHABLE_KEY}
            // locale="us"
            email={this.state.email}
            // shippingAddress={false}
            // billingAddress={false}
            // Note: enabling both zipCode checks and billing or shipping address will
            // cause zipCheck to be pulled from billing address (set to shipping if none provided).
            zipCode={false}
            // alipay // accept Alipay (default false)
            // bitcoin // accept Bitcoins (default false)
            allowRememberMe // "Remember Me" option (default true)
            token={this.onToken(this.props.cartTotal, this)} // submit callback
            // opened={this.onOpen()} // called when the checkout popin is opened (no IE6/7)
            closed={this.onClose()} // called when the checkout popin is closed (no IE6/7)
          />
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
    checkout: (checkoutData) => {
      return dispatch(checkoutThunk(checkoutData))
    },
    setOrder: (orderData) => {
      return dispatch(setOrder(orderData))
    }
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

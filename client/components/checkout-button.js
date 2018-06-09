import React from 'react'
import { checkoutThunk } from '../store/cart'
import { connect } from 'react-redux'

const ButtonAddToCart = (props) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => props.checkout(props.cartItem)}
      >
        Checkout
      </button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkout() {
      return dispatch(checkoutThunk())
    }
  }
}

export default connect(null, mapDispatchToProps)(ButtonAddToCart)

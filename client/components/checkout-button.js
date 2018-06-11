import React from 'react'
import { checkoutThunk } from '../store/cart'
import { connect } from 'react-redux'

const CheckoutButton = (props) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => props.checkout()}
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

export default connect(null, mapDispatchToProps)(CheckoutButton)

import React from 'react'
import { setCartThunk } from '../store/cart'
import { connect } from 'react-redux'

const ButtonAddToCart = (props) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => props.addToCart(props.cartItem)}
      >
        Add to Cart
      </button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart(cartItem) {
      return dispatch(setCartThunk(cartItem))
    }
  }
}

export default connect(null, mapDispatchToProps)(ButtonAddToCart)

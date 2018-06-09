import React from 'react'
import { connect } from 'react-redux'
import { CartItemRow } from './index'
import { Link } from 'react-router-dom'
import { getInitialCartThunk, setCartThunk, removeCartItemThunk } from '../store/cart'
import styled from 'styled-components'

const CartSize = styled.div`
  z-index: 1;
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: red;
  background-color: white;
  border-radius: 100%;
  width: 1.5em;
  height: 1.5em;
  font-size: 1em;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5em;
  opacity: .8;
`
const CartImage = styled.img`
  position: relative;
  width: auto;
  height: 100%;
`
const Wrapper = styled.div`
  position: relative;
  padding: 5px;
  &:hover ${CartSize}{
    opacity: 1;
  }
`

const CartIcon = (props) => {
  props.getInitialCart()
  return (
    <Wrapper>
      <Link to="/cart">
        <CartImage src="cart-icon.png" />
        <CartSize>
          {props.cartSize}
        </CartSize>
      </Link>
    </Wrapper>
  )
}


const mapStateToProps = (store) => {
  return {
    cartSize: store.cart.cart.length,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialCart() {
      return dispatch(getInitialCartThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)

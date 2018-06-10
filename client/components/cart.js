import React from 'react'
import { connect } from 'react-redux'
import { CartItemRow } from './index'
import { Link } from 'react-router-dom'
import { getInitialCartThunk, setCartThunk, removeCartItemThunk } from '../store/cart'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 80%;
  margin: auto;
`
const CartList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1em;
`
const CartItem = styled.div`
  width: 100%;
  text-align: center;
`

const Cart = (props) => {
  return (
    <Wrapper>
      <CartList>
        {!props.cart.length ?
          <CartItem>
            There are no items in your cart!
          </CartItem>
          : props.cart.map(cartItem => {
            return (
              <CartItem key={cartItem.id}>
                <CartItemRow cartItem={cartItem} />
              </CartItem>
            )
          })}
      </CartList>
    </Wrapper>
  )
}


const mapStateToProps = (store) => {
  return {
    cart: store.cart.cart,
    isAdmin: !!store.user.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialCart() {
      return dispatch(getInitialCartThunk())
    },
    setCart(item) {
      return dispatch(setCartThunk(item))
    },
    removeCartItem(itemId) {
      return dispatch(removeCartItemThunk(itemId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

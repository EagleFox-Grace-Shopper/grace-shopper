import React from 'react'
import { connect } from 'react-redux'
import { CartItemRow } from './index'
import { Link } from 'react-router-dom'
import { getInitialCartThunk, setCartThunk, removeCartItemThunk, updateCartTotal } from '../store/cart'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  max-width: 80em;
  margin: auto;
  padding: 5px 0;
`
const CartList = styled.table`
  border-collapse: collapse;
  position: relative;
  background-color: rgba(255, 193, 128, .6);
  padding: .25em;
  width: 100%;
  text-align: center;
  margin: 5px 0;
`
const ThImg = styled.th`
  padding: 5px;
  width: 160px;
`
const ThTitle = styled.th`
  padding: 5px;
`
const ThPrice = styled.th`
  width: 6em;
`
const ThForm = styled.th`
  width: 10em;
`
const CartItem = styled.div`
  width: 100%;
  text-align: center;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;

`
const Checkout = styled.button`
  border-radius: 5px;
`

const Cart = (props) => {
  props.updateCartTotalCost()
  return (
    <Wrapper>
      <Header>
        <h2>Cart</h2>
        <Checkout type="button">
          Checkout
        </Checkout>
      </Header>
      <CartList>
        <tbody>
          <tr>
            <ThImg>
              Image
            </ThImg>
            <ThTitle>
              Product Name
            </ThTitle>
            <ThPrice>
              Price
            </ThPrice>
            <ThPrice>
              Total
            </ThPrice>
            <ThForm>
              Quantity
            </ThForm>
          </tr>
          {!props.cart.length ?
            <CartItem>
              There are no items in your cart!
            </CartItem>
            : props.cart.map(cartItem => {
              return (
                <CartItemRow key={cartItem.id} cartItem={cartItem} handleClick={props.setCart} />
              )
            })}
          <tr style={{ height: '2em' }}>
            <td />
            <td />
            <td style={{ 'text-align': 'right', 'font-weight': 'bold' }}>
              Total Cost:
            </td>
            <td style={{ 'font-weight': 'bold' }}>
              ${props.cartTotal}
            </td>
            <td>
              <Checkout>Checkout</Checkout>
            </td>
          </tr>
        </tbody>
      </CartList>
    </Wrapper>
  )
}


const mapStateToProps = (store) => {
  return {
    cart: store.cart.cart,
    cartTotal: store.cart.cartTotal,
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
    },
    updateCartTotalCost() {
      return dispatch(updateCartTotal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

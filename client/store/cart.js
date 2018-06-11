import axios from 'axios'
import history from '../history'
import { setOrder } from '.'

/**
 * ACTION TYPES
 */
const UPDATE_CART_TOTAL = 'UPDATE_CART_TOTAL'
const SET_CART = 'SET_CART'
const MERGE_CART = 'MERGE_CART'
/**
 * INITIAL STATE
 */
const initialState = {
  cart: [],
  cartTotal: 0
}

/**
 * ACTION CREATORS
 */
const setCart = cart => ({ type: SET_CART, cart })
export const updateCartTotal = () => ({ type: UPDATE_CART_TOTAL })
const mergeCart = () => ({type: MERGE_CART})
const clearCartSession = () => ({type: CLEAR_CART_SESSION})

/**
 * THUNK CREATORS
 */
export const getInitialCartThunk = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/cart')
    const gotCart = res.data
    dispatch(setCart(gotCart))
  }
}
export const setCartThunk = (cartItem) => {
  return async (dispatch) => {
    console.log(cartItem)
    const res = await axios.post('/api/cart', cartItem)
    const newCart = res.data
    dispatch(setCart(newCart))
  }
}
export const removeCartItemThunk = (itemId) => {
  return async (dispatch) => {
    const res = await axios.delete('/api/cart', itemId)
    const newCart = res.data
    dispatch(setCart(newCart))
  }
}
export const checkoutThunk = () => {
  return async (dispatch) => {
    const res = await axios.post('/api/cart/checkout')
    const newCart = res.data.cart
    const orderInfo = res.data.orderInfo
    dispatch(setCart(newCart))
    dispatch(setOrder(orderInfo))
  }
}
export const loginMergeCartThunk = () => {
  return async (dispatch) => {
    await axios.put('/api/cart/merge')
    dispatch(mergeCart())
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
  case SET_CART:
    return { ...state, cart: action.cart }
  case UPDATE_CART_TOTAL:
    const calcTotal = state.cart.reduce((total, item) => {
      total += item.quantity * item.product.price
      return total
    }, 0)
    const cartTotal = Math.round(calcTotal * 100) / 100
    return { ...state, cartTotal }
  case MERGE_CART:
    return state
  default:
    return state
  }
}

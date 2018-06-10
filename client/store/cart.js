import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const SET_CART = 'SET_CART'
const MERGE_CART = 'MERGE_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  cart: []
}

/**
 * ACTION CREATORS
 */
const setCart = cart => ({ type: SET_CART, cart })
const completeOrder = (cart, order) => ({ type: COMPLETE_ORDER, cart, order })
const mergeCart = () => ({type: MERGE_CART})

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
  case COMPLETE_ORDER:
    return { ...state, cart: action.cart, order: action.order }
  case MERGE_CART:
      return state
  default:
    return state
  }
}

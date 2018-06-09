import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  cart: []
}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
const setCart = cart => ({ type: SET_CART, cart })
const removeCartItem = itemId => ({ type: REMOVE_CART_ITEM, itemId })

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

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
  case GET_CART:
    return { ...state, cart: action.cart }
  case SET_CART:
    return { ...state, cart: action.cart }
  case REMOVE_CART_ITEM:
    return { ...state, cart: action.cart }
  default:
    return state
  }
}

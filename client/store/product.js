import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const SET_PRODUCT = 'SET_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  productList: [],
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({ type: GET_PRODUCT, product })
const setProduct = product => ({ type: SET_PRODUCT, product })
const removeProduct = () => ({ type: REMOVE_PRODUCT })

/**
 * THUNK CREATORS
 */
export const addProductThunk = (product) => {
  return async (dispatch) => {
    const res = await axios.post('/api/products/add', product)
    const addedProduct = res.data
    dispatch(getProduct, addedProduct)
  }
}
export const editProductThunk = (product, productId) => {
  return async (dispatch) => {
    const res = await axios.put(`/api/products/${productId}`, product)
    const editedProduct = res.data
    dispatch(getProduct, editedProduct)
  }
}
export const removeProductThunk = (productId) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${productId}`)
    dispatch(removeProduct)
  }
}
export const getInitialProductThunk = (productId) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/products/${productId}`)
    const gotProduct = res.data
    dispatch(setProduct, gotProduct)
    return gotProduct
  }
}

/**
 * REDUCER
 */
export default function (state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case SET_PRODUCT:
      return {...state, selectedProduct: action.product}
    case REMOVE_PRODUCT:
      return defaultProduct
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  productList: [],
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({ type: GET_PRODUCT, product })
const removeProduct = () => ({ type: REMOVE_PRODUCT })

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case REMOVE_PRODUCT:
      return defaultProduct
    default:
      return state
  }
}

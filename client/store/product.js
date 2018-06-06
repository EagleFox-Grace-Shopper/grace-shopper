import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST'
const GET_PRODUCTS_BY_CAT = 'GET_PRODUCTS_BY_CAT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const SET_PRODUCT = 'SET_PRODUCT'

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
const getProductList = productList => {
  return {
    type: GET_PRODUCT_LIST,
    productList
  }
}
const setProduct = product => ({ type: SET_PRODUCT, product })
const removeProduct = () => ({ type: REMOVE_PRODUCT })

const getProductByCat = products => {
  return {
    type: GET_PRODUCTS_BY_CAT,
    products
  }
}


/**
 * THUNK CREATORS
 */
export const addProductThunk = (product) => {
  return async (dispatch) => {
    const res = await axios.post('/api/products/add', product)
    const addedProduct = res.data
    dispatch(setProduct(addedProduct))
  }
}
export const editProductThunk = (product) => {
  return async (dispatch) => {
    const res = await axios.put(`/api/products/${product.id}`, product)
    const editedProduct = res.data
    dispatch(setProduct(editedProduct))
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
    dispatch(setProduct(gotProduct))
  }
}

export const getProductsByCatThunk = (categoryId) => {
  return async dispatch => {
    const { data } = await axios.get(`/api/products?categoryId=${categoryId}`)
    dispatch(getProductByCat(data))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return { ...state, productList: action.productList }
    case SET_PRODUCT:
      return { ...state, selectedProduct: action.product }
    case GET_PRODUCTS_BY_CAT:
      return { ...state, productList: action.products }
    case REMOVE_PRODUCT:
      return defaultProducts
    default:
      return state
  }
}

import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const SET_ORDER = 'SET_ORDER'

/**
 * INITIAL STATE
 */
const orderState = {
  orderList: [],
  selectedOrder: {}
}

/**
* ACTION CREATORS
*/
const getOrders = orderList => {
  return {
    type: GET_ORDERS,
    orderList
  }
}
export const setOrder = order => {
  return {
    type: SET_ORDER,
    order
  }
}

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */

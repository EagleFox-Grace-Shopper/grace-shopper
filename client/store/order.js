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
  selectedOrder: {},
  orderLines: []
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
export const getOrderListThunk = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/orders')
    const orders = res.data
    dispatch(getOrders(orders))
  }
}

export const getOrderThunk = (orderId) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/orders/${orderId}`)
    const gotOrderLines = res.data
    dispatch(setOrder(gotOrderLines))
  }
}

/**
 * REDUCER
 */
export default function (state = orderState, action) {
  switch (action.type) {
  case GET_ORDERS:
    return { ...state, orderList: action.orderList }
  case SET_ORDER:
    return { ...state, orderLines: action.order }
  default:
    return state
  }
}

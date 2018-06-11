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
  orderList: []
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
// const setOrder = order => {
//   return {
//     type: SET_ORDER,
//     order
//   }
// }

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

/**
 * REDUCER
 */
export default function (state = orderState, action) {
  switch (action.type) {
  case GET_ORDERS:
    return { ...state, orderList: action.orderList }
  default:
    return state
  }
}

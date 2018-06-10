import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'


/**
 * INITIAL STATE
 */
const orderState = {
  orders: []
}

 /**
 * ACTION CREATORS
 */
const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */

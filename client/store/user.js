import axios from 'axios'
import history from '../history'
import { loginMergeCartThunk, getInitialCartThunk } from './index'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const addUser = user => ({ type: ADD_USER, user})
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const newUserThunk = (name, email, address, password) => {
  return async dispatch => {
    const {data} = await axios.post('/auth/signup', {name, email, address, password})
    dispatch(addUser(data))
  }
}

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
        return dispatch(getInitialCartThunk())
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .then(_ => {
        dispatch(loginMergeCartThunk())
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
  case GET_USER:
    return action.user
  case ADD_USER:
    return action.user
  case REMOVE_USER:
    return defaultUser
  default:
    return state
  }
}

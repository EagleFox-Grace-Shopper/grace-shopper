import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import product from './product'
import cart from './cart'
import category, { getCategoriesThunk } from './category'
import order from './order'
import review from './review'
import usersAdmin from './users-admin'

export const reducer = combineReducers({ user, product, category, cart, order, review, usersAdmin })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

store.dispatch(getCategoriesThunk())

export default store
export * from './user'
export * from './product'
export * from './category'
export * from './order'
export * from './cart'
export * from './users-admin'
export * from './review'

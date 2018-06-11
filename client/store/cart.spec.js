/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { getInitialCartThunk, setCartThunk, removeCartItemThunk } from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const db = require('../../server/db')
const User = db.models.user
const CartItem = db.models.cartItem

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Cart Redux', () => {
  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = {
      productList: [
        { id: 1, title: 'product1' },
        { id: 2, title: 'product2' }
      ],
      cart: [{
        id: 1,
        itemId: 2,
        quantity: 2,
      }]
    }

    const init1 = [{
      id: 1,
      itemId: 1,
      quantity: 1,
    }]

    const add1 = {
      id: 2,
      itemId: 2,
      quantity: 2,
    }

    const edit1 = {
      id: 1,
      itemId: 1,
      quantity: 11,
    }

    const nonAdmin = {
      name: 'cody',
      email: 'cody@email.com'
    }

    const admin = {
      name: 'admin',
      email: 'admin@email.com',
      isAdmin: true
    }

    beforeEach(async () => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
      await User.create(nonAdmin)
      await User.create(admin)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    it('getInitialCartThunk', async () => {
      mockAxios.onGet('api/cart').replyOnce(200, init1)
      await store.dispatch(getInitialCartThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_CART')
      expect(actions[0].cart).to.deep.equal(init1)
    })

    it('setCartThunk - edit', async () => {
      mockAxios.onPost('api/cart', edit1).replyOnce(204, [edit1])
      await store.dispatch(setCartThunk(edit1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_CART')
      expect(actions[0].cart).to.deep.equal([edit1])
    })

    it('setCartThunk - add', async () => {
      mockAxios.onPost('api/cart', add1).replyOnce(201, [...store.getState().cart, add1])
      await store.dispatch(setCartThunk(add1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_CART')
      expect(actions[0].cart).to.deep.equal([...store.getState().cart, add1])
    })

    it('removeCartItemThunk', async () => {
      mockAxios.onDelete(`api/cart/${edit1.id}`).replyOnce(200, [])
      await store.dispatch(removeCartItemThunk(edit1.id))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_CART')
      expect(actions[0].cart).to.deep.equal([])
    })
  })
})

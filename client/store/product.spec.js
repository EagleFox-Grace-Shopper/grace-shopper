/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { addProductThunk, editProductThunk, removeProductThunk } from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const db = require('../../server/db')
const User = db.models.user
const Product = db.models.product

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Product Redux', () => {
  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = { productList: [], selectedProduct: {} }

    const init1 = {
      title: 'title',
      description: 'desc',
      price: 1,
      quantity: 2,
      imageUrl: 'http://www.a.com'
    }

    const add1 = {
      title: 'add1',
      description: 'add1',
      price: 1,
      quantity: 2,
      imageUrl: 'http://www.add1.com'
    }

    const edit1 = {
      id: 1,
      title: 'edit1',
      description: 'edit1',
      price: 1,
      quantity: 2,
      imageUrl: 'http://www.edit1.com'
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
      await Product.create(init1)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    it('addProductThunk', async () => {
      mockAxios.onPost('api/admin/products/add').replyOnce(201, add1)
      await store.dispatch(addProductThunk(add1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_PRODUCT')
      expect(actions[0].product).to.deep.equal(add1)
    })

    it('editProductThunk', async () => {
      mockAxios.onPut('api/admin/products/1', edit1).replyOnce(204, edit1)
      await store.dispatch(editProductThunk(edit1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_PRODUCT')
      expect(actions[0].product).to.deep.equal(edit1)
    })
  })
})

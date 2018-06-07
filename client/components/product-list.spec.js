import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { ProductList } from './product-list'

describe('ProductList', () => {
  let productList

  beforeEach(() => {
    productList = shallow(<ProductList />)
  })

  // xit('', () => {
  //   expect(productList.find('').text()).to.be.equal('')
  // })
})

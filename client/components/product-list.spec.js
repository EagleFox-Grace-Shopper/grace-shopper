import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { ProductList } from './product-list'

describe('ProductList', () => {
  let productList

  beforeEach(() => {
    productList = shallow(<ProductList />)
  })

  // it('renders the form', () => {
  //   expect(productForm.find('form').text()).to.be.equal('')
  // })
})

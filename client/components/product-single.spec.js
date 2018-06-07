import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import {default as SingleProduct } from './product-single'

// defined in ../client/components/SingleCampus.js
describe('<SingleProduct /> component', () => {
  let renderedSingleProduct

  beforeEach('Create component', () => {
    renderedSingleProduct = shallow(<SingleProduct />)
  })

  xit('has a `selectedProduct` field on its state', () => {
    expect(renderedSingleProduct.state().selectedProduct).to.exist
  })
})


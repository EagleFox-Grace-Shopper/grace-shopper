import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { default as Cart } from './cart'

// defined in ../client/components/SingleCampus.js
describe('<SingleProduct /> component', () => {
  let renderedSingleProduct

  beforeEach('Create component', () => {
    renderedSingleProduct = shallow(<Cart />)
  })

  xit('has a `selectedProduct` field on its state', () => {
    expect(renderedSingleProduct.state().selectedProduct).to.exist
  })
})


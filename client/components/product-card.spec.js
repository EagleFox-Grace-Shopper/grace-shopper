import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { ProductCard } from './product-card'

describe('ProductCard', () => {
  let productCard

  beforeEach(() => {
    productCard = shallow(<ProductCard />)
  })

  // it('renders the form', () => {
  //   expect(productForm.find('form').text()).to.be.equal('')
  // })
})

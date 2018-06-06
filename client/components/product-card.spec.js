import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { ProductCard } from './product-card'

describe('ProductCard', () => {
  let productCard

  beforeEach(() => {
    productCard = shallow(<ProductCard product={} />)
  })

  it('renders the product in an h4', () => {
    expect(productCard.find('h4').text()).to.be.equal('')
  })
})

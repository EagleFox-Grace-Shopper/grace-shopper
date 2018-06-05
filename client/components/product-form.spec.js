import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { ProductForm } from './product-form'

describe('Add product form', () => {
  let productForm

  beforeEach(() => {
    productForm = shallow(<ProductForm name='add' />)
  })

  it('renders the form', () => {
    expect(productForm.find('form').text()).to.be.equal('')
  })
})

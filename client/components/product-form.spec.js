import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { ProductForm } from './product-form'

describe('Admin Add/Edit product form', () => {
  let productForm
  const initialState = {
    selectedProduct: {
      id: 1,
      title: 'title',
      description: 'desc',
      price: 1,
      quantity: 2,
      imageUrl: 'http://www.a.com'
    }
  }

  beforeEach(() => {
    productForm = shallow(<ProductForm
      name="editProduct"
      displayName="edit"
      selectedProduct={initialState.selectedProduct}
      match={{ params: { id: 1 } }}
      getInitialProduct={() => { }} />)
  })

  it('renders the form with correct # of inputs', () => {
    expect(productForm.contains(<form />))
    expect(productForm.find('form').get(0).props.children.length).to.be.equal(6)
  })

  it('populates fields with initial state', () => {
    expect(productForm.find('input').get(0).props.value).to.be.equal(initialState.selectedProduct.title)
  })
})


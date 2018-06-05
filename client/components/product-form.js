import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const ProductForm = (props) => {
  const { name, displayName, handleSubmit, selectedProduct } = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="title"><small>Product Title</small></label>
          <input name="title" type="text" value={selectedProduct.title || ''} />
        </div>
        <div>
          <label htmlFor="description"><small>Description</small></label>
          <textarea name="description" value={selectedProduct.description || ''} />
        </div>
        <div>
          <label htmlFor="price"><small>Product Price</small></label>
          <input name="price" type="text" value={selectedProduct.price || 0} />
        </div>
        <div>
          <label htmlFor="quantity"><small>Inventory Qty</small></label>
          <input name="quantity" type="number" value={selectedProduct.quantity || 0} />
        </div>
        <div>
          <label htmlFor="imageUrl"><small>Image URL</small></label>
          <input name="imageUrl" type="text" value={selectedProduct.imageUrl || ''} />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapAddProduct = (state) => {
  return {
    name: 'addProduct',
    displayName: 'Add',
    selectedProduct: {}
  }
}

const mapEditProduct = (state) => {
  return {
    name: 'editProduct',
    displayName: 'Edit',
    error: state.product.error,
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const title = evt.target.title.value
      const description = evt.target.description.value
      dispatch(auth(title, description, formName))
    }
  }
}

export const AddProduct = connect(mapAddProduct, mapDispatch)(ProductForm)
export const EditProduct = connect(mapEditProduct, mapDispatch)(ProductForm)

/**
 * PROP TYPES
 */
ProductForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

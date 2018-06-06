import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addProductThunk, editProductThunk, getInitialProductThunk } from '../store'

/**
 * COMPONENT
 */
class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: this.props.selectedProduct,
      redirectId: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    const urlId = Number(this.props.match.params.id)
    if (Number(this.props.selectedProduct.id) !== urlId) {
      const curProduct = await this.props.getInitialProduct(urlId)
      this.setState({ selectedProduct: { ...curProduct, id: urlId } })
    }
  }
  handleChange(evt) {
    this.setState({ selectedProduct: { [evt.target.name]: [evt.target.value] } })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const title = evt.target.title.value
    const description = evt.target.description.value
    const price = Number(evt.target.price.value)
    const quantity = Number(evt.target.quantity.value)
    const imageUrl = (
      evt.target.imageUrl.value ?
        evt.target.imageUrl.value
        : null
    )
    const newProductObject = { title, description, price, quantity, imageUrl }
    const curProduct = (formName === 'addProduct' ?
      addProduct(newProductObject)
      : editProduct(newProductObject, ownProps.match.params.id))
    this.setState({ ...this.state, redirectId: curProduct.id })

  }
  render() {
    return this.state.redirectId ? <Redirect to={`/products/${this.state.selectedProduct.id}`} /> : (
      <div>
        <h2>{this.props.displayName} Product Form</h2>
        <form onSubmit={this.state.props.handleSubmit} name={this.props.name} onChange={this.handleChange}>
          <div>
            <label htmlFor="title"><small>Product Title</small></label>
            <input name="title" type="text" value={this.state.selectedProduct.title} />
          </div>
          <div>
            <label htmlFor="description"><small>Description</small></label>
            <textarea name="description" value={this.state.selectedProduct.description} />
          </div>
          <div>
            <label htmlFor="price"><small>Product Price</small></label>
            <input name="price" type="text" value={this.state.selectedProduct.price} />
          </div>
          <div>
            <label htmlFor="quantity"><small>Inventory Qty</small></label>
            <input name="quantity" type="number" value={this.state.selectedProduct.quantity} />
          </div>
          <div>
            <label htmlFor="imageUrl"><small>Image URL</small></label>
            <input name="imageUrl" type="text" value={this.state.selectedProduct.imageUrl || ''} />
          </div>
          <div>
            <button type="submit">{this.props.displayName}</button>
          </div>
        </form>
      </div>
    )
  }
}


const mapAddProduct = () => {
  return {
    name: 'addProduct',
    displayName: 'Add',
    selectedProduct: {
      title: '',
      description: '',
      price: 0,
      quantity: 0,
      imageUrl: ''
    }
  }
}

const mapEditProduct = (store) => {
  return {
    name: 'editProduct',
    displayName: 'Edit',
    selectedProduct: store.product.selectedProduct
  }
}

const mapDispatch = (dispatch) => {
  return {
    getInitialProduct(productId) {
      return dispatch(getInitialProductThunk(productId))
    },
    addProduct: (product) => { },
  }
}

export const AddProduct = connect(mapAddProduct, mapDispatch)(ProductForm)
export const EditProduct = connect(mapEditProduct, mapDispatch)(ProductForm)

/**
 * PROP TYPES
 */
// ProductForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
// }

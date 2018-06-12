import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addProductThunk, editProductThunk, getInitialProductThunk } from '../store'

/**
 * COMPONENT
 */
export class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: {
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        imageUrl: '',
        categories: []
      },
      redirect: false
    }
  }
  async componentDidMount() {
    const urlId = Number(this.props.match.params.id)
    if (urlId && Number(this.props.selectedProduct.id) !== urlId) {
      await this.props.getInitialProduct(urlId)
    }
    this.setState({ selectedProduct: this.props.selectedProduct })
  }
  handleChange = (evt) => {
    const curItem = { ...this.state.selectedProduct }
    if (evt.target.name === 'price') {
      this.setState({
        selectedProduct: {
          ...curItem,
          price: evt.target.value * 100
        }
      })
    } else {
      this.setState({
        selectedProduct: {
          ...curItem,
          [evt.target.name]: evt.target.value
        }
      })
    }
  }
  handleSubmit = async (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    if (formName === 'addProduct') {
      await this.props.addProduct(this.state.selectedProduct)
    } else {
      await this.props.editProduct(this.state.selectedProduct)
    }
    await this.setState({
      selectedProduct: this.props.selectedProduct,
      redirect: true
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/products/${this.props.selectedProduct.id}`} />
    }
    return (
      <div>
        <h2>{this.props.displayName} Product Form</h2>
        <form onSubmit={this.handleSubmit} name={this.props.name} onChange={this.handleChange}>
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
            <input name="price" type="text" value={(this.state.selectedProduct.price / 100).toFixed(2)} />
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
            <label><small>Categories</small></label>
            <select multiple>
              {this.props.categories.map(cat => (
                <option value={cat.id} key={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">{this.props.displayName}</button>
          </div>
        </form>
      </div>
    )
  }
}


const mapAddProduct = (store) => {
  return {
    name: 'addProduct',
    displayName: 'Add',
    selectedProduct: store.product.selectedProduct,
    categories: store.category.categories
  }
}

const mapEditProduct = (store) => {
  return {
    name: 'editProduct',
    displayName: 'Edit',
    selectedProduct: store.product.selectedProduct,
    categories: store.category.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    getInitialProduct: (productId) => {
      return dispatch(getInitialProductThunk(productId))
    },
    addProduct: (product) => {
      return dispatch(addProductThunk(product))
    },
    editProduct: (product) => {
      return dispatch(editProductThunk(product))
    }
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

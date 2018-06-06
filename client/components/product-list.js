import React, { Component } from 'react'
import ProductCard from './product-card'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    productList: state.product.productList
  }
}

const mapDispatchToProps = (dispatch) => {
}

class ProductList extends Component {
  render () {

    const productList = this.props.productList

    return (
      <div>
        <h2>All Products</h2>
        <ul>
          { productList.map(product => <ProductCard product={product} key={product.id} />) }
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

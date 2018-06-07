import React, { Component } from 'react'
import ProductCard from './product-card'
import { connect } from 'react-redux'
import { getInitialProductListThunk } from '../store'

const mapStateToProps = (state) => {
  return {
    productList: state.product.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductListThunk: dispatch(getInitialProductListThunk())
  }
}

class ProductList extends Component {

  async componentDidMount(){
    await this.props.getProductListThunk()
  }

  render () {

    const productList = this.props.productList
    console.log('productlist:', productList)
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

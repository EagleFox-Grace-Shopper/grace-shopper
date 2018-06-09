import React, { Component } from 'react'
import ProductCard from './product-card'
import { connect } from 'react-redux'
import { getInitialProductListThunk } from '../store'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  width: 80%;
`

const ProductListContent = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

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

  async componentDidMount() {
    if (this.props.productList.length === 0) {
      console.log('didmount, productList length is 0')
      await this.props.getProductListThunk()
    }
  }

  render() {

    const productList = this.props.productList
    console.log('productlist:', this.props)
    return (
      <Wrapper>
        <h2>All Products</h2>
        <ProductListContent>
          {productList.map(product => <ProductCard product={product} key={product.id} />)}
        </ProductListContent>
      </Wrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

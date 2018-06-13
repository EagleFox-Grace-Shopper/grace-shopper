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

class ProductList extends Component {

  async componentDidMount() {
    if (this.props.productList.length === 0) {
      await this.props.getProductListThunk()
    }
  }

  render() {

    const productList = this.props.productList
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

const mapStateToProps = (store) => {
  return {
    productList: store.product.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductListThunk: () => dispatch(getInitialProductListThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

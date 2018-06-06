import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getInitialProductThunk} from '../store'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: this.props.selectedProduct,
    }
  }
  async componentWillMount(){

  }
  async componentDidMount(){
    const urlId = Number(this.props.match.params.id)
    const curProduct = await this.props.getInitialProduct(urlId)
    this.setState({selectedProduct: curProduct})
  }

  render() {
    const urlId = Number(this.props.match.params.id)

    const title       = this.state.selectedProduct.title
    const description = this.state.selectedProduct.description
    const price       = this.state.selectedProduct.price
    const quantity    = this.state.selectedProduct.quantity
    const imageUrl    = this.state.selectedProduct.imageUrl

    return (
      <div>
        <div>
          <h1>
            {title}
          </h1>
        </div>

        <div>
          <p>
            {description}
          </p>
        </div>

        <div>
          <h3>
          $
            {price}
          </h3>
        </div>

        <div>
          <p>
            {quantity}
          </p>
        </div>

        <div>
          <img src={imageUrl} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    selectedProduct: store.product.selectedProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialProduct(productId){
      return dispatch(getInitialProductThunk(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

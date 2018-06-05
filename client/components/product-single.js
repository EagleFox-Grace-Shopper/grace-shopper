import React, {Component} from 'react'
import connect from 'react-redux'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {}
  }


  render() {
    return (
      <div>
        <h1> singleProduct testing </h1>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    product: store.product
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

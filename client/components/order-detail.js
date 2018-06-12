import React, { Component } from 'react'
import { getOrderThunk } from '../store'
import { connect } from 'react-redux'

class OrderDetail extends Component {

  async componentDidMount() {
    if (this.props.selectedOrder.length === 0) {
      await this.props.getOrderThunk()
    }
  }

  render() {

    const selectedOrder = this.props.selectedOrder
    return (
      <div>
        <h3>{selectedOrder.title}</h3>
        <h3>Price</h3>
        <h3>Quantity</h3>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    selectedOrder: store.order.selectedOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderThunk: () => dispatch(getOrderThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)

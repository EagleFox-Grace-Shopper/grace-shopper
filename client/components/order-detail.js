import React, { Component } from 'react'
import { getOrderThunk } from '../store'
import { connect } from 'react-redux'

class OrderDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  async UNSAFE_componentWillMount() {
    if (this.props.orderLines.length === 0) {
      await this.props.getOrder(Number(this.props.match.params.orderid))
    }
  }

  render() {
    const orderLines = this.props.orderLines
    console.log('*****', orderLines)
    return (
      <div>
      {orderLines.map(order => {
        return (
          <div key={order.id}>
            <h3>{order.title}</h3>
            <h3>Price</h3>
            <h3>Quantity</h3>
          </div>
        )
       }
       )}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    selectedOrder: store.order.selectedOrder,
    orderLines: store.order.orderLines
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(getOrderThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)

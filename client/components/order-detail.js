import React, { Component } from 'react'
import { getOrderThunk } from '../store'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 310px;
  height: 310px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
`

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
      <Wrapper>
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
      </Wrapper>
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

import React, { Component } from 'react'
import OrderRow from './order-row'
import { connect } from 'react-redux'
import { getOrderListThunk } from '../store'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  width: 80%;
`

class OrderPage extends Component {

  async componentDidMount() {
    if (this.props.orderList.length === 0) {
      await this.props.getOrderListThunk()
    }
  }

  render() {

    const orderList = this.props.orderList
    return (
      <Wrapper>
        <h2>Orders</h2>
        {orderList.map(order => <OrderRow order={order} key={order.id} />)}
      </Wrapper>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    orderList: store.order.orderList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderListThunk: () => dispatch(getOrderListThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)

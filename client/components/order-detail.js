import React, { Component } from 'react'
import { getOrderThunk } from '../store'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  width: 80%;
`

const OrderListContent = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`

const Wrapper2 = styled.div`
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
const H3NoMargin = styled.h3`
  margin: 0;
`

const CardImage = styled.img`
  max-height: 200px;
  max-width: 300px;
  height: auto;
  width: auto;
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
    return (
      <Wrapper>
        <h2>Order</h2>
        <OrderListContent>
          {orderLines.map(order => {
            return (
              <Wrapper2 key={order.productId}>
                <Link to={`/products/${order.productId}`}>
                  <H3NoMargin>{order.title}</H3NoMargin>
                </Link>
                <Link to={`/products/${order.id}`}>
                  <CardImage src={order.imageUrl} />
                </Link>
                <H3NoMargin>Total Price: ${(order.price/100).toFixed(2)}</H3NoMargin>
                <H3NoMargin>Quantity Purchased: {order.qtyPurchased}</H3NoMargin>
              </Wrapper2>
            )
          }
          )}
        </OrderListContent>
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

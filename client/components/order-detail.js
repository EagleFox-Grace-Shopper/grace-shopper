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
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  height: 10em;
  border: 1px solid black;
  border-radius: 5px;
  margin: auto;
`
const H3NoMargin = styled.h3`
  margin: 0;
`
const H1NoMargin = styled.h1`
  margin: 0;
`
const CardImage = styled.img`
  max-height: calc(10em - 0.3em);
  max-width: 300px;
  height: auto;
  width: auto;
`

const OrderInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: .5em;
  padding: 1em;
  border: 1px solid rgb(201, 161, 109);
  background-color: rgb(235, 235, 235);
  border-radius: 5px;
  min-width: 50%;
`
const Hr = styled.hr`
  border-top: 1px solid rgb(201, 161, 109);
  width: 90%;
`
const OrderUI = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`
const Details = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
`
const ImageLeft = styled.div`
  width: 40%;
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
                <Details>
                  <ImageLeft>
                    <Link to={`/products/${order.productId}`}>
                      <CardImage src={order.imageUrl} />
                    </Link>
                  </ImageLeft>
                  <OrderInfo>
                    <Link to={`/products/${order.productId}`}>
                      <H1NoMargin>{order.title}</H1NoMargin>
                    </Link>
                    <H3NoMargin>Total Price: ${(order.price/100).toFixed(2)}</H3NoMargin>
                    <H3NoMargin>Quantity Purchased: {order.qtyPurchased}</H3NoMargin>
                  </OrderInfo>
                </Details>
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

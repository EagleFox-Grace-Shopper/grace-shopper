import React, { Component } from 'react'
import OrderRow from './order-row'
import { connect } from 'react-redux'
import { getOrderListThunk } from '../store'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  max-width: 80em;
  margin: auto;
  padding: 5px 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const OrderList = styled.table`
  border-collapse: collapse;
  position: relative;
  background-color: rgba(255, 193, 128, .6);
  padding: .25em;
  width: 100%;
  text-align: center;
  margin: 5px 0;
`

const ThId = styled.th`
padding: 5px;
`

const ThDate = styled.th`
padding: 5px;
`

const ThTotalAmt = styled.th`
padding: 5px;
`

const ThStatus = styled.th`
padding: 5px;
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
        <Header>
          <h2>Orders</h2>
        </Header>
        <OrderList>
          <tbody>
            <tr>
              <ThId>
                Order ID
              </ThId>
              <ThDate>
                Order Date
              </ThDate>
              <ThTotalAmt>
                Total Price
              </ThTotalAmt>
              <ThStatus>
                Order Status
              </ThStatus>
            </tr>
            {orderList.map(order => <OrderRow order={order} key={order.id} />)}
          </tbody>
        </OrderList>
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

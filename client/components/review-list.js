import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ReviewCard } from './index'
import { fetchProductReviews } from '../store'

const mapStateToProps = (store, ownProps) => {
  return {
    productReviewList: store.review.productReviewList,
    prodId: ownProps.prodId
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchReviews: (id) => {
      return dispatch(fetchProductReviews(id))
    }
  })
}

class ReviewList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productReviewList: this.props.productReviewList
    }
  }

  async componentDidMount() {
    const prodId = this.props.prodId
    await this.props.fetchReviews(prodId)
    this.setState({
      productReviewList: this.props.productReviewList
    })
  }

  render() {
    const reviewList = this.state.productReviewList
    return (
      <div style={{ width: '95%' }}>
        <h1>
          Reviews:
        </h1>
        {
          reviewList.map((reviewX, idx) => {
            return <ReviewCard key={idx} review={reviewX} />
          })
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)

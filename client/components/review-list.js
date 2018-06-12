import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { ReviewCard } from './index'

const mapStateToProps = (state) => {
  return {
    reviewList: state.review.reviewList
  }
}

const fakeReviews = [
  {
    tite: 'review1',
    description: 'cool review',
  },
  {
    description: 'review 2',
    tite: 'not cool review',
  },
  {
    description: 'review 3',
    tite: 'awesome review',
  },
  {
    description: 'review 4',
    tite: 'crazy review',
  }
]

class ReviewList extends Component {
  constructor() {
    super()
    this.state = {
      reviewList: fakeReviews
    }
  }

  render() {
    const reviewList = this.state.reviewList
    return (
      <div>
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

export default connect(mapStateToProps, null)(ReviewList)

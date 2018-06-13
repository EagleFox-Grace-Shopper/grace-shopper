import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserProductReview } from '../store'

const mapStateToProps = ( store ) => {
  return ({
    userProductReview: store.review.userProductReview
  })
}


const mapDispatchToProps = (dispatch) => {
  return ({
    fetchUserProductReview: (productId) => {
      return (
        dispatch(fetchUserProductReview(productId))
      )
    }
  })
}


class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userProductReview: this.props.userProductReview,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const productId = Number(this.props.match.params.id)
    await this.props.fetchUserProductReview(productId)
    this.setState({
      userProductReview: this.props.userProductReview
    })
  }

  handleChange() {

  }

  render() {
    /*
    console.log('this.props is ==================== ', this.props)
    console.log('this.props.userProductReview is == ', this.props.userProductReview)
    console.log('this.state.userProductReview is == ', this.state.userProductReview)
    */
    
    return (
      <div>
        <h1>
          ReviewFormTesting
        </h1>
      </div>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)

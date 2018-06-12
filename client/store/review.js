import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS'

/**
 * INITIAL STATE
 */
const defaultReviews = {
  productReviewList: [],
}
/**
 * ACTION CREATORS
 */
const getProductReviews = (reviews) => {
  return ({
    type: GET_PRODUCT_REVIEWS,
    reviews
  })
}

/**
 * THUNK CREATORS
 */

export const fetchProductReviews = (productId) => {
  return async (dispatch) => {
    const reviewData = await axios.get(`/api/reviews/${productId}/`)
    dispatch(getProductReviews(reviewData.data))
  }
}


/**
 * REDUCER
 */

export default function (state = defaultReviews, action) {
  switch (action.type) {
  case GET_PRODUCT_REVIEWS:
    return {
      ...state,
      productReviewList: action.reviews,
    }
  default:
    return state
  }
}

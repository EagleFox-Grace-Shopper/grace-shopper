import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_REVIEW = 'SET_REVIEW'
const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS'
const GET_USER_PRODUCT_REVIEW = 'GET_USER_PRODUCT_REVIEW'
const POST_USER_PRODUCT_REVIEW = 'POST_USER_PRODUCT_REVIEW'

/**
 * INITIAL STATE
 */
const defaultReviews = {
  productReviewList: [],
  userProductReview: {},
}
/**
 * ACTION CREATORS
 */
const setReview = (review) => {
  return {
    type : SET_REVIEW,
    review,
  }
}

const getProductReviews = (reviews) => {
  return ({
    type: GET_PRODUCT_REVIEWS,
    reviews
  })
}

const getUserProductReviews = (review) => {
  return ({
    type: GET_USER_PRODUCT_REVIEW,
    review
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

export const fetchUserProductReview = (productId) => {
  return async (dispatch) => {
    const reviewData = await axios.get(`/api/reviews/${productId}/user/`)
    dispatch(getUserProductReviews(reviewData.data))
  }
}

export const postUserProductReview = (productId, reviewObject) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/reviews/${productId}/`, reviewObject)
    dispatch(setReview(res.data))
  }
}


/**
 * REDUCER
 */

export default function (state = defaultReviews, action) {
  switch (action.type) {
  case SET_REVIEW:
    return {
      ...state,
      review: action.review,
    }
  case GET_PRODUCT_REVIEWS:
    return {
      ...state,
      productReviewList: action.reviews,
    }
  case GET_USER_PRODUCT_REVIEW:
    return {
      ...state,
      userProductReview: action.review,
    }
  default:
    return state
  }
}

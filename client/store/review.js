/**
 * ACTION TYPES
 */
const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS'

/**
 * INITIAL STATE
 */
const defaultReviews = {
  reviewList: [],
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
const fetchProductReviews = (product) => {
  return async (dispatch) => {
    //PLACEHOLDER:
    //const reviewData = axios.get('/api/productId/')




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
      reviewList: action.reviews,
    }
  default:
    return state
  }
}

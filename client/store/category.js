import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const EDIT_CATEGORY = 'EDIT_CATEGORY'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultState = {
  categories: [],
}
/**
 * ACTION CREATORS
 */
const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

const addCategory = category => {
  return {
    type: ADD_CATEGORY,
    category
  }
}

const editCategory = (id, category) => {
  return {
    type: EDIT_CATEGORY,
    id,
    category
  }
}

const removeCategory = id => {
  return {
    type: REMOVE_CATEGORY,
    id
  }
}

/**
 * THUNK CREATORS
 */


export const getCategoriesThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/products/categories')
    dispatch(getCategories(data))
  }
}

export const addCategoryThunk = category => {
  return async dispatch => {
    const {data} = await axios.post('/api/admin/categories/add', category)
    dispatch(addCategory(data))
  }
}

export const editCategoryThunk = (id, category) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/admin/categories/${id}`, category)
    dispatch(editCategory(data))
  }
}

export const removeCategoryThunk = id => {
  return async dispatch => {
    const {data} = await axios.delete(`api/admin/categories/${id}`)
    dispatch(removeCategory(id))
  }
}


/**
 * REDUCER
 */

export default function (state = defaultState, action){
  switch (action.type) {
  case GET_CATEGORIES:
    return {...state, categories: action.categories}
  case ADD_CATEGORY:
    return {...state, categories: state.categories.concat(action.category)}
  case EDIT_CATEGORY:
    return {...state, categories: [
      ...state.categories.filter(cat => {
        if ([action.id].indexOf(cat.id) === -1) {
          return true
        }
        return false
      }),
      action.category
    ]}
  case REMOVE_CATEGORY:
    return {...state,
      categories: [state.categories.filter(cat => cat.id !== action.id)][0]}
  default:
    return state
  }
}


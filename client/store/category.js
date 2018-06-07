import axios from 'axios'
import history from '../history'

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

const editCategory = category => {
  return {
    type: EDIT_CATEGORY,
    category
  }
}

const removeCategory = category => {
  return {
    type: REMOVE_CATEGORY,
    category
  }
}

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */

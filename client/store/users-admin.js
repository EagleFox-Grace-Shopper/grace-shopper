import axios from 'axios'
import history from '../history'


const defaultState = {
  users: []
}


//action types
const FETCH_USERS = 'FETCH_USERS'
const ADD_USER    = 'ADD_USER'
const EDIT_USER   = 'EDIT_USER'
const DELETE_USER = 'DELETE_USER'

//action creators
const fetchUsers = users => {
  return {
    type: FETCH_USERS,
    users
  }
}

const addUser = user => {
  return {
    type: ADD_USER,
    user
  }
}

const editUser = user => {
  return {
    type: EDIT_USER,
    user
  }
}

const deleteUser = id => {
  return {
    type: DELETE_USER,
    id
  }
}

//Thunk Creators

export const fetchUsersThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/admin/users')
    dispatch(fetchUsers(data))
  }
}

export const addUserThunk = user => {
  return async dispatch => {
    const {data} = await axios.post('/api/admin/users/add')
    dispatch(addUser(data))
  }
}

export const editUserThunk = user => {
  return async dispatch => {
    const {data} = await axios.put()
    dispatch(editUser(data))
  }
}

export const deleteUserThunk = id => {
  return async dispatch => {
    const {data} = await axios.delete(`/api/admin/users/${id}`)
    dispatch(deleteUser(id))
  }
}

//Reducer

export default function (state = defaultState, action){
  switch (action.type){
  case FETCH_USERS:
    return {...state, users: action.users}
  case ADD_USER:
    return {...state, users: state.users.concat(action.user)}
  case EDIT_USER:
    return {...state, users: action.users}
  case DELETE_USER:
    return {...state,
      users: [state.users.filter(user => user.id !== action.id)][0]}
  default:
    return defaultState
  }
}

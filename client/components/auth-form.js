import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, newUserThunk} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, handleNewuser, error} = props

  return (
    <div>
      <form onSubmit={(displayName === 'Sign Up') ? handleNewuser : handleSubmit} name={name}>
        {displayName === 'Sign Up' &&
        <div>
          <label htmlFor="name"><small>Name</small></label>
          <input name="name" type="text" />
        </div>}
        {displayName === 'Sign Up' &&
        <div>
          <label htmlFor="address"><small>Address</small></label>
          <input name="address" type="text" />
        </div>}
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
    handleNewuser (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const name = evt.target.name.value
      const address = evt.target.address.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(newUserThunk(name, email, address, password))
      history.push('/')
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

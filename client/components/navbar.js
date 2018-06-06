import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ( { cats, logOut, isLoggedIn}) => {
  return (
    <div>
      <h1>EAGLEFOX SHOP</h1>
      <nav>
        <ul className="dropdown">
          <a className="dropbtn">Categories</a>
          <div className="dropdown-content">
            {cats.map(cat => (
              <Link to={`/api/categories/${cat.id}`} key={cat.id}><a>{cat.name}</a></Link>
            ))}
          </div>
        </ul>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={logOut}>
            Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}

      </nav>
      <hr />
    </div>
  )}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cats: [{id: 1, name: 'wacky'}, {id: 2, name: 'clothing'}, {id: 3, name: 'kitchen'}, {id: 4, name: 'stuff'}]
  }
}

const mapDispatch = dispatch => {
  return {
    logOut: () => {
      dispatch(logout())
    },
    getProducts: () => {
      dispatch()
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

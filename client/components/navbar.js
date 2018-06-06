import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getProductsByCatThunk, getProductsBySearchThunk} from '../store/product'

const Navbar = ( { searchProducts, getProducts, cats, logOut, isLoggedIn}) => {
  return (
    <div>
      <a href="/"><h1>EAGLEFOX SHOP</h1></a>
      <nav>
        <ul className="navStuff">
          <li>
            <ul className="dropdown">
              <a className="dropbtn">Categories</a>
              <div className="dropdown-content">
                {cats.map(cat => (
                  <Link
                    to={`/browse/${cat.name}`}
                    key={cat.id}
                    onClick={() => getProducts(cat.id)}><a>{cat.name}</a>
                  </Link>
                ))}
              </div>
            </ul>
          </li>
          <li className="search-container">

            <input type="text" placeholder="Enter product name..." name="search" id="search" />
            <input
              type="submit"
              value="Search"
              onClick={() => {
                window.location = `/products?search=${document.getElementById('search').value}`
                searchProducts(document.getElementById('search').value)

              }}
            />

          </li>
          {isLoggedIn ? (
            <li className="userActions">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={logOut}>
            Logout
              </a>
            </li>
          ) : (
            <li className="userActions">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </li>
          )}
        </ul>
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
    getProducts: (categoryId) => {
      dispatch(getProductsByCatThunk(categoryId))
    },
    searchProducts: (search) => {
      dispatch(getProductsBySearchThunk(search))
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

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { getProductsByCatThunk, getProductsBySearchThunk } from '../store/product'
import { CartIcon } from './index'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  background-color: #333;
  width: 100%;
  height: 4em;
  background-color: #000b43;
  padding: 5px 5px 0 5px;
`
const Title = styled.a`
  width: 11em;
  padding-left: 10px;
  color: white;
  font-size: 2em;
  font-weight: bold;
  display: flex;
  align-items: center;
`
const Nav = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
`

const NavItem = styled.div`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`

const NavLeft = styled.div`
  display: flex;
`

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CatDropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`

const CatDropdown = styled.ul`
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  &:hover ${CatDropdownContent}{
    display: block;
  }
`
const CatItem = styled.div`
  color: black;
  padding: 12px 16px;
  text - decoration: none;
  display: block;
  text - align: left;
  &:hover {
    background-color: #f1f1f1
  }
`

export const Navbar = ({ searchProducts, getProducts, cats, logOut, isLoggedIn, isAdmin }) => {
  return (
    <Wrapper>
      <Title href="/">EAGLEFOX SHOP</Title>
      <Nav>
        <NavLeft>
          <CatDropdown>
            <NavItem>Categories</NavItem>
            <CatDropdownContent>
              {cats.map(cat => (
                <Link
                  to={`/browse/${cat.name}`}
                  key={cat.id}
                  onClick={() => getProducts(cat.id)}>
                  <CatItem>{cat.name}</CatItem>
                </Link>
              ))}
            </CatDropdownContent>
          </CatDropdown>
          <form className="search-container">

            <input type="text" placeholder="Enter product name..." name="search" id="search" />
            <button
              type="button"
              value="Search"
              onClick={(event) => {
                event.preventDefault()
                window.location = `/products?search=${document.getElementById('search').value}`
                searchProducts(document.getElementById('search').value)
              }}
            >
              Search
            </button>
          </form>
        </NavLeft>
        <NavRight>
          <CartIcon />
          {isAdmin ? (
            <NavRight>
              <hr />
              <Link to="/admin">
                <NavItem>Admin</NavItem>
              </Link>
            </NavRight>
          ) : (<div />)}
          {isLoggedIn ? (
            <NavRight>
              <hr />
              <Link to="/orders">
                <NavItem>Orders</NavItem>
              </Link>
              <hr />
              <a href="/" onClick={logOut}>
                <NavItem>Logout</NavItem>
              </a>
            </NavRight>
          ) : (
            <NavRight>
              <hr />
              <Link to="/login">
                <NavItem>Login</NavItem>
              </Link>
              <hr />
              <Link to="/signup">
                <NavItem>Sign Up</NavItem>
              </Link>
            </NavRight>
          )}
        </NavRight>
      </Nav>
    </Wrapper>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    cats: state.category.categories
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, AddProduct, EditProduct, SingleProduct, ProductList, Cart, Checkout, OrderPage, OrderDetail, categoryForm, adminHome, ReviewList, UserTable, UserForm} from './components'
import { me } from './store'


// {
//   isLoggedIn &&
//   <Route exact path="/orders/:orderid" component={OrderDetail} />
// }

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props

    return (
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        {
          isAdmin &&
          <Route exact path="/categories/editForm" component={categoryForm} />
        }

        {
          isAdmin &&
          <Route exact path="/admin" component={adminHome} />
        }
        <Route path="/checkout" component={Checkout} />

        {
          isLoggedIn &&
          <Route exact path="/orders" component={OrderPage} />
        }
        {
          isLoggedIn &&
          <Route exact path="/orders/:orderid" component={OrderDetail} />
        }
        {
          isAdmin &&
          <Route exact path="/products/add" component={AddProduct} />
        }
        <Route exact path="/products/:id" component={SingleProduct} />
        {
          isAdmin &&
          <Route exact path="/products/:id/edit" component={EditProduct} />
        }
        {
          isAdmin &&
          <Route exact path="/users/manage" component={UserTable} />
        }
        {
          isAdmin &&
          <Route path="/users/:id/edit" component={UserForm} />
        }
        {/* {
          isLoggedIn &&
          <Switch>
            <Route path="/home" component={UserHome} />

          </Switch>
        } */}
        {/* Displays our Login component as a fallback
        Should be a 404 page not found component */}
        <Route component={ProductList} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

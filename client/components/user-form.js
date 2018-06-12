import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCategoriesThunk, editCategoriesThunk, removeCategoryThunk, addCategoryThunk} from '../store/category'
import UserFormRow from './user-form-row'


class UserTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: this.props.users
    }
  }
  render() {
    const users = this.props.users
    return (
      <div>
        <table border="1" >
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th />
              <th />
              <th />
            </tr>
            {users.map(user => (
              <UserFormRow user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // users: state.users.users
    users: [{id: 1, name: 'Justin', email: 'j@hi.com', address: '123 street', isAdmin: true}, {id: 2, name: 'Maria', email: 'maria@aol.com', address: '789 avenue', isAdmin: false}]
  }
}

export default connect(mapStateToProps)(UserTable)

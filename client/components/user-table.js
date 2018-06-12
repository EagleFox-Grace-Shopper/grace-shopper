import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsersThunk, addUserThunk, deleteUserThunk, editUserThunk} from '../store/users-admin'
import UserFormRow from './user-table-row'


class UserTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: this.props.users
    }
  }

  componentDidMount(){
    this.props.getUsers()
  }

  render() {
    const users = this.props.users
    return (
      <div>
        <h2>All Users</h2>
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
              <UserFormRow user={user} key={user.id} editUser={this.props.editUser} deleteUser={this.props.removeUser} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersAdmin.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      return dispatch(fetchUsersThunk())
    },
    editUser: (user) => {
      return dispatch(editUserThunk(user))
    },
    removeUser: (id) => {
      return dispatch(deleteUserThunk(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {selectUserThunk, editUserThunk, fetchUsersThunk} from '../store'
import history from '../history'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUser: {
        id: 0,
        name: '',
        email: '',
        address: '',
        isAdmin: false
      }
      // id: 10,
      // name: 'Andre Nicatina',
      // email: 'nicki@gmail.com',
      // address: '123 Polk Street, SF',
      // isAdmin: true
    }
  }

  async componentDidMount(){
    const urlId = Number(this.props.match.params.id)

    const user = await this.props.fetchUser(urlId)
    this.setState({selectedUser: this.props.selectedUser})
  }

  handleChange = event => {
    const curUser = {...this.state.selectedUser}
    this.setState({selectedUser: {
      ...curUser,
      [event.target.name]: event.target.value
    }})
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.editUser(this.state.selectedUser)
    await this.props.fetchUsers()
    history.push('/users/manage')
  }

  render() {
    return (
      <div>
        <h2>Edit User</h2>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name"><small>Name</small></label>
            <input name="name" type="text" value={this.state.selectedUser.name} />
            <label htmlFor="email"><small>Email</small></label>
            <input email="email" type="text" value={this.state.selectedUser.email} />
            <label htmlFor="address"><small>Address</small></label>
            <input address="address" type="text" value={this.state.selectedUser.address} />
            <label htmlFor="isAdmin"><small>Admin?</small></label>
            <input name="isAdmin" type="checkbox" checked={this.state.selectedUser.isAdmin ? 'checked' : ''} />
            <br />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {selectedUser: state.usersAdmin.selectedUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => {
      return dispatch(selectUserThunk(id))
    },
    editUser: (user) => {
      return dispatch(editUserThunk(user))
    },
    fetchUsers: () => {
      return dispatch(fetchUsersThunk())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)

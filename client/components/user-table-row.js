import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import history from '../history'

export default function UserTableRow(props) {
  const user = props.user
  return (
    <tr>
      <td>
        {user.id}
      </td>
      <td>
        {user.name}
      </td>
      <td>
        {user.email}
      </td>
      <td>
        {user.address}
      </td>
      <td>
        {user.isAdmin ? 'Admin' : 'User'}
      </td>
      <td>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault()
            history.push(`/users/${user.id}/edit`)
          }}> Edit
        </button>
      </td>
      <td>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault()
            if (confirm(`Are you user you want to delete user ${user.name}?`)){
              props.deleteUser(user.id)
            }
          }}> Delete
        </button>

      </td>
      <td>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault()
            confirm(`This will reset the password for ${user.name}.  Do you want to continue?`)}}> Reset Password
        </button>
      </td>
    </tr>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const categoryList = (props) => {
  const cats = props.categories
  return (
    <div>
      <table>
        <tr>
          <th />
          <th>Name</th>
          <th />
          <th />
        </tr>
        {cats.map(cat => {
          <tr>
            <td>
              <input disabled type="text" value={cat.name} />
            </td>
            <td>Edit</td>
            <td>Remove</td>
          </tr>
        })}
      </table>
    </div>
  )
}

const mapStateToProps = props => {
  return {
    categories: state.category.categories
  }
}


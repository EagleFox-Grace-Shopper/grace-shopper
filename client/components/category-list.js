import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const categoryList = (props) => {
  console.log('categ', props.categories)
  const cats = props.categories
  return (
    <div>
      <table>
        <tbody>
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
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = props => {
  return {
    // categories: state.category.categories
    categories: [{name: 'hello'}, {name: 'pizza'}, {name: 'beer'}, {name: 'xmas'}]
  }
}

export default connect(mapStateToProps)(categoryList)


import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCategoriesThunk} from '../store/category'
import categoryFormRow from './category-form-row'


class CategoryForm extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log('fucking mount')
  }

  UNSAFE_componentWillMount(){
    console.log('fuck you')
    this.props.getCategories()
    console.log('cats mount', this.props.categories)
  }

  render() {
    const cats = this.props.categories
    console.log('cats', this.props.categories)
    return (
      <div>
        {console.log('in the render now.  pls respond')}
        <table>
          <tbody>
            <tr>
              <th />
              <th>Okay</th>
              <th />
              <th />
            </tr>
            {cats.map(cat => (
              <categoryFormRow cat={cat} key={cat.id} />
            ))}
          </tbody>
        </table>
      </div>
    )}
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories

  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      return dispatch(getCategoriesThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)


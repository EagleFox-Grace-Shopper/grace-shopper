import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCategoriesThunk} from '../store/category'
import CategoryFormRow from './category-form-row'


class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories,
      newCats: []
    }
  }


  UNSAFE_componentWillMount(){
    this.props.getCategories()
  }

  render() {
    const cats = this.props.categories
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th />
              <th>Category</th>
              <th />
              <th />
            </tr>
            {cats.map(cat => (
              <CategoryFormRow cat={cat} key={cat.id} />
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


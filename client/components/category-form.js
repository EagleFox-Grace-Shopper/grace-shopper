import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCategoriesThunk, editCategoriesThunk, removeCategoryThunk, addCategoryThunk} from '../store/category'
import CategoryFormRow from './category-form-row'


class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories,
    }
  }


  UNSAFE_componentWillMount(){
    this.props.getCategories()
  }

  handleCatUpdate = (newCat) => {
    this.setState((prevState) => {
      return {...this.state, categories: [...this.state.categories.filter(cat => {
        if ([cat.id].indexOf(newCat.id) === -1) {
          return true
        }
        return false
      }), newCat]}
    })
    console.log('curstate', this.state)
  }

  saveButton = (event) => {
    event.preventDefault()
    console.log('savebutton', this.state.categories)
    this.props.editCategories(this.state.categories)
    const inputs = [...document.getElementsByTagName('input')]
    inputs.forEach(inp => {
      if (inp.value){
        inp.placeholder = inp.value
        inp.removeAttribute('value')
        inp.disabled = 'true'}
    })
  }

  cancelButton = (event) => {
    event.preventDefault()
    const inputs = [...document.getElementsByTagName('input')]
    inputs.forEach(inp => {
      inp.value = inp.placeholder
      inp.removeAttribute('value')
      inp.disabled = 'true'
    })
  }

  render() {
    const cats = this.props.categories
    return (
      <div>
        <button type="submit" onClick={this.saveButton}>Save</button>
        <button type="submit" onClick={this.cancelButton}>Cancel</button>
        <table>
          <tbody>
            <tr>
              <th />
              <th>Category</th>
              <th />
              <th />
            </tr>
            {cats.map(cat => (
              <CategoryFormRow cat={cat} key={cat.id} onCatEdit={this.handleCatUpdate} removeCategory={this.props.removeCategory} />
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <input id="newCat" />
        <a
          href="#" onClick={() => {
            const inputBox = document.getElementById('newCat')
            this.props.addCategory({name: inputBox.value})
            inputBox.value = ''
          }}>Add
        </a>

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
    },
    editCategories: (cats) => {
      return dispatch(editCategoriesThunk(cats))
    },
    removeCategory: (id) => {
      return dispatch(removeCategoryThunk(id))
    },
    addCategory: (cat) => {
      return dispatch(addCategoryThunk(cat))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)


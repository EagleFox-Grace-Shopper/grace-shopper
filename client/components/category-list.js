import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {getCategoriesThunk, editCategoryThunk } from '../store'

export class CategoryList extends Component {

  async componentDidMount() {
    if (this.props.catList.length === 0) {
      await this.props.getCategories()
    }
  }

  render() {
    const cats = this.props.catList

    return (
      <div>
        {cats.map(cat => (
          <Link
            to={`/browse/${cat.name}`}
            key={cat.id}
            onClick={() => getProducts(cat.id)}><CatItem>{cat.name}</CatItem>
          </Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    catList: state.category.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: dispatch(getCategoriesThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)

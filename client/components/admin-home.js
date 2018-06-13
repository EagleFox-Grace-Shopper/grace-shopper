import React from 'react'
import { Link } from 'react-router-dom'

export const adminHome = () => {
  return (
    <div>
      <Link to="/products/add">Add Product</Link>
      <br />
      <Link to="/categories/editForm">Edit Categories</Link>
      <br />
      <Link to="/users/manage">Manage Users</Link>
      <br />
      <Link to="/orders">Manage Orders</Link>
    </div>)

}

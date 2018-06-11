import React from 'react'
import styled from 'styled-components'
import category from '../store/category'
import $ from 'jquery'

export default function CategoryFormRow(props) {
  const cat = props.cat
  return (
    <tr>
      <td />
      <td>
        <input disabled type="text" value={cat.name} />
      </td>
      <td>
        <a
          href="#" onClick={(event) => {
            event.preventDefault()
            console.log('previous', $(this))
          }}>Edit
        </a>
      </td>
      <td>Remove</td>
    </tr>
  )
}

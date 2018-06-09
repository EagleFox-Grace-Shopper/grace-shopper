import React from 'react'
import styled from 'styled-components'
import category from '../store/category'

export default function categoryFormRow(props) {
  const cat = props.cat
  console.log('cat', cat)
  return (
    <tr>
      <td>
        {/* <input disabled type="text" value={cat.name} />{cat.name} */}
        Blah
      </td>
      <td>Edit</td>
      <td>Remove</td>
    </tr>
  )
}

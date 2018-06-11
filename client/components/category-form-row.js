import React from 'react'
import styled from 'styled-components'


export default function CategoryFormRow(props) {
  const cat = props.cat
  return (
    <tr>
      <td />
      <td>
        <input disabled="true" type="text" placeholder={cat.name} id={cat.id} onChange={(event) => props.onCatEdit({id: cat.id, name: event.target.value})} />
      </td>
      <td>
        <a
          href="#"
          onClick={event => {
            event.preventDefault()
            document.getElementById(cat.id).disabled = false
            document.getElementById(cat.id).focus()
          }}
        >
          Edit
        </a>
      </td>
      <td>
        <a
          href="#"
          onClick={
            event => {
              event.preventDefault()
              console.log('passing', cat.id)
              props.removeCategory(cat.id)
            }}
        >Remove
        </a>
      </td>
    </tr>
  )
}

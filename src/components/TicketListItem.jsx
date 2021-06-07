import React from 'react'

export default function TicketListItem({ticket: {name, description, status}, deleteFunction, editFunction}) {
  return (
    <tr>
      <th>{name}</th>
      <th>{description}</th>
      <th>{status}</th>
      <th><button onClick={editFunction}>Edit</button></th>
      <th><button onClick={deleteFunction}>Delete</button></th>
    </tr>
  )
}

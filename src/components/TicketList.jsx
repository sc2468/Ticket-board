import React from 'react'
import TicketListItem from './TicketListItem'

export default function TicketList({tickets, deleteAction, editingAction}) {
  return (
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Status</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (<TicketListItem 
          key={ticket.id}
          ticket={ticket} 
          deleteFunction={() => deleteAction(ticket.id)}
          editFunction={() => editingAction(ticket.id)}
        />)) }
      </tbody>
    </table>
  )
}

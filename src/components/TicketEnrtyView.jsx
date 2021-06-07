import React, { Fragment, useState } from 'react'

export default function TicketEnrtyView({title, editingTicket, submitAction}) {
  const [newTitle, setNewTitle] = useState(editingTicket ? editingTicket.name : '');
  const [newDescription, setNewDescription] = useState(editingTicket ? editingTicket.description : '');
  const [newStatus, setNewStatus] = useState(editingTicket ? editingTicket.status : "TODO")
  return (
    <Fragment>
      <p>{title}</p>
      <p>Ticket Title</p><input  onChange={(event) => setNewTitle(event.target.value)} value={newTitle}/>
      <p>Ticket Descitpion</p><input  onChange={(event) => setNewDescription(event.target.value)} value={newDescription}/>
      <p>Ticket Status</p>
      <select onChange={(event) => setNewStatus(event.target.value)} value={newStatus}>
        <option value="TODO">To Do</option>
        <option value="DONE">Done</option>
      </select>
      <button onClick={() => submitAction(newTitle, newDescription, newStatus, editingTicket ? editingTicket.id: undefined)}>Submit</button>
    </Fragment>
  )
}

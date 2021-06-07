import React from 'react';
import TicketEnrtyView from '../components/TicketEnrtyView';

export default function TicketEnryContainer({displayCreateView, setDisplayCreateView, edittingTicket, createOrUpdateTicket }) {
  
  return (<React.Fragment>
      {!displayCreateView && !edittingTicket && <button onClick={() => setDisplayCreateView(true)}>Create New Ticket</button>}
      {displayCreateView && !edittingTicket && <TicketEnrtyView title={"create new ticket"} submitAction={createOrUpdateTicket} />}
      {edittingTicket && <TicketEnrtyView 
        title={`Edit Ticket  ${edittingTicket.name}`} 
        submitAction={createOrUpdateTicket} 
        editingTicket={edittingTicket}
      />}
    </React.Fragment>)
}

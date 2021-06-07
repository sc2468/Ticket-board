import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TICKET, DELETE_TICKET, GET_BOARD } from '../constances/gqlQueries';
import LoadingWrapper from '../components/Loading';
import { ORGANISATION_ID } from '../constances/staticData';
import TicketList from '../components/TicketList';
import TicketEnrtyContainer from './TicketEnrtyContainer';
import { ticketItemsVar } from '../utilities/apolloClient';

export default function BoardContainer({boardId}) {
  const { loading, error, data } = useQuery(GET_BOARD, { 
    variables: { 
      "organisationId": ORGANISATION_ID, 
      'boardId': boardId 
    },
  });
  const [edittingTicketId, setEdittingTicketId] = useState(undefined)
  const [displayCreateView, setDisplayCreateView] = useState(false)
  const [createTicket] = useMutation(CREATE_TICKET);
  const [deleteTicket] = useMutation(DELETE_TICKET);
  const deleteTicketAction = (ticketId) => {
    deleteTicket({ 
      variables: {organisationId: ORGANISATION_ID, ticketId: ticketId}, 
      update(cache, { data }) {
        // should maybe be changing the local store ticket value rather than creating a ticketItemVar
        ticketItemsVar(ticketItemsVar().filter(ticket => ticket.id !== data.deleteTicket.id))
      }
      })
  };
  if (!ticketItemsVar() && data) {
    ticketItemsVar(data.board.tickets);
  }
  const createOrUpdateTicket = (name, description, status, ticketId) => {
    setDisplayCreateView(false);
    setEdittingTicketId(undefined);
    createTicket({ 
      variables: { "organisationId": ORGANISATION_ID, "boardId":boardId, "ticketId": ticketId, 'input': { name, description, status, "visible": true }},
      update(cache, { data }) {
        // remove existing ticket incase of update
        ticketItemsVar(ticketItemsVar().filter(ticket => ticket.id !== data.putTicket.id))
        ticketItemsVar(ticketItemsVar().concat([data.putTicket]));
      }}, 
  )};

  
  return (<LoadingWrapper loading={loading} error={error}>
    {ticketItemsVar() && data && (<React.Fragment>
      <p>{`Board: ${data.board.name}`}</p>
      <TicketList tickets={ticketItemsVar()} deleteAction={deleteTicketAction} editingAction={setEdittingTicketId}/>
      <TicketEnrtyContainer 
        edittingTicket={edittingTicketId ? ticketItemsVar().filter(item => item.id === edittingTicketId )[0] : undefined}
        createOrUpdateTicket={createOrUpdateTicket}
        displayCreateView={displayCreateView}
        setDisplayCreateView={setDisplayCreateView}
      />
    </React.Fragment>)}
  </LoadingWrapper>);
}

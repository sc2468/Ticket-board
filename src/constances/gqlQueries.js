import gql from 'graphql-tag';

//To create a board don't pass an id
export const CREATE_BOARD = gql`
mutation putBoard($organisationId: ID!, $boardId: ID, $input: BoardInput!) {
  putBoard(organisationId: $organisationId, boardId: $boardId, input: $input) {
    id
    name
    
    createdAt
    updatedAt
    tickets {
      name
      description
      status
    }  
  }
}`;

export const CREATE_TICKET = gql`
#To create a new ticket don't pass an id
mutation putTicket($organisationId: ID!, $boardId: ID!, $ticketId: ID $input: TicketInput!) {
  putTicket(organisationId: $organisationId, boardId: $boardId, ticketId: $ticketId, input: $input) {
    id
    name
    description
    status
    visible
  }
}`;

export const GET_BOARD = gql`
query board($organisationId: ID!, $boardId: ID!) {
  board(organisationId: $organisationId, boardId: $boardId) {
    id
    name
    
    createdAt
    updatedAt
    tickets {
      id
      name
      description
      status
    }  
  }
}
`;

export const DELETE_TICKET = gql`
mutation deleteTicket($organisationId: ID!, $ticketId: ID!) {
  deleteTicket(organisationId: $organisationId, ticketId: $ticketId) {
    id
    name
    description
    status
    visible
  }
}`;
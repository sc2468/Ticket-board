import ApolloClient from 'apollo-client';
import { WebSocketLink } from "apollo-link-ws";
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-boost';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { USER_ID } from '../constances/staticData';
import { makeVar } from '@apollo/client';

// Create an http link:
const httpLink = new HttpLink({
  uri: 'https://w6tcrg3sb4.execute-api.us-east-1.amazonaws.com/example-example-graphql-api',
  headers: {
    'Authorization': USER_ID
  }
});

// Create a WebSocket link:
const wsLink = new WebSocketLink(new SubscriptionClient(`wss://156hxo0ega.execute-api.us-east-1.amazonaws.com/example`, {
  reconnect: true,
  connectionParams: async () => {
    return {
      Authorization: USER_ID
    }
  }
}, undefined, []));

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);
export const ticketItemsVar = makeVar(undefined);

export const gqlClient = new ApolloClient(
  {
      link: link,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              tickets: {
                read() {
                  return ticketItemsVar();
                }
              }
            }
          }
        }
      })
  }
)
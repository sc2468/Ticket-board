
import './App.css';
import { gqlClient } from './utilities/apolloClient';
import { ApolloProvider } from '@apollo/client/react';
import RootScreen from './containers/RootScreen';


function App() {
  return (
    <ApolloProvider client={gqlClient}>
      <RootScreen/>
    </ApolloProvider>
  );
}

export default App;

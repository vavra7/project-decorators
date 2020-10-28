import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gqlPublicUrl } from '../config';

export const apolloClient = new ApolloClient({
  uri: gqlPublicUrl,
  cache: new InMemoryCache()
});

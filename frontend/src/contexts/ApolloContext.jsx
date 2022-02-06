import {
  HttpLink,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";

// Base URL to GraphQL API
const httpLink = new HttpLink({
  uri: `//${import.meta.env.VITE_API_URL}`,
});

// Add authorization headers to request
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem("jwt");
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : null,
      },
    };
  });
  return forward(operation);
});

const apolloClient = new ApolloClient({
  // Combine URL and auth headers
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

const ApolloContextProvider = (props) => {
  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
};

export default ApolloContextProvider;

import {
  HttpLink,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: `//${import.meta.env.VITE_API_URL}`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
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
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

const ApolloContextProvider = (props) => {
  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
};

export default ApolloContextProvider;

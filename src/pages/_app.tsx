import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  DefaultContext,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthContext";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import CUSTOM_ERRORS from "@/graphql/errorCodes";

const httpLink = new HttpLink({ uri: "/api/graphql" });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context: DefaultContext) => {
    return {
      headers: {
        ...context.headers,
        authorization: context.token,
      },
    };
  });
  return forward(operation);
});

export const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (
//     graphQLErrors?.some((error) =>
//       [
//         CUSTOM_ERRORS.UNAUTHORIZED[0],
//         CUSTOM_ERRORS.NO_TOKEN[0],
//         CUSTOM_ERRORS.INVALID_TOKEN[0],
//       ].includes(error.message),
//     )
//   ) {
//     // either no access token or invalid access token
//   }
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Navbar className="top-0 right-0 fixed"></Navbar>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

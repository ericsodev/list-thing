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
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Navbar className="top-0 left-0 fixed"></Navbar>
        {getLayout(<Component {...pageProps}></Component>)}
      </AuthProvider>
    </ApolloProvider>
  );
}

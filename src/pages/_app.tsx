import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthContext";

export const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

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

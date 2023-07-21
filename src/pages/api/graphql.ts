import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@/graphql/schema.js";
import { Context, createContext } from "@/graphql/context";
import resolvers from "@/graphql/resolvers";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  context: createContext,
});

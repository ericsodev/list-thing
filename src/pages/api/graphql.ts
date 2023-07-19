import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@/graphql/schema.js";
import resolvers from "@/graphql/resolvers";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Context, context } from "@/graphql/context";

const server = new ApolloServer<Context>({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: {
        Mutation: {
          createAccount: async (_parent, _args, ctx: Context) => {
            return false;
          },
        },
      },
    }),
  }),
});

export default startServerAndCreateNextHandler(server, {
  context: async (_) => {
    return context;
  },
});

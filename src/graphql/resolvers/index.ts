import authResolver from "./AuthResolver";
import commentResolver from "./CommentResolver";
import itemResolver from "./ItemResolver";
import listResolver from "./ListResolver";
import userResolver from "./UserResolver";

import { mergeResolvers } from "@graphql-tools/merge";

const resolvers = [
  authResolver,
  commentResolver,
  itemResolver,
  listResolver,
  userResolver,
];

export default mergeResolvers(resolvers);

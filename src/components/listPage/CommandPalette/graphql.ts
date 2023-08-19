import { graphql } from "@/graphql/types/gql";

export const AddItem = graphql(`
  mutation AddItem($name: String!, $tags: [String!], $listId: ID!) {
    addItem(input: { name: $name, listId: $listId, tags: $tags }) {
      id
    }
  }
`);

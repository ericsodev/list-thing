import { graphql } from "@/graphql/types/gql";

export const AddItem = graphql(`
  mutation AddItem($name: String!, $tags: [String!], $listId: Int!) {
    addItem(input: { name: $name, listId: $listId, tags: $tags }) {
      id
    }
  }
`);

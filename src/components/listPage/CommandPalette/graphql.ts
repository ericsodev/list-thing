import gql from "graphql-tag";

export const AddItem = gql`
  mutation AddItem($name: String!, $tags: [String!]!, $listId: String!) {
    id
  }
`;

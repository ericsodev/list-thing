import { gql } from "graphql-tag";

export const GetList = gql`
  query GetList {
    list(id: "sdfsdf") {
      name
    }
  }
`;

export const CreateList = gql`
  mutation CreateList($name: String!, $tags: [String!]) {
    createList(name: $name, tags: $tags) {
      id
      name
    }
  }
`;

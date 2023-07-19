import { gql } from "graphql-tag";

export const GetListQuery = gql`
  query GetListQuery {
    list(id: "sdfsdf") {
      name
    }
  }
`;

import gql from "graphql-tag";

export const getTokenQuery = gql`
  query GetToken {
    token
  }
`;

export const logoutMutation = gql`
  mutation Logout {
    logout
  }
`;

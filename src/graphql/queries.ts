import { graphql } from "@/graphql/types/gql";

export const GetList = graphql(`
  query GetList($id: Int, $slug: String) {
    list(id: $id, slug: $slug) {
      name
      itemCount
      tagCount
      memberCount
    }
  }
`);

export const CreateList = graphql(`
  mutation CreateList($name: String!, $tags: [String!]) {
    createList(name: $name, tags: $tags) {
      id
      name
    }
  }
`);

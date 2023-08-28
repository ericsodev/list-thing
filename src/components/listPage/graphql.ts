import { graphql } from "@/graphql/types/gql";

export const GetListSlug = graphql(`
  query ListBySlug($slug: String!) {
    list(slug: $slug) {
      id
      name
      memberCount
      itemCount
      slug
      items {
        id
        name
        tags {
          name
        }
      }
    }
  }
`);

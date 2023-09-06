import { graphql } from "@/graphql/types/gql";

export const GetListSlug = graphql(`
    query ListBySlug($slug: String!) {
        list(slug: $slug) {
            id
            name
            memberCount
            itemCount
            slug
            items(sort: { name: asc }) {
                id
                name
                status
                createdOn
                tags {
                    id
                    name
                }
            }
        }
    }
`);

export const GetComments = graphql(`
    query GetComments($itemId: Int!) {
        getComments(itemId: $itemId) {
            id
            text
            createdOn
        }
    }
`);

export const AddComment = graphql(`
    mutation AddComment($itemId: Int!, $content: String!) {
        addComment(content: $content, itemId: $itemId) {
            id
        }
    }
`)

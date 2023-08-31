import { graphql } from "@/graphql/types/gql";

export const AddItem = graphql(`
    mutation AddItem($name: String!, $tags: [String!], $listId: Int!) {
        addItem(input: { name: $name, listId: $listId, tags: $tags })
    }
`);

export const SearchItems = graphql(`
    query Search(
        $id: Int!
        $tags: ItemIncludeTags
        $status: [STATUS!]
        $name: StringFilter
        $date: DateFilter
    ) {
        list(id: $id) {
            id
            items(
                sort: { name: asc }
                status: $status
                name: $name
                includesTags: $tags
                date: $date
            ) {
                id
                name
                tags {
                    id
                    name
                }
            }
        }
    }
`);

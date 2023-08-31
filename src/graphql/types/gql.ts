/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetToken {\n    token\n  }\n": types.GetTokenDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation deleteList($id: Int!) {\n    deleteList(id: $id)\n  }\n": types.DeleteListDocument,
    "\n    mutation AddItem($name: String!, $tags: [String!], $listId: Int!) {\n        addItem(input: { name: $name, listId: $listId, tags: $tags })\n    }\n": types.AddItemDocument,
    "\n    query Search(\n        $id: Int!\n        $tags: ItemIncludeTags\n        $status: [STATUS!]\n        $name: StringFilter\n        $date: DateFilter\n    ) {\n        list(id: $id) {\n            id\n            items(\n                sort: { name: asc }\n                status: $status\n                name: $name\n                includesTags: $tags\n                date: $date\n            ) {\n                id\n                name\n                tags {\n                    id\n                    name\n                }\n            }\n        }\n    }\n": types.SearchDocument,
    "\n  query ListBySlug($slug: String!) {\n    list(slug: $slug) {\n      id\n      name\n      memberCount\n      itemCount\n      slug\n      items(sort: { name: asc }) {\n        id\n        name\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.ListBySlugDocument,
    "\n  query GetList($id: Int, $slug: String) {\n    list(id: $id, slug: $slug) {\n      name\n      itemCount\n      tagCount\n      memberCount\n    }\n  }\n": types.GetListDocument,
    "\n  mutation CreateList($name: String!, $tags: [String!]) {\n    createList(name: $name, tags: $tags) {\n      id\n      name\n    }\n  }\n": types.CreateListDocument,
    "\n  query GetLists {\n    lists {\n      id\n      name\n      memberCount\n      itemCount\n      slug\n    }\n  }\n": types.GetListsDocument,
    "\n  mutation Login($input: AuthenticationInput!) {\n    authenticate(input: $input)\n  }\n": types.LoginDocument,
    "\n  mutation createAccount($name: String!, $password: String!) {\n    createAccount(input: { name: $name, password: $password })\n  }\n": types.CreateAccountDocument,
    "\n  query searchUser($input: UserSearchInput!) {\n    users(input: $input) {\n      name\n    }\n  }\n": types.SearchUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetToken {\n    token\n  }\n"): (typeof documents)["\n  query GetToken {\n    token\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteList($id: Int!) {\n    deleteList(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteList($id: Int!) {\n    deleteList(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddItem($name: String!, $tags: [String!], $listId: Int!) {\n        addItem(input: { name: $name, listId: $listId, tags: $tags })\n    }\n"): (typeof documents)["\n    mutation AddItem($name: String!, $tags: [String!], $listId: Int!) {\n        addItem(input: { name: $name, listId: $listId, tags: $tags })\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Search(\n        $id: Int!\n        $tags: ItemIncludeTags\n        $status: [STATUS!]\n        $name: StringFilter\n        $date: DateFilter\n    ) {\n        list(id: $id) {\n            id\n            items(\n                sort: { name: asc }\n                status: $status\n                name: $name\n                includesTags: $tags\n                date: $date\n            ) {\n                id\n                name\n                tags {\n                    id\n                    name\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query Search(\n        $id: Int!\n        $tags: ItemIncludeTags\n        $status: [STATUS!]\n        $name: StringFilter\n        $date: DateFilter\n    ) {\n        list(id: $id) {\n            id\n            items(\n                sort: { name: asc }\n                status: $status\n                name: $name\n                includesTags: $tags\n                date: $date\n            ) {\n                id\n                name\n                tags {\n                    id\n                    name\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListBySlug($slug: String!) {\n    list(slug: $slug) {\n      id\n      name\n      memberCount\n      itemCount\n      slug\n      items(sort: { name: asc }) {\n        id\n        name\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListBySlug($slug: String!) {\n    list(slug: $slug) {\n      id\n      name\n      memberCount\n      itemCount\n      slug\n      items(sort: { name: asc }) {\n        id\n        name\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetList($id: Int, $slug: String) {\n    list(id: $id, slug: $slug) {\n      name\n      itemCount\n      tagCount\n      memberCount\n    }\n  }\n"): (typeof documents)["\n  query GetList($id: Int, $slug: String) {\n    list(id: $id, slug: $slug) {\n      name\n      itemCount\n      tagCount\n      memberCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateList($name: String!, $tags: [String!]) {\n    createList(name: $name, tags: $tags) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateList($name: String!, $tags: [String!]) {\n    createList(name: $name, tags: $tags) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLists {\n    lists {\n      id\n      name\n      memberCount\n      itemCount\n      slug\n    }\n  }\n"): (typeof documents)["\n  query GetLists {\n    lists {\n      id\n      name\n      memberCount\n      itemCount\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: AuthenticationInput!) {\n    authenticate(input: $input)\n  }\n"): (typeof documents)["\n  mutation Login($input: AuthenticationInput!) {\n    authenticate(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount($name: String!, $password: String!) {\n    createAccount(input: { name: $name, password: $password })\n  }\n"): (typeof documents)["\n  mutation createAccount($name: String!, $password: String!) {\n    createAccount(input: { name: $name, password: $password })\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchUser($input: UserSearchInput!) {\n    users(input: $input) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query searchUser($input: UserSearchInput!) {\n    users(input: $input) {\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
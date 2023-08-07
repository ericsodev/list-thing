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
    "\n  query GetList {\n    list(id: \"sdfsdf\") {\n      name\n    }\n  }\n": types.GetListDocument,
    "\n  mutation CreateList($name: String!, $tags: [String!]) {\n    createList(name: $name, tags: $tags) {\n      id\n      name\n    }\n  }\n": types.CreateListDocument,
    "\n  query GetLists {\n    lists {\n      id\n      name\n    }\n  }\n": types.GetListsDocument,
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
export function graphql(source: "\n  query GetList {\n    list(id: \"sdfsdf\") {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetList {\n    list(id: \"sdfsdf\") {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateList($name: String!, $tags: [String!]) {\n    createList(name: $name, tags: $tags) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateList($name: String!, $tags: [String!]) {\n    createList(name: $name, tags: $tags) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLists {\n    lists {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetLists {\n    lists {\n      id\n      name\n    }\n  }\n"];
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
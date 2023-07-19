import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar DateTime

  enum ROLE {
    OWNER
    MEMBER
  }

  enum SORT_DIR {
    ASC
    DESC
  }

  type User {
    id: ID!
    name: String!
  }

  type List {
    id: ID!
    name: String!
    members: [User!]!
    owner: [User!]!
    items: [Item!]!
    tags: [Tag!]!
  }

  type ListUser {
    user: User!
    list: List!
    role: ROLE!
    date: DateTime!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    date: DateTime!
    item: Item!
  }

  type TagItem {
    tag: Tag!
    item: Item!
  }

  type Item {
    id: ID!
    name: String!
    tagItems: [TagItem!]!
    adder: User!
    list: List!
    date: DateTime!
    comments: [Comment!]!
  }

  type Tag {
    id: ID!
    list: List!
    tagItems: [TagItem!]!
  }

  # Filters and Sorting Types
  input StringFilter {
    startsWith: String
    contains: String
    equals: String
  }

  input DateFilter {
    lt: DateTime
    lte: DateTime
    gt: DateTime
    gte: DateTime
    eq: DateTime
  }

  # Query / Mutation Input Types
  input AuthenticationInput {
    name: String!
    password: String!
  }

  input CreateUserInput {
    name: String!
    password: String!
  }

  input UserSearchInput {
    id: String
    name: String
    filter: StringFilter
  }

  input AddItemInput {
    name: String!
    listId: ID!
  }

  input ListInput {
    filter: ListInputFilter
    sort: ListInputSort
    limit: Int
    page: Int
    item: ItemFilter
  }

  input ItemFilter {
    name: StringFilter
    createdOn: DateFilter
  }

  input ListInputFilter {
    name: StringFilter
    date: DateFilter
    role: ROLE
  }

  input ListInputSort {
    createdOn: SORT_DIR
    name: SORT_DIR
  }

  type Query {
    lists(input: ListInput): [List!]!
    list(id: ID!): List
    users(input: UserSearchInput): [User!]!
    user(name: String, id: String): User
    self: User
  }

  type Mutation {
    authenticate(input: AuthenticationInput): String
    createAccount(input: CreateUserInput): Boolean!
    createList(name: String!): List!
    addItem(input: AddItemInput): Item!
    removeItem(input: AddItemInput): Boolean
  }
`;

export default typeDefs;

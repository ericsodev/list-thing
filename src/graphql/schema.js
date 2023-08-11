import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar DateTime

  enum ROLE {
    OWNER
    MEMBER
  }

  enum SORT_DIR {
    asc
    desc
  }

  enum STATUS {
    ACTIVE
    BACKLOG
    COMPLETE
  }

  type User {
    id: ID!
    name: String!
  }

  type List {
    id: ID!
    name: String!
    slug: String!
    createdOn: DateTime!
    members: [User!]!
    owner: [User!]!
    items: [Item!]!
    tags: [Tag!]!
    memberCount: Int!
    tagCount: Int!
    itemCount: Int!
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
    slug: String!
    tagItems: [TagItem!]!
    adder: User!
    list: List!
    date: DateTime!
    comments: [Comment!]!
    status: STATUS!
  }

  type Tag {
    id: ID!
    list: List!
    tagItems: [TagItem!]!
  }

  # Filters and Sorting Types
  input StringFilter {
    startsWith: String
    search: String
    equals: String
    contains: String
  }

  input DateFilter {
    lt: DateTime
    lte: DateTime
    gt: DateTime
    gte: DateTime
    equals: DateTime
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

  input CreateListInput {
    name: String!
    tags: [String!]
  }

  input TagSearchInput {
    name: StringFilter
    listId: ID!
  }

  type Query {
    lists(input: ListInput): [List!]!
    list(id: ID!): List
    tagSearch(input: TagSearchInput): [String!]!
    listSlug(slug: String!): List
    users(input: UserSearchInput!): [User!]!
    user(name: String, id: String): User
    token: String!
    self: User
  }

  type Mutation {
    authenticate(input: AuthenticationInput!): String
    createAccount(input: CreateUserInput!): Boolean!
    createList(name: String!, tags: [String!]): List!
    deleteList(id: ID!): Boolean!
    addItem(input: AddItemInput!): Item!
    removeItem(input: AddItemInput!): Boolean
    logout: Boolean
  }
`;

export default typeDefs;

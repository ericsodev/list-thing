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
    id: Int!
    name: String!
  }

  type List {
    id: Int!
    name: String!
    slug: String!
    createdOn: DateTime!
    members(name: StringFilter): [User!]!
    owner: User!
    items(
      name: StringFilter
      date: DateFilter
      status: STATUS
      sort: ItemSort
      includesTags: ItemIncludeTags
    ): [Item!]!
    tags(name: StringFilter): [Tag!]!
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
    id: Int!
    text: String!
    user: User!
    date: DateTime!
    item: Item!
  }

  type Item {
    id: Int!
    name: String!
    slug: String!
    tags: [Tag!]!
    adder: User
    list: List!
    date: DateTime!
    comments(date: DateFilter, dateSort: SORT_DIR): [Comment!]!
    status: STATUS!
  }

  type Tag {
    id: Int!
    list: List!
    name: String!
    items: [Item!]!
  }

  # Filters and Sorting Types
  input ItemSort {
    name: SORT_DIR
    date: SORT_DIR
    status: SORT_DIR
  }

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
    id: Int
    name: StringFilter
  }

  input AddItemInput {
    name: String!
    listId: Int!
    tags: [String!]
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
    listId: Int!
  }

  input ItemIncludeTags {
    tags: [String!]!
    all: Boolean # default some
  }

  type Query {
    lists(input: ListInput): [List!]!
    list(id: Int, slug: String!): List
    tagSearch(input: TagSearchInput): [String!]!
    users(input: UserSearchInput!): [User!]!
    user(name: String, id: Int): User
    token: String!
    self: User
  }

  type Mutation {
    authenticate(input: AuthenticationInput!): String
    createAccount(input: CreateUserInput!): Boolean!
    createList(name: String!, tags: [String!]): List!
    deleteList(id: Int!): Boolean!
    addItem(input: AddItemInput!): Int!
    removeItem(input: AddItemInput!): Boolean
    logout: Boolean
  }
`;

export default typeDefs;

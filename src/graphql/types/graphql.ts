/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddItemInput = {
  listId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type AuthenticationInput = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  item: Item;
  text: Scalars['String']['output'];
  user: User;
};

export type CreateUserInput = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type DateFilter = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Item = {
  __typename?: 'Item';
  adder: User;
  comments: Array<Comment>;
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  list: List;
  name: Scalars['String']['output'];
  tagItems: Array<TagItem>;
};

export type ItemFilter = {
  createdOn?: InputMaybe<DateFilter>;
  name?: InputMaybe<StringFilter>;
};

export type List = {
  __typename?: 'List';
  id: Scalars['ID']['output'];
  items: Array<Item>;
  members: Array<User>;
  name: Scalars['String']['output'];
  owner: Array<User>;
  tags: Array<Tag>;
};

export type ListInput = {
  filter?: InputMaybe<ListInputFilter>;
  item?: InputMaybe<ItemFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ListInputSort>;
};

export type ListInputFilter = {
  date?: InputMaybe<DateFilter>;
  name?: InputMaybe<StringFilter>;
  role?: InputMaybe<Role>;
};

export type ListInputSort = {
  createdOn?: InputMaybe<Sort_Dir>;
  name?: InputMaybe<Sort_Dir>;
};

export type ListUser = {
  __typename?: 'ListUser';
  date: Scalars['DateTime']['output'];
  list: List;
  role: Role;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem: Item;
  authenticate?: Maybe<Scalars['String']['output']>;
  createAccount: Scalars['Boolean']['output'];
  createList: List;
  removeItem?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddItemArgs = {
  input?: InputMaybe<AddItemInput>;
};


export type MutationAuthenticateArgs = {
  input?: InputMaybe<AuthenticationInput>;
};


export type MutationCreateAccountArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationCreateListArgs = {
  name: Scalars['String']['input'];
};


export type MutationRemoveItemArgs = {
  input?: InputMaybe<AddItemInput>;
};

export type Query = {
  __typename?: 'Query';
  list?: Maybe<List>;
  lists: Array<List>;
  self?: Maybe<User>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryListArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListsArgs = {
  input?: InputMaybe<ListInput>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UserSearchInput>;
};

export enum Role {
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export enum Sort_Dir {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  list: List;
  tagItems: Array<TagItem>;
};

export type TagItem = {
  __typename?: 'TagItem';
  item: Item;
  tag: Tag;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserSearchInput = {
  filter?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListQueryQuery = { __typename?: 'Query', list?: { __typename?: 'List', name: string } | null };


export const GetListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"sdfsdf","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetListQueryQuery, GetListQueryQueryVariables>;
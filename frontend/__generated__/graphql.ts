/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Repository list input */
export type ListRepositoryInput = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<RepositorySort>;
};

/** Login URL result */
export type LoginUrlResult = {
  __typename?: 'LoginUrlResult';
  url: Scalars['String'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  createRepository: Repository;
};


export type MutationRootCreateRepositoryArgs = {
  input: RepositoryInput;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  getLoginUrl: LoginUrlResult;
  getToken: TokenResult;
  repositories: Array<Repository>;
  searchRepositories: RepositorySearchResult;
};


export type QueryRootGetTokenArgs = {
  input: TokenInput;
};


export type QueryRootRepositoriesArgs = {
  input: ListRepositoryInput;
};


export type QueryRootSearchRepositoriesArgs = {
  input: SearchRepositoryInput;
};

export type Repository = {
  __typename?: 'Repository';
  description?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  htmlUrl: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  private: Scalars['Boolean'];
  user: User;
};

/** Repository Input */
export type RepositoryInput = {
  description?: InputMaybe<Scalars['String']>;
  homepage?: InputMaybe<Scalars['String']>;
  isTemplate: Scalars['Boolean'];
  name: Scalars['String'];
  private: Scalars['Boolean'];
};

/** Repository search result */
export type RepositorySearchResult = {
  __typename?: 'RepositorySearchResult';
  items: Array<Repository>;
  totalCount: Scalars['Int'];
};

export enum RepositorySort {
  Created = 'CREATED',
  FullName = 'FULL_NAME',
  Pushed = 'PUSHED',
  Updated = 'UPDATED'
}

/** Search Repository input */
export type SearchRepositoryInput = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  searchTerm: Scalars['String'];
};

/** Token input */
export type TokenInput = {
  code: Scalars['String'];
};

/** Token result */
export type TokenResult = {
  __typename?: 'TokenResult';
  token: Scalars['String'];
};

/** User entity */
export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  login: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type GetAccessTokenQueryVariables = Exact<{
  input: TokenInput;
}>;


export type GetAccessTokenQuery = { __typename?: 'QueryRoot', getToken: { __typename?: 'TokenResult', token: string } };

export type RepositoryFragment = { __typename?: 'Repository', id: number, name?: string | null, fullName: string, private: boolean, description?: string | null, htmlUrl: string, user: { __typename?: 'User', avatarUrl: string, name?: string | null, email?: string | null } } & { ' $fragmentName'?: 'RepositoryFragment' };

export type RepositoriesQueryVariables = Exact<{
  input: ListRepositoryInput;
}>;


export type RepositoriesQuery = { __typename?: 'QueryRoot', repositories: Array<{ __typename?: 'Repository', id: number, name?: string | null, fullName: string, private: boolean, description?: string | null, htmlUrl: string, user: { __typename?: 'User', avatarUrl: string, name?: string | null, email?: string | null } }> };

export type SearchRepositoriesQueryVariables = Exact<{
  input: SearchRepositoryInput;
}>;


export type SearchRepositoriesQuery = { __typename?: 'QueryRoot', searchRepositories: { __typename?: 'RepositorySearchResult', items: Array<{ __typename?: 'Repository', id: number, name?: string | null, fullName: string, private: boolean, description?: string | null, htmlUrl: string, user: { __typename?: 'User', avatarUrl: string, name?: string | null, email?: string | null } }> } };

export type CreateRepositoryMutationVariables = Exact<{
  input: RepositoryInput;
}>;


export type CreateRepositoryMutation = { __typename?: 'MutationRoot', createRepository: { __typename?: 'Repository', id: number } };

export const RepositoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Repository"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Repository"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"htmlUrl"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<RepositoryFragment, unknown>;
export const GetAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<GetAccessTokenQuery, GetAccessTokenQueryVariables>;
export const RepositoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"repositories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListRepositoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"htmlUrl"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RepositoriesQuery, RepositoriesQueryVariables>;
export const SearchRepositoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchRepositories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRepositoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRepositories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"htmlUrl"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchRepositoriesQuery, SearchRepositoriesQueryVariables>;
export const CreateRepositoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRepository"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RepositoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRepository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateRepositoryMutation, CreateRepositoryMutationVariables>;
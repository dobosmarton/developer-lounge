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
    "\n  query getLoginUrl {\n    getLoginUrl {\n      url\n    }\n  }\n": types.GetLoginUrlDocument,
    "\n  query getAccessToken($input: TokenInput!) {\n    getToken(input: $input) {\n      token\n    }\n  }\n": types.GetAccessTokenDocument,
    "\n  fragment Repository on Repository {\n    id\n    name\n    fullName\n    private\n    description\n    htmlUrl\n    user {\n      avatarUrl\n      name\n      email\n    }\n  }\n": types.RepositoryFragmentDoc,
    "\n  query repositories($input: ListRepositoryInput!) {\n    repositories(input: $input) {\n      id\n      name\n      fullName\n      private\n      description\n      htmlUrl\n      user {\n        avatarUrl\n        name\n        email\n      }\n    }\n  }\n": types.RepositoriesDocument,
    "\n  query searchRepositories($input: SearchRepositoryInput!) {\n    searchRepositories(input: $input) {\n      items {\n        id\n        name\n        fullName\n        private\n        description\n        htmlUrl\n        user {\n          avatarUrl\n          name\n          email\n        }\n      }\n    }\n  }\n": types.SearchRepositoriesDocument,
    "\n  mutation createRepository($input: RepositoryInput!) {\n    createRepository(input: $input) {\n      id\n    }\n  }\n": types.CreateRepositoryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getLoginUrl {\n    getLoginUrl {\n      url\n    }\n  }\n"): (typeof documents)["\n  query getLoginUrl {\n    getLoginUrl {\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAccessToken($input: TokenInput!) {\n    getToken(input: $input) {\n      token\n    }\n  }\n"): (typeof documents)["\n  query getAccessToken($input: TokenInput!) {\n    getToken(input: $input) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Repository on Repository {\n    id\n    name\n    fullName\n    private\n    description\n    htmlUrl\n    user {\n      avatarUrl\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  fragment Repository on Repository {\n    id\n    name\n    fullName\n    private\n    description\n    htmlUrl\n    user {\n      avatarUrl\n      name\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query repositories($input: ListRepositoryInput!) {\n    repositories(input: $input) {\n      id\n      name\n      fullName\n      private\n      description\n      htmlUrl\n      user {\n        avatarUrl\n        name\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query repositories($input: ListRepositoryInput!) {\n    repositories(input: $input) {\n      id\n      name\n      fullName\n      private\n      description\n      htmlUrl\n      user {\n        avatarUrl\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query searchRepositories($input: SearchRepositoryInput!) {\n    searchRepositories(input: $input) {\n      items {\n        id\n        name\n        fullName\n        private\n        description\n        htmlUrl\n        user {\n          avatarUrl\n          name\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchRepositories($input: SearchRepositoryInput!) {\n    searchRepositories(input: $input) {\n      items {\n        id\n        name\n        fullName\n        private\n        description\n        htmlUrl\n        user {\n          avatarUrl\n          name\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRepository($input: RepositoryInput!) {\n    createRepository(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createRepository($input: RepositoryInput!) {\n    createRepository(input: $input) {\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
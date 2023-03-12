import { gql } from '@/__generated__';

export const GET_LOGIN_URL = gql(/* GraphQL */ `
  query getLoginUrl {
    getLoginUrl {
      url
    }
  }
`);

export const GET_ACCESS_TOKEN = gql(/* GraphQL */ `
  query getAccessToken($input: TokenInput!) {
    getToken(input: $input) {
      token
    }
  }
`);

export const REPOSITORY_FRAGMENT = gql(/* GraphQL */ `
  fragment Repository on Repository {
    id
    name
    fullName
    private
    description
    htmlUrl
    user {
      avatarUrl
      name
      email
    }
  }
`);

export const REPOSITORIES = gql(/* GraphQL */ `
  query repositories($input: ListRepositoryInput!) {
    repositories(input: $input) {
      id
      name
      fullName
      private
      description
      htmlUrl
      user {
        avatarUrl
        name
        email
      }
    }
  }
`);

export const SEARCH_REPOSITORIES = gql(/* GraphQL */ `
  query searchRepositories($input: SearchRepositoryInput!) {
    searchRepositories(input: $input) {
      items {
        id
        name
        fullName
        private
        description
        htmlUrl
        user {
          avatarUrl
          name
          email
        }
      }
    }
  }
`);

export const CREATE_REPOSITORY = gql(/* GraphQL */ `
  mutation createRepository($input: RepositoryInput!) {
    createRepository(input: $input) {
      id
    }
  }
`);

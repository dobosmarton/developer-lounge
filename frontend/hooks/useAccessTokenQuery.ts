'use client';

import { useGithubState } from '@/app/github.provider';
import { GET_ACCESS_TOKEN } from '@/graphql/github';
import { GetAccessTokenQuery, GetAccessTokenQueryVariables } from '@/__generated__/graphql';
import { QueryResult, useQuery } from '@apollo/client';

type UseAccessToken = (code: String) => Pick<QueryResult<GetAccessTokenQuery, GetAccessTokenQueryVariables>, 'loading'>;

export const useAccessTokenQuery: UseAccessToken = (code) => {
  const { token, saveToken } = useGithubState();

  const { loading } = useQuery(GET_ACCESS_TOKEN, {
    variables: code ? { input: { code: code.toString() } } : undefined,
    skip: !code || !!token,
    onCompleted: (data) => saveToken(data.getToken.token),
    onError: () => saveToken(null),
  });

  return {
    loading,
  };
};

import { GET_LOGIN_URL } from '@/graphql/github';
import { GetLoginUrlQuery, GetLoginUrlQueryVariables } from '@/__generated__/graphql';
import { QueryResult, useQuery } from '@apollo/client';

type UseLoginUrl = () => Pick<QueryResult<GetLoginUrlQuery, GetLoginUrlQueryVariables>, 'loading'> & {
  url: string;
};

export const useLoginUrlQuery: UseLoginUrl = () => {
  const { loading, data } = useQuery(GET_LOGIN_URL);

  return {
    url: data?.getLoginUrl.url ?? '',
    loading,
  };
};

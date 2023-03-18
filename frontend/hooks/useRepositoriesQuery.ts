import { QueryResult, useQuery } from '@apollo/client';
import { useGithubState } from '@/app/github.provider';
import { REPOSITORIES } from '@/graphql/github';
import { RepositoriesQuery, RepositoriesQueryVariables, RepositorySort } from '@/__generated__/graphql';
import { PagerProps, usePager } from './usePager';

export type RepositoryList = RepositoriesQuery['repositories'];

type UseAccessToken = () => Pick<QueryResult<RepositoriesQuery, RepositoriesQueryVariables>, 'loading'> &
  PagerProps & {
    list: RepositoryList;
  };

export const useRepositories: UseAccessToken = () => {
  const { token } = useGithubState();
  const { itemPerPage, currentPage, onNextPage, onPrevPage } = usePager();

  const { loading, data } = useQuery(REPOSITORIES, {
    context: { headers: { authorization: `Bearer ${token}` } },
    variables: { input: { page: currentPage, perPage: itemPerPage, sort: RepositorySort.FullName } },
    skip: !token,
  });

  return {
    list: data?.repositories ?? [],
    loading,
    itemPerPage,
    currentPage,
    onNextPage,
    onPrevPage,
  };
};

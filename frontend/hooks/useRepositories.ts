import { useGithubState } from '@/app/github.provider';
import { REPOSITORIES } from '@/graphql/github';
import { RepositoriesQuery, RepositoriesQueryVariables, RepositorySort } from '@/__generated__/graphql';
import { QueryResult, useQuery } from '@apollo/client';
import { useState } from 'react';

export type RepositoryList = RepositoriesQuery['repositories'];

type UseAccessToken = () => Pick<QueryResult<RepositoriesQuery, RepositoriesQueryVariables>, 'loading'> & {
  list: RepositoryList;
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

export const useRepositories: UseAccessToken = () => {
  const { token } = useGithubState();
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, data } = useQuery(REPOSITORIES, {
    context: { headers: { authorization: `Bearer ${token}` } },
    variables: { input: { page: currentPage, sort: RepositorySort.FullName } },
    skip: !token,
  });

  console.log('currentPage', currentPage, data);

  const onNextPage = () => setCurrentPage((page) => page + 1);

  const onPrevPage = () => setCurrentPage((page) => (page > 1 ? page - 1 : page));

  return {
    list: data?.repositories ?? [],
    loading,
    currentPage,
    onNextPage,
    onPrevPage,
  };
};

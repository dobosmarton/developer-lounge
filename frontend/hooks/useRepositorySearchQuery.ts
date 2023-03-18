import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useGithubState } from '@/app/github.provider';
import { SEARCH_REPOSITORIES } from '@/graphql/github';
import { PagerProps, usePager } from './usePager';
import { useDebounce } from './useDebounce';
import { RepositoryList } from './useRepositoriesQuery';

type UseRepositorySearchHook = () => PagerProps & {
  list: RepositoryList;
  loading: boolean;
  searchTerm: string;
  debounceSearchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const useRepositorySearch: UseRepositorySearchHook = () => {
  const { token } = useGithubState();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { itemPerPage, currentPage, onNextPage, onPrevPage } = usePager();

  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const { loading, data } = useQuery(SEARCH_REPOSITORIES, {
    context: { headers: { authorization: `Bearer ${token}` } },
    variables: { input: { page: currentPage, perPage: itemPerPage, searchTerm: debounceSearchTerm } },
    fetchPolicy: 'network-only',
    skip: !token || debounceSearchTerm.length === 0,
  });

  return {
    list: data?.searchRepositories.items ?? [],
    loading,
    searchTerm,
    debounceSearchTerm,
    setSearchTerm,
    itemPerPage,
    currentPage,
    onNextPage,
    onPrevPage,
  };
};

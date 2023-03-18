import { PagerProps } from './usePager';
import { RepositoryList, useRepositories } from './useRepositoriesQuery';
import { useRepositorySearch } from './useRepositorySearchQuery';

type UseRepositoryListhHook = () => PagerProps & {
  list: RepositoryList;
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const useRepositoryList: UseRepositoryListhHook = () => {
  const repositories = useRepositories();

  const repositorySearch = useRepositorySearch();

  const activeState = repositorySearch.debounceSearchTerm ? repositorySearch : repositories;

  return {
    list: activeState.list,
    loading: activeState.loading,
    itemPerPage: activeState.itemPerPage,
    currentPage: activeState.currentPage,
    onNextPage: activeState.onNextPage,
    onPrevPage: activeState.onPrevPage,
    searchTerm: repositorySearch.searchTerm,
    setSearchTerm: repositorySearch.setSearchTerm,
  };
};

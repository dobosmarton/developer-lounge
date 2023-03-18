import { Button } from '@/components/button';
import { RepositoryFormModal } from '@/components/repositoryFormModal';
import { RepositoryList } from '@/components/repositoryList';
import { SearchInput } from '@/components/searchInput';
import { useCreateRepositoryMutation } from '@/hooks/useCreateRepository';
import { useRepositoryList } from '@/hooks/useRepositoryList';
import { RepositoryInput } from '@/__generated__/graphql';

export const RepositoryHome: React.FunctionComponent = () => {
  const {
    loading: createRepositoryLoading,
    createRepository,
    isModalOpen,
    toggleModal,
  } = useCreateRepositoryMutation();

  const { searchTerm, setSearchTerm, list, loading, itemPerPage, currentPage, onNextPage, onPrevPage } =
    useRepositoryList();

  const onCreateRepository = async (repository: RepositoryInput) => {
    const result = await createRepository(repository);
    if (!result.errors) {
      toggleModal();
    }
  };

  return (
    <>
      <RepositoryFormModal
        open={isModalOpen}
        loading={createRepositoryLoading}
        setOpen={toggleModal}
        onCreate={onCreateRepository}
      />

      <div className="flex items-center justify-between">
        <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleModal}>
          Add new repository
        </Button>
      </div>
      <div className="py-6">
        <RepositoryList
          list={list}
          loading={loading}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      </div>
    </>
  );
};

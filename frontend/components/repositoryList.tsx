import { RepositoryList as RepositoryListType } from '@/hooks/useRepositoriesQuery';
import { ListPager } from './listPager';
import { RepositoryCard } from './repositoryCard';

type Props = {
  list: RepositoryListType;
  loading: boolean;
  itemPerPage: number;
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

export const RepositoryList: React.FunctionComponent<Props> = ({
  list,
  loading,
  itemPerPage,
  currentPage,
  onNextPage,
  onPrevPage,
}) => {
  if (loading) {
    return <>Loading...</>;
  }

  const startPage = (currentPage - 1) * itemPerPage + 1;
  const endPage = startPage + itemPerPage - 1;

  return (
    <>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((listItem) => (
          <RepositoryCard key={listItem.id} {...listItem} />
        ))}
      </ul>
      {(list.length > 0 || currentPage > 1) && (
        <ListPager
          startPage={startPage}
          endPage={endPage}
          currentPage={currentPage}
          pageItemsNum={(list ?? []).length}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
        />
      )}
    </>
  );
};

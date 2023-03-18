import { MouseEventHandler } from 'react';
import { Button } from './button';

type Props = {
  startPage: number;
  endPage: number;
  currentPage: number;
  pageItemsNum: number;
  onPrevPage: MouseEventHandler<HTMLButtonElement>;
  onNextPage: MouseEventHandler<HTMLButtonElement>;
};

export const ListPager: React.FunctionComponent<Props> = ({
  startPage,
  endPage,
  currentPage,
  pageItemsNum,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-12 sm:px-6"
      aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startPage}</span> to <span className="font-medium">{endPage}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <Button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
          Previous
        </Button>
        <Button
          onClick={onNextPage}
          disabled={pageItemsNum === 0}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
          Next
        </Button>
      </div>
    </nav>
  );
};

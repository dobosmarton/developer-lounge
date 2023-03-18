import { useState } from 'react';

export type PagerProps = {
  itemPerPage: number;
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

type UsePagerHook = () => PagerProps;

export const usePager: UsePagerHook = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onNextPage = () => setCurrentPage((page) => page + 1);

  const onPrevPage = () => setCurrentPage((page) => (page > 1 ? page - 1 : page));

  return {
    itemPerPage: 12,
    currentPage,
    onNextPage,
    onPrevPage,
  };
};

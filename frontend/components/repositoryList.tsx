import React from 'react';
import { RepositoryList as RepositoryListType } from '@/hooks/useRepositories';
import { RepositoryCard } from './repositoryCard';

type Props = {
  list: RepositoryListType;
};

export const RepositoryList: React.FunctionComponent<Props> = ({ list }) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((listItem) => (
        <RepositoryCard key={listItem.id} {...listItem} />
      ))}
    </ul>
  );
};

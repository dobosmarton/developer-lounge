'use client';

import { Button } from '@/components/button';
import { RepositoryFormModal } from '@/components/repositoryFormModal';
import { useAccessTokenQuery } from '@/hooks/useAccessTokenQuery';
import { useCreateRepositoryMutation } from '@/hooks/useCreateRepository';
import { RepositoryInput } from '@/__generated__/graphql';
import { useState } from 'react';
import { useGithubState } from './github.provider';
import { RepositoryList } from './repositoryList';

type Props = {
  searchParams: { code: string };
};

export default function Home(props: Props) {
  useAccessTokenQuery(props.searchParams.code);

  const {
    loading: createRepositoryLoading,
    createRepository,
    isModalOpen,
    toggleModal,
  } = useCreateRepositoryMutation();

  const { token } = useGithubState();

  const onCreateRepository = async (repository: RepositoryInput) => {
    const result = await createRepository(repository);
    if (!result.errors) {
      toggleModal();
    }
  };

  return (
    <main>
      {token && (
        <>
          <RepositoryFormModal
            open={isModalOpen}
            loading={createRepositoryLoading}
            setOpen={toggleModal}
            onCreate={onCreateRepository}
          />

          <div className="flex justify-end">
            <Button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={toggleModal}>
              Add new repository
            </Button>
          </div>
        </>
      )}
      <div className="py-6">
        <RepositoryList />
      </div>
    </main>
  );
}

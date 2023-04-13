'use client';

import { useGithubState } from '@/app/github.provider';
import { CREATE_REPOSITORY } from '@/graphql/github';
import { CreateRepositoryMutation, RepositoryInput } from '@/__generated__/graphql';
import { DefaultContext, FetchResult, MutationResult, useMutation } from '@apollo/client';
import { useState } from 'react';

type UseAccessToken = () => Pick<MutationResult<CreateRepositoryMutation>, 'loading'> & {
  createRepository: (repositoryInput: RepositoryInput) => Promise<FetchResult<CreateRepositoryMutation>>;
  isModalOpen: boolean;
  toggleModal: () => void;
};

export const useCreateRepositoryMutation: UseAccessToken = () => {
  const { hasSession, token } = useGithubState();
  const [isModalOpen, setModalOpen] = useState(false);

  const [_createRepository, { loading }] = useMutation(CREATE_REPOSITORY);

  const createRepository = async (repositoryInput: RepositoryInput) => {
    if (!hasSession) {
      throw new Error('Requires authentication!');
    }

    const context: DefaultContext = { headers: { authorization: `Bearer ${token}` } };
    return _createRepository({
      context,
      variables: { input: repositoryInput },
      update: (cache) => {
        // Clean the previously cached pages,
        // the new repository may change those pages
        cache.evict({ fieldName: 'repositories' });
        cache.gc();
      },
      // Refetch the lastly downloaded page
      refetchQueries: ['repositories'],
    });
  };

  const toggleModal = () => setModalOpen((isOpen) => !isOpen);

  return {
    loading,
    createRepository,
    isModalOpen,
    toggleModal,
  };
};

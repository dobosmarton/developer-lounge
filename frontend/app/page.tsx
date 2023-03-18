'use client';

import { useAccessTokenQuery } from '@/hooks/useAccessTokenQuery';
import { useGithubState } from './github.provider';
import { RepositoryHome } from './repositoryHome';

type Props = {
  searchParams: { code: string };
};

export default function Home(props: Props) {
  useAccessTokenQuery(props.searchParams.code);

  const { token } = useGithubState();

  return <main>{token && <RepositoryHome />}</main>;
}

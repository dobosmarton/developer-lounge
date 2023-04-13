'use client';

import { useGithubState } from './github.provider';
import { RepositoryHome } from './repositoryHome';

type Props = {
  searchParams: { code: string };
};

export default function Home(props: Props) {
  const { hasSession } = useGithubState();

  return <main>{hasSession && <RepositoryHome />}</main>;
}

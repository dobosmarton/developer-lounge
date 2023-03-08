'use client';

import { Header } from '@/components/header';
import { useLoginUrlQuery } from '@/hooks/useLoginUrlQuery';
import React, { PropsWithChildren } from 'react';
import { useGithubState } from './github.provider';

export const LayoutContent: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { token, saveToken } = useGithubState();
  const { url } = useLoginUrlQuery();

  return (
    <body>
      <Header loginHref={url} isLoggedIn={!!token} onLogout={() => saveToken(null)} />
      <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">{children}</div>
    </body>
  );
};

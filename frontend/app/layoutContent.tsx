'use client';

import { signIn, signOut } from 'next-auth/react';
import { Header } from '@/components/header';
import React, { PropsWithChildren } from 'react';
import { useGithubState } from './github.provider';

export const LayoutContent: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { hasSession } = useGithubState();

  return (
    <body>
      <Header onLogin={signIn} isLoggedIn={hasSession} onLogout={signOut} />
      <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">{children}</div>
    </body>
  );
};

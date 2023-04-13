'use client';

import { SessionProvider } from 'next-auth/react';
import { GithubProvider } from './github.provider';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo';
import React, { PropsWithChildren } from 'react';

export const Providers: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ApolloProvider client={apolloClient}>
        <GithubProvider>{children}</GithubProvider>
      </ApolloProvider>
    </SessionProvider>
  );
};

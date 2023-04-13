'use client';

import React, { createContext, useContext, PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

type ExtendedSession = Session & {
  accessToken: string | null;
};
export interface GithubContext {
  hasSession: boolean;
  token: string | null | undefined;
}

// Ignoring missing initialValue, because there's always a provider and value is provided
//
// @ts-ignore - value is provided in index.tsx
export const GithubState = createContext<GithubContext>();

export const useGithubState = () => useContext(GithubState);

export type GithubProviderProps = {
  //
};

export const GithubProvider = ({ children }: PropsWithChildren<GithubProviderProps>) => {
  const sessionData = useSession();
  const session = sessionData.data as ExtendedSession | null;

  const state = {
    hasSession: !!session?.user,
    token: session?.accessToken,
  };

  return <GithubState.Provider value={state}>{children}</GithubState.Provider>;
};

'use client';

import React, { createContext, useContext, PropsWithChildren, useState, useEffect } from 'react';

export interface GithubContext {
  token: string | null;
  saveToken: (token: string | null) => void;
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const saveToken = (token: string | null) => {
    setToken(token);
    if (!token) {
      return localStorage.removeItem('token');
    }
    return localStorage.setItem('token', token);
  };

  const state = {
    token,
    saveToken,
  };

  return <GithubState.Provider value={state}>{children}</GithubState.Provider>;
};

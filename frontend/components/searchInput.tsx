import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

type Props = {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const SearchInput: React.FunctionComponent<Props> = ({ value, onChange }) => {
  return (
    <div className="relative rounded-md shadow-sm">
      <input
        type="text"
        value={value}
        name="search-input"
        id="search-input"
        className="block w-[320px] rounded-md border-0 pl-4 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search in repos"
        onChange={onChange}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  );
};

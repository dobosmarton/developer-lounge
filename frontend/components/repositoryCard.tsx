import React from 'react';

type Props = {
  name?: string | undefined | null;
  description?: string | null | undefined;
  private: boolean;
  htmlUrl: string;
  owner: {
    avatarUrl: string;
    name?: string | null | undefined;
  };
};

export const RepositoryCard: React.FunctionComponent<Props> = ({
  name,
  description,
  private: isPrivate,
  htmlUrl,
  owner,
}) => {
  console.log('owner', owner);

  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <a href={htmlUrl} target="_blank">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className=" text-sm font-medium text-gray-900">{name}</h3>
              <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {isPrivate ? 'Private' : 'Public'}
              </span>
            </div>
            <p className="mt-1  text-sm text-gray-500">{description}</p>
          </div>
          <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={owner.avatarUrl} alt="" />
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <p className="mt-1 truncate text-sm text-gray-500">{owner.name}</p>
          </div>
        </div>
      </a>
    </li>
  );
};

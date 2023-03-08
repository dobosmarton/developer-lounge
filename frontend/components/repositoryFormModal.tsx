import { FormEventHandler, Fragment, LegacyRef, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RepositoryInput } from '@/__generated__/graphql';
import { Spinner } from './spinner';
import { Button } from './button';

type Props = {
  open: boolean;
  loading: boolean;
  setOpen: (isOpen: boolean) => void;
  onCreate: (repository: RepositoryInput) => Promise<unknown>;
};

export const RepositoryFormModal: React.FunctionComponent<Props> = ({ open, loading, setOpen, onCreate }) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const homePageRef = useRef<HTMLInputElement | null>(null);
  const isPrivateRef = useRef<HTMLInputElement | null>(null);

  const _onCreate: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    if (!name) {
      return;
    }

    return onCreate({
      name: name,
      description: descriptionRef.current?.value,
      homepage: homePageRef.current?.value,
      private: isPrivateRef.current?.checked ?? false,
      isTemplate: false,
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 md:max-w-2xl">
                <div className="flex min-h-full flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                      className="mx-auto h-12 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">New Repository</h2>
                  </div>

                  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4  sm:px-10">
                      <form className="space-y-6" onSubmit={_onCreate}>
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Repository name (*)
                          </label>
                          <div className="mt-1">
                            <input
                              ref={nameRef}
                              id="name"
                              name="name"
                              type="text"
                              required
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <div className="mt-1">
                            <input
                              ref={descriptionRef}
                              id="description"
                              name="description"
                              type="text"
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="home-page" className="block text-sm font-medium text-gray-700">
                            Home page
                          </label>
                          <div className="mt-1">
                            <input
                              ref={homePageRef}
                              id="home-page"
                              name="home-page"
                              type="text"
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              ref={isPrivateRef}
                              id="private-repo"
                              name="private-repo"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                              Private repository
                            </label>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4">
                          <Button
                            type="submit"
                            disabled={loading}
                            className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                            {loading && <Spinner />}
                            Create
                          </Button>
                          <Button
                            onClick={() => setOpen(false)}
                            disabled={loading}
                            className={`flex w-full justify-center rounded-md border border-transparent border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useMutation } from 'convex/react';
import { api } from '@nx-convex-example/convex';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface NameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function NameDialog({
  open,
  fingerprint,
}: {
  open: boolean;
  fingerprint: string;
}) {
  const createUser = useMutation(api.users.create);

  function onSubmitName(name: string) {
    createUser({
      fingerprint,
      name,
    });
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Welcome!
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This app is only for{' '}
                    <span className="font-bold">honest</span> users. Enter your
                    name below to get started.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <NameForm onSubmitName={onSubmitName} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

const NameForm = function NameForm({
  onSubmitName,
}: {
  onSubmitName: (name: string) => void;
}) {
  function handleSubmit(event: React.FormEvent<NameFormElement>) {
    event.preventDefault();
    onSubmitName(event.currentTarget.elements.name.value);
  }

  return (
    <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
      <div className="w-full sm:max-w-xs">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Jamie Doe"
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        />
      </div>
      <button
        type="submit"
        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
      >
        Save
      </button>
    </form>
  );
};

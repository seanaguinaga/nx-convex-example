// export function ChatForm({
//                            onSubmitMessage
//                          }: {
//   onSubmitMessage: (message: string) => void;
// }) {
//   function handleSubmit(event: React.FormEvent<MessageFormElement>) {
//     event.preventDefault();
//     onSubmitMessage(event.currentTarget.elements.message.value);
//   }
//
//   return (
//     <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
//       <div className="w-full sm:max-w-xs">
//         <label htmlFor="message" className="sr-only">
//           Enter message
//         </label>
//         <input
//           id="message"
//           name="message"
//           type="text"
//           placeholder="Type your message here to get started"
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
//         />
//       </div>
//       <button
//         type="submit"
//         className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
//       >
//         Send
//       </button>
//     </form>
//   );
// }

import { useRef } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  message: HTMLInputElement;
}

interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function ChatForm({
  onSubmitMessage,
}: {
  onSubmitMessage: (message: string) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<MessageFormElement>) {
    event.preventDefault();
    const message = event.currentTarget.elements.message.value;

    if (message !== '') {
      onSubmitMessage(event.currentTarget.elements.message.value);
      formRef.current?.reset();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  }

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form ref={formRef} onSubmit={handleSubmit} className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Add your comment..."
              className="block w-full resize-none border-0 bg-transparent p-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
              defaultValue={''}
              onKeyDown={onKeyDown}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div aria-hidden="true" className="py-2">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

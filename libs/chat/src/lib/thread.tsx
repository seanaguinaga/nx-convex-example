import { Doc, Id } from '@nx-convex-example/convex';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

export function Thread({
  messages,
  userMap,
}: {
  messages: Doc<'messages'>[];
  userMap: Record<Id<'users'>, Doc<'users'>>;
}) {
  return messages.map((message, messageIdx) => {
    const messageBodyWithBreaks = message.body.replaceAll('\n', '<br />');

    return (
      <li key={message._id}>
        <div className="relative pb-8">
          {messageIdx !== messages.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
            />
          ) : null}
          <div className="relative flex items-start space-x-3">
            <div className="relative">
              <span
                className={classNames(
                  'flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white',
                  userMap[message.userId].isAdmin
                    ? 'bg-purple-400'
                    : 'bg-gray-400'
                )}
              >
                <ChatBubbleLeftEllipsisIcon
                  aria-hidden="true"
                  className=" h-5 w-5 text-white"
                />
              </span>
            </div>
            <div className=" min-w-0 flex-1">
              <div>
                <div className=" text-sm">
                  <span className=" font-medium text-gray-900">
                    {userMap[message.userId].name}
                  </span>
                </div>
                <p className=" mt-0.5 text-sm text-gray-500">
                  Commented at{' '}
                  {new Date(message._creationTime).toLocaleString()}
                </p>
              </div>
              <div className=" mt-2 text-sm text-gray-700">
                <p
                  dangerouslySetInnerHTML={{ __html: messageBodyWithBreaks }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });
}

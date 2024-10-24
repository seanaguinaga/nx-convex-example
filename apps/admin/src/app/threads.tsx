import { Doc, Id } from '@nx-convex-example/convex';
import classNames from 'classnames';

export function Threads({
  threads,
  onSelectThread,
  selectedThreadId,
}: {
  threads: (Doc<'threads'> & {
    startedByName: string;
    messageCount: number;
  })[];
  onSelectThread: (threadId: Id<'threads'>) => void;
  selectedThreadId?: string;
}) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {threads.map((thread) => (
        <li
          key={thread._id}
          className={classNames('flex gap-x-4 py-3 px-2 cursor-pointer', {
            'bg-purple-100': thread._id === selectedThreadId,
          })}
          onClick={() => onSelectThread(thread._id)}
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
            <span className="text-xs font-medium text-white">
              {thread.messageCount > 10 ? '10+' : thread.messageCount}
            </span>
          </span>
          <div className="min-w-0">
            <p className="text-sm/6 font-semibold text-gray-900">
              {thread.startedByName}
            </p>
            <p className="mt-1 truncate text-xs/5 text-gray-500">
              Started at {new Date(thread._creationTime).toLocaleString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

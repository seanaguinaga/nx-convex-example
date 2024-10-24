import { api, Id } from '@nx-convex-example/convex';
import { useMutation, useQuery } from 'convex/react';
import { ChatForm } from './message-form';
import { Thread } from './thread';

export function Chat({
  threadId,
  userId,
}: {
  threadId: Id<'threads'>;
  userId: Id<'users'>;
}) {
  const thread = useQuery(api.messages.list, { threadId });

  const sendMessage = useMutation(api.messages.send);

  function onSubmitMessage(body: string) {
    sendMessage({ userId, threadId, body });
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flow-root pb-2">
        <ul role="list" className="-mb-8">
          {thread?.messages ? (
            <Thread messages={thread.messages} userMap={thread.userMap} />
          ) : null}
        </ul>
      </div>
      <ChatForm onSubmitMessage={onSubmitMessage} />
    </div>
  );
}

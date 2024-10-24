import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api, Id } from '@nx-convex-example/convex';
import { AppLayout, NameDialog } from '@nx-convex-example/components';
import { Chat } from '@nx-convex-example/chat';
import { Threads } from './threads';
import { useFingerprintUser } from '@nx-convex-example/util';

export function App() {
  const [user, fingerprint] = useFingerprintUser('admin');

  const threads = useQuery(api.threads.list);

  const [selectedThreadId, setSelectedThreadId] = useState<Id<'threads'>>();

  return (
    <AppLayout appTitle="Admin">
      {fingerprint && user === null ? (
        <NameDialog open={!user} fingerprint={fingerprint} />
      ) : null}
      <div className="flex w-full h-full">
        <div className="flex-32 h-full overflow-auto">
          {threads !== undefined ? (
            <Threads
              selectedThreadId={selectedThreadId}
              threads={threads}
              onSelectThread={(threadId) => setSelectedThreadId(threadId)}
            ></Threads>
          ) : null}
        </div>
        <div className="flex-1 pl-8 h-full overflow-auto border-gray-300 border-l">
          {selectedThreadId && user !== undefined && user ? (
            <Chat threadId={selectedThreadId} userId={user._id}></Chat>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}

export default App;

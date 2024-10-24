import { useQuery } from 'convex/react';
import { api } from '@nx-convex-example/convex';
import { AppLayout, NameDialog } from '@nx-convex-example/components';
import { Chat } from '@nx-convex-example/chat';
import { useFingerprintUser } from '@nx-convex-example/util';

export function App() {
  const [user, fingerprint] = useFingerprintUser('customer');

  const thread = useQuery(
    api.threads.getLatest,
    user ? { userId: user._id } : 'skip'
  );

  return (
    <AppLayout appTitle="Support">
      {fingerprint && user === null ? (
        <NameDialog open={!user} fingerprint={fingerprint} />
      ) : null}
      <div className="m-auto w-full justify-center overflow-auto h-full">
        {thread !== undefined && thread && user !== undefined && user ? (
          <Chat threadId={thread._id} userId={user._id} />
        ) : null}
      </div>
    </AppLayout>
  );
}

export default App;

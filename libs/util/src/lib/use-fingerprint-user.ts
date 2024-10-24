import { useEffect, useState } from 'react';
import getBrowserFingerprint from 'get-browser-fingerprint';
import { useQuery } from 'convex/react';
import { api, Id } from '@nx-convex-example/convex';

export function useFingerprintUser(prefix: string): [
  (
    | {
        _id: Id<'users'>;
        _creationTime: number;
        name: string;
        fingerprint: string;
        isAdmin: boolean;
      }
    | null
    | undefined
  ),
  string | undefined
] {
  const [fingerprint, setFingerprint] = useState<string>();

  useEffect(() => {
    if (!fingerprint) {
      getBrowserFingerprint().then((f) => {
        setFingerprint(`${prefix}-${f}`);
      });
    }
  }, []);

  const user = useQuery(
    api.users.getCurrentUser,
    fingerprint !== undefined
      ? {
          fingerprint,
        }
      : 'skip'
  );

  return [user, fingerprint];
}

import { getSessionStatus } from './_shared/auth';
import { isRuntimeEditingEnabled } from './_shared/storage';

type Event = {
  headers?: Record<string, string | undefined>;
};

export async function handler(event: Event) {
  const authenticated = getSessionStatus(event.headers?.cookie);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authenticated,
      runtimeEditingEnabled: isRuntimeEditingEnabled(),
      passwordChangeSupported: isRuntimeEditingEnabled(),
      visibilityEnabled: authenticated,
    }),
  };
}
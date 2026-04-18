import { createSessionToken, getConfiguredPasswordHash, serializeCookie, verifyPassword } from './_shared/auth';
import { isRuntimeEditingEnabled } from './_shared/storage';

type Event = {
  body?: string | null;
};

export async function handler(event: Event) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  const configuredHash = await getConfiguredPasswordHash();

  if (!configuredHash || !sessionSecret) {
    return {
      statusCode: 503,
      body: JSON.stringify({
        message: 'Admin authentication is not configured. Set ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET first.',
      }),
    };
  }

  const body = event.body ? (JSON.parse(event.body) as { password?: string }) : {};

  if (!body.password || !verifyPassword(body.password, configuredHash)) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Invalid password.',
      }),
    };
  }

  const token = createSessionToken(sessionSecret);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': serializeCookie('diwakar_admin_session', token, {
        Path: '/',
        HttpOnly: true,
        SameSite: 'Strict',
        'Max-Age': 60 * 60 * 8,
        Secure: process.env.NODE_ENV === 'production',
      }),
    },
    body: JSON.stringify({
      authenticated: true,
      runtimeEditingEnabled: isRuntimeEditingEnabled(),
      passwordChangeSupported: isRuntimeEditingEnabled(),
      visibilityEnabled: true,
      message: isRuntimeEditingEnabled()
        ? 'Admin session started. Local runtime editing is available.'
        : 'Admin session started. Production persistence is disabled until a storage adapter is connected.',
    }),
  };
}
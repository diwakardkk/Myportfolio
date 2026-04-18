import { createPasswordHash, getConfiguredPasswordHash, getSessionStatus, verifyPassword } from './_shared/auth';
import { isRuntimeEditingEnabled, writeLocalPasswordHash } from './_shared/storage';

type Event = {
  body?: string | null;
  headers?: Record<string, string | undefined>;
};

export async function handler(event: Event) {
  if (!getSessionStatus(event.headers?.cookie)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Admin session required.' }),
    };
  }

  const currentHash = await getConfiguredPasswordHash();
  const body = event.body
    ? (JSON.parse(event.body) as { oldPassword?: string; newPassword?: string; confirmPassword?: string })
    : {};

  if (!currentHash) {
    return {
      statusCode: 503,
      body: JSON.stringify({
        message: 'Password store is not configured.',
      }),
    };
  }

  if (!body.oldPassword || !body.newPassword || !body.confirmPassword) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'All password fields are required.' }),
    };
  }

  if (body.newPassword !== body.confirmPassword) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'New passwords do not match.' }),
    };
  }

  if (body.newPassword.length < 10) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Choose a password with at least 10 characters.' }),
    };
  }

  if (!verifyPassword(body.oldPassword, currentHash)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Old password is incorrect.' }),
    };
  }

  if (!isRuntimeEditingEnabled()) {
    return {
      statusCode: 409,
      body: JSON.stringify({
        passwordChangeSupported: false,
        message:
          'Production password rotation is environment-backed in this starter. Update ADMIN_PASSWORD_HASH in Netlify and redeploy, or move to a persistent identity provider.',
      }),
    };
  }

  const nextHash = createPasswordHash(body.newPassword);
  await writeLocalPasswordHash(nextHash);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      passwordChangeSupported: true,
      message: 'Password updated for local development and stored in data/admin-auth.json.',
    }),
  };
}
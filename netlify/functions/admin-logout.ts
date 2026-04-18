import { serializeCookie } from './_shared/auth';

export async function handler() {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': serializeCookie('diwakar_admin_session', '', {
        Path: '/',
        HttpOnly: true,
        SameSite: 'Strict',
        'Max-Age': 0,
        Secure: process.env.NODE_ENV === 'production',
      }),
    },
    body: JSON.stringify({ message: 'Logged out.' }),
  };
}
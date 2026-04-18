import { readProfileOverride } from './_shared/storage';

export async function handler() {
  const profile = await readProfileOverride();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profile }),
  };
}
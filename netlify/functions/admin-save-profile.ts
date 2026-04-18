import { profile as baseProfile, type ProfileData } from '../../data/profile';
import { getSessionStatus } from './_shared/auth';
import { isRuntimeEditingEnabled, writeProfileOverride } from './_shared/storage';

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

  const body = event.body ? (JSON.parse(event.body) as { profile?: ProfileData }) : {};

  if (!body.profile) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing profile payload.' }),
    };
  }

  const runtimeEditingEnabled = isRuntimeEditingEnabled();

  if (!runtimeEditingEnabled) {
    return {
      statusCode: 409,
      body: JSON.stringify({
        message:
          'Production persistence is disabled in this static-first starter. Connect a persistent backend such as Supabase, Netlify Identity + CMS, or a Git-based content workflow to save live changes online.',
        runtimeEditingEnabled,
      }),
    };
  }

  await writeProfileOverride(body.profile);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      profile: body.profile || baseProfile,
      runtimeEditingEnabled,
      passwordChangeSupported: runtimeEditingEnabled,
      message: 'Profile override saved to data/profile.override.json for local development.',
    }),
  };
}
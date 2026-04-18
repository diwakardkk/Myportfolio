import crypto from 'node:crypto';

import { readLocalPasswordHash, isRuntimeEditingEnabled } from './storage';

const sessionCookieName = 'diwakar_admin_session';
const defaultSessionDurationSeconds = 60 * 60 * 8;

interface SessionPayload {
  role: 'admin';
  exp: number;
}

export const getSessionCookieName = () => sessionCookieName;

export function createPasswordHash(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${derivedKey}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [algorithm, salt, storedHash] = passwordHash.split('$');

  if (algorithm !== 'scrypt' || !salt || !storedHash) {
    return false;
  }

  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(derivedKey, 'hex'), Buffer.from(storedHash, 'hex'));
}

export async function getConfiguredPasswordHash() {
  if (isRuntimeEditingEnabled()) {
    const localHash = await readLocalPasswordHash();

    if (localHash) {
      return localHash;
    }
  }

  return process.env.ADMIN_PASSWORD_HASH || null;
}

export function serializeCookie(name: string, value: string, options: Record<string, string | number | boolean>) {
  const pieces = [`${name}=${value}`];

  for (const [key, optionValue] of Object.entries(options)) {
    if (optionValue === false || optionValue === undefined) {
      continue;
    }

    if (optionValue === true) {
      pieces.push(key);
      continue;
    }

    pieces.push(`${key}=${optionValue}`);
  }

  return pieces.join('; ');
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signValue(value: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

export function createSessionToken(secret: string, durationSeconds = defaultSessionDurationSeconds) {
  const payload: SessionPayload = {
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + durationSeconds,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signValue(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) {
    return false;
  }

  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = signValue(encodedPayload, secret);

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
    return payload.exp > Math.floor(Date.now() / 1000) && payload.role === 'admin';
  } catch {
    return false;
  }
}

export function getCookieValue(cookieHeader: string | undefined, cookieName: string) {
  if (!cookieHeader) {
    return undefined;
  }

  const parts = cookieHeader.split(';').map((part) => part.trim());
  const matched = parts.find((part) => part.startsWith(`${cookieName}=`));
  return matched?.slice(cookieName.length + 1);
}

export function getSessionStatus(cookieHeader: string | undefined) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = getCookieValue(cookieHeader, sessionCookieName);
  return verifySessionToken(token, secret);
}
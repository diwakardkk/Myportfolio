import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { ProfileData } from '../../../data/profile';

const rootDirectory = process.cwd();
const dataDirectory = path.join(rootDirectory, 'data');
const profileOverridePath = path.join(dataDirectory, 'profile.override.json');
const adminAuthPath = path.join(dataDirectory, 'admin-auth.json');

export const isRuntimeEditingEnabled = () => process.env.NODE_ENV !== 'production';

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const value = await readFile(filePath, 'utf8');
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

async function ensureDataDirectory() {
  await mkdir(dataDirectory, { recursive: true });
}

export async function readProfileOverride() {
  return readJsonFile<Partial<ProfileData>>(profileOverridePath);
}

export async function writeProfileOverride(profile: ProfileData) {
  if (!isRuntimeEditingEnabled()) {
    return false;
  }

  await ensureDataDirectory();
  await writeFile(profileOverridePath, JSON.stringify(profile, null, 2), 'utf8');
  return true;
}

export async function readLocalPasswordHash() {
  const payload = await readJsonFile<{ passwordHash: string }>(adminAuthPath);
  return payload?.passwordHash || null;
}

export async function writeLocalPasswordHash(passwordHash: string) {
  if (!isRuntimeEditingEnabled()) {
    return false;
  }

  await ensureDataDirectory();
  await writeFile(adminAuthPath, JSON.stringify({ passwordHash }, null, 2), 'utf8');
  return true;
}
import type { ProfileData } from '@/data/profile';

type UnknownRecord = Record<string, unknown>;

const isObject = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const mergeProfileData = (base: ProfileData, override?: Partial<ProfileData> | null): ProfileData => {
  if (!override) {
    return base;
  }

  const merge = (target: unknown, source: unknown): unknown => {
    if (Array.isArray(source)) {
      return source;
    }

    if (isObject(target) && isObject(source)) {
      const result: UnknownRecord = { ...target };

      for (const [key, value] of Object.entries(source)) {
        result[key] = merge(result[key], value);
      }

      return result;
    }

    return source ?? target;
  };

  return merge(base, override) as ProfileData;
};

export const sectionIds = [
  'home',
  'about',
  'research',
  'publications',
  'projects',
  'achievements',
  'contact',
] as const;

export type SectionId = (typeof sectionIds)[number];
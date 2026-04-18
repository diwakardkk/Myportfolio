import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatExternalLink = (href: string) => (href.startsWith('http') ? href : undefined);
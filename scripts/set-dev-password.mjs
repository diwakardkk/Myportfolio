import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run admin:set-dev-password -- "YourStrongPassword"');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync(password, salt, 64).toString('hex');
const passwordHash = `scrypt$${salt}$${hash}`;

const dataDirectory = path.join(process.cwd(), 'data');
const outputPath = path.join(dataDirectory, 'admin-auth.json');

await mkdir(dataDirectory, { recursive: true });
await writeFile(outputPath, JSON.stringify({ passwordHash }, null, 2), 'utf8');

console.log(`Wrote ${outputPath}`);
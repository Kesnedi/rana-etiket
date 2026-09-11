import { PrismaClient } from '@prisma/client';
import { createRequire } from 'node:module';
import path from 'node:path';
// Local development uses a separately generated SQLite client. Production always
// uses the PostgreSQL client generated from prisma/schema.prisma.
const Client: typeof PrismaClient = process.env.NODE_ENV === 'development' && process.env.RANA_LOCAL_DATABASE === 'sqlite'
  ? (createRequire(path.join(process.cwd(), 'package.json'))('./prisma/.local/client') as { PrismaClient: typeof PrismaClient }).PrismaClient
  : PrismaClient;
const globalDb = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalDb.prisma ?? new Client();
if (process.env.NODE_ENV !== 'production') globalDb.prisma = db;

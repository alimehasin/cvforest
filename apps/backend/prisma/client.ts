import { PrismaClient } from '@db/gen/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  }),
});

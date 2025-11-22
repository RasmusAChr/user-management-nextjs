import { PrismaClient } from '../generated/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config';
import { env } from '@prisma/config';

const adapter = new PrismaBetterSqlite3({ 
    url: env("DATABASE_URL") 
});

let prisma = new PrismaClient({ adapter });

export default prisma;

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined
// }

// export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
import { PrismaClient } from "@prisma/client";

// add `prisma` to the `global` object
declare global {
  var prisma: PrismaClient | undefined;
}
// if `globalThis.prisma` already has a `PrismaClient` instance, reuse the instance
// instead of creating a new instance
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") globalThis.prisma = db;

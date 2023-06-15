import { PrismaClient } from "@prisma/client";

//we give a global definition so it can work throughout our code
declare global {
  var prisma: PrismaClient | undefined;
}

// const client either searches for globalThis.prisma or it creates a new prisma ciet
const client = globalThis.prisma || new PrismaClient();
// the if clause checks if we are in development by checking that we are not in production. so if NODE is not in poduction,
// we set globalThis.prisma to the newly created client
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

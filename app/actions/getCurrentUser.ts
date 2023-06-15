import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]"; /** [...nextauth] is the name of our route */
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    //we use the session to find the current user
    //first, lets check if the session is currect

    if (!session?.user?.email) {
      return null;
    }

    //lets find the current user
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    //lets check if we dont have a current user
    if (!currentUser) {
      return null;
    }

    //if all these checks have passed
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null; /*we dont want to throw any error because this is a direct communication with the database */
  }
}

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // CREDENTIALS PROVIDERS
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // first we check if there is email and password passed to us
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid username or password");
        }

        // we  want to find the user using our credential's email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Now check whether this user actually exist.
        // if we dont have the user or the usser has no hashpassword, then we throw an error
        // !user?.hashedPassword means that there is a istake in our the user is trying to login...so user exist but providing wron info to login
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid username or password");
        }

        // Now if the password entered by the user is actuall correct
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // if password is not correct

        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }
        // after all the checks, we are now safe to return user
        return user;
      },
    }),
  ],
  pages: {
    // once an error occurs, it redirect to the home page
    signIn: "/",
  },
  // We only want to activate debug when we are in development. This will help us see all the errors
  debug: process.env.NODE_ENV == "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

// https://authjs.dev/getting-started/migrating-to-v5
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    // extending the session
    // https://authjs.dev/guides/extending-the-session
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      // not logged in
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      // no exist user
      if (!existingUser) return token;
      token.role = existingUser.role;

      return token;
    },
  },
});

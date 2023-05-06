import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, token }) {
      if (session.user != null && token.sub != null) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "E-mail/Password",
      credentials: {
        email: {
          label: "メールアドレス",
          type: "email",
          placeholder: "sample@example.com",
        },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password || "";
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) return null;
        if (bcrypt.compareSync(password, user.crypted_password || "")) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);

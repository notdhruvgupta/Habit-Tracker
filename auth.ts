import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider != "credentials") return true;

            if (!user.id) return false;
            const existingUser = await getUserById(user.id);

            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        },
        async jwt({ token }) {
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});

import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';

export const authOptions: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isPasswordValid = await compare(credentials.password as string, user.password);
        if (!isPasswordValid) return null;

        // Return user object with id as string
        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // 1. JWT Callback: Executed when JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Assign explicit id property
        token.sub = user.id; // Also set standard sub (subject) field
      }
      return token;
    },
    // 2. Session Callback: Executed whenever session is requested on the client
    async session({ session, token }) {
      if (session.user) {
        // Fallback to token.sub if token.id is missing
        session.user.id = (token.id || token.sub) as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
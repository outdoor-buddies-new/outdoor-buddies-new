/*import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type AuthUser = {
  id: string;
  randomKey: string;
};

const authOptions: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@foo.com' },
        password: { label: 'Password', type: 'password' },
      },
      // You should define authorize here if needed
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    //   error: '/auth/error',
    //   verifyRequest: '/auth/verify-request',
    //   newUser: '/auth/new-user'
  },
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string | undefined,
          randomKey: token.randomKey as string | undefined,
        },
      };
    },
    jwt({ token, user }) {
      if (user) {
        const u = user as AuthUser;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
*/

/*
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma'; // Make sure this import points to your Prisma client instance
import { compare } from 'bcrypt';

type AuthUser = {
  id: string;
  email: string;
  role: string;
};

const authOptions: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@foo.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) {
          return null;
        }
        const isPasswordValid = await compare(credentials.password as string, user.password);
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
*/

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
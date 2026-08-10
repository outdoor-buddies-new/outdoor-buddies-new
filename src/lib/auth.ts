/*import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession['user'];
  }
}

// Export v5 handlers and helpers
export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@foo.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Type guard for credentials
        if (
          !credentials ||
          typeof credentials.email !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || typeof user.password !== 'string') return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        // Return user object for session
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.email,
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
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: (token as { role?: string }).role,
        },
      };
    },
    jwt({ token, user }) {
      // user is type: { id?: string; email?: string; name?: string; role?: string }
      if (user && typeof (user as { role?: string }).role === 'string') {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
  },
});*/

/*
import NextAuth, { type DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      role?: string;
      profileId?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    role?: string;
    profileId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    profileId?: string | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
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
          include: { profile: true },
        });

        if (!user) return null;

        const isPasswordValid = await compare(credentials.password as string, user.password);
        if (!isPasswordValid) return null;

        const profileId = user.profile ? user.profile.id : null;

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          profileId: profileId,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.profileId = user.profileId;
      }
      if (token.id) {
        const dbProfile = await prisma.profile.findFirst({
          where: { userId: Number(token.id) },
          select: { id: true },
        });
        token.profileId = dbProfile ? dbProfile.id : null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.profileId = (token.profileId as string) ?? null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
*/

import NextAuth, { type DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      role?: string;
      profileId?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    role?: string;
    profileId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    profileId?: string | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
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
          include: { profile: true },
        });

        if (!user) return null;

        const isPasswordValid = await compare(credentials.password as string, user.password);
        if (!isPasswordValid) return null;

        const profileId = user.profile ? String(user.profile.id) : null;

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          profileId: profileId,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.profileId = user.profileId;
      }

      /*if (!token.profileId && token.id) {
        const parsedUserId = parseInt(token.id, 10);*/
      if ((!token.profileId || trigger === 'update') && token.id) {
      const parsedUserId = parseInt(token.id, 10);
        
        if (!isNaN(parsedUserId)) {
          const dbProfile = await prisma.profile.findFirst({
            where: { userId: parsedUserId },
            select: { id: true },
          });

          token.profileId = dbProfile ? String(dbProfile.id) : null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.profileId = token.profileId ? String(token.profileId) : null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
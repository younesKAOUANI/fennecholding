import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function auth(req, res) {
  // Set CORS headers for cross-domain requests from cPanel frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional, if cookies are needed

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return await NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),

    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordCorrect) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || 'user',
          };
        },
      }),
    ],

    pages: {
      signIn: '/admin',
    },

    session: {
      strategy: 'jwt',
    },

    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.role = user.role;
        }
        return token;
      },

      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.name = token.name;
          session.user.role = token.role;
        }
        return session;
      },

      async redirect({ url, baseUrl }) {
        // Ensure redirects point to cPanel frontend
        if (url.startsWith('/')) return `https://fennecholding.dz${url}`;
        return url;
      },
    },

    cookies: {
      sessionToken: {
        name: `__Secure-next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'none', // Required for cross-domain
          path: '/',
          secure: true, // Required for SameSite=None
          domain: '.fennecholding.dz', // Match your frontend domain
        },
      },
      callbackUrl: {
        name: `__Secure-next-auth.callback-url`,
        options: {
          sameSite: 'none',
          path: '/',
          secure: true,
          domain: '.fennecholding.dz',
        },
      },
      csrfToken: {
        name: `__Host-next-auth.csrf-token`,
        options: {
          httpOnly: true,
          sameSite: 'none',
          path: '/',
          secure: true,
          domain: '.fennecholding.dz',
        },
      },
    },

    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
  });
}
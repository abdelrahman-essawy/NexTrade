import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getEnv } from '../../../utils/env';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    // GitHubProvider({
    //   clientId: getEnv('GITHUB_ID'),
    //   clientSecret: getEnv('GITHUB_SECRET'),
    // }),
    GoogleProvider({
      clientId: getEnv('GOOGLE_ID'),
      clientSecret: getEnv('GOOGLE_SECRET'),
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  adapter: PrismaAdapter(prisma),
  secret: getEnv('SECRET'),
});

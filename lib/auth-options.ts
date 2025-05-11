import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET!,
  // session: {
  //   strategy: "jwt",
  // },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.access_token = token.access_token as string;
        session.id_token = token.id_token as string;
      }
      return session;
    },
  },
};

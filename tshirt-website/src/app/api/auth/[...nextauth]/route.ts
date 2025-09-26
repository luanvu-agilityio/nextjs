import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authApi } from '@/api/auth/auth';
import type { NextAuthOptions, User as NextAuthUser, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

interface AuthResp {
  user: {
    id?: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
  };
  token?: string;
}

type MyJWT = JWT & {
  user?: NextAuthUser & { firstName?: string; lastName?: string };
  accessToken?: string;
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const resp = (await authApi.login({
            email: credentials.email,
            password: credentials.password,
          })) as AuthResp | null;
          if (!resp) return null;
          const { user, token } = resp;
          const id = user.id ? String(user.id) : String(user.email ?? '');
          const nextUser: NextAuthUser & {
            firstName?: string;
            lastName?: string;
          } = {
            id,
            name: user.name,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          // attach token to the returned object so callbacks can pick it up
          (nextUser as unknown as { token?: string }).token = token;
          return nextUser;
        } catch (err) {
          console.error('[nextauth] authorize error', err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: NextAuthUser & { firstName?: string; lastName?: string };
    }): Promise<MyJWT> {
      const t = token as MyJWT;
      if (user) {
        t.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        } as MyJWT['user'];
        const maybe = (user as unknown as { token?: string }).token;
        if (typeof maybe === 'string') t.accessToken = maybe;
      }
      return t;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: MyJWT;
    }): Promise<Session> {
      const s = session as Session & {
        accessToken?: string;
        user?: NextAuthUser & { firstName?: string; lastName?: string };
      };
      if (token.user) {
        s.user = {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
          image: token.user.image,
          // add propagated fields
          firstName: token.user.firstName,
          lastName: token.user.lastName,
        } as unknown as Session['user'];
      } else {
        s.user = s.user ?? ({} as Session['user']);
      }
      if (token.accessToken) s.accessToken = token.accessToken;
      return s;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development' // enable temporarily if needed
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

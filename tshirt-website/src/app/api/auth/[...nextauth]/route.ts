// ============================================================================
// This file sets up the core authentication logic using NextAuth.js
// It handles login, token management, and session creation
// ============================================================================

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
  accessToken?: string; // backend's token stored inside NextAuth's JWT
};

const authOptions: NextAuthOptions = {
  providers: [
    // ========================================================================
    // CREDENTIALS PROVIDER - Email/Password Authentication
    // ========================================================================
    // This is where the actual login happens when user submits credentials
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // ======================================================================
      // AUTHORIZE FUNCTION - The Login Entry Point
      // ======================================================================
      // This function is called when user clicks "Sign In"
      // FLOW: User Form → NextAuth → authorize() → Your Backend API
      // ======================================================================
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // STEP 1: Call backend API to validate credentials
          const resp = (await authApi.login({
            email: credentials.email,
            password: credentials.password,
          })) as AuthResp | null;

          if (!resp) return null;

          // STEP 2: Extract user data and backend token from response
          const { user, token } = resp;

          // STEP 3: Transform your backend's user format to NextAuth's format
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

          // STEP 4: Attach backend token to the user object
          (nextUser as unknown as { token?: string }).token = token;

          // STEP 5: Return the user object
          // NextAuth will now call the JWT callback with this user
          return nextUser;
        } catch (err) {
          console.error('[nextauth] authorize error', err);
          return null; // Login failed
        }
      },
    }),
  ],

  // ==========================================================================
  // SESSION STRATEGY: JWT
  // ==========================================================================
  // Sessions are stored as encrypted cookies (not in a database)
  // The JWT contains all session data
  // ==========================================================================
  session: { strategy: 'jwt' },

  callbacks: {
    // ========================================================================
    // JWT CALLBACK - Builds/Updates the JWT Token
    // ========================================================================
    // This runs AFTER authorize() succeeds (on login) and on every request
    // Purpose: Store user data + backend token inside NextAuth's JWT
    // WHEN IT RUNS:
    //   - After successful login (user parameter is present)
    //   - On every request to refresh the token (user parameter is undefined)
    // ========================================================================
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: NextAuthUser & { firstName?: string; lastName?: string };
    }): Promise<MyJWT> {
      const t = token as MyJWT;

      // Only runs on FIRST login (when user exists)
      if (user) {
        // Store user information in the JWT
        t.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        } as MyJWT['user'];

        // Extract backend's access token that we attached in authorize()
        const maybe = (user as unknown as { token?: string }).token;
        if (typeof maybe === 'string') t.accessToken = maybe;

        // Now both user data AND backend token are stored in the JWT
      }

      // Return the enhanced token
      // NextAuth encrypts this and stores it as a cookie
      return t;
    },

    // ========================================================================
    // SESSION CALLBACK - Exposes Data to Your Application
    // ========================================================================
    // This runs on every session access (e.g., when you call getSession())
    // Purpose: Transform the JWT into a session object your app can use
    // This is what you get when you call useSession() or getServerSession()
    // ========================================================================
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

      // Extract user data from JWT and add to session
      if (token.user) {
        s.user = {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
          image: token.user.image,
          firstName: token.user.firstName,
          lastName: token.user.lastName,
        } as unknown as Session['user'];
      } else {
        s.user = s.user ?? ({} as Session['user']);
      }

      // Expose backend's access token to the client
      if (token.accessToken) s.accessToken = token.accessToken;

      return s;
    },
  },

  // Secret for encrypting JWTs - MUST be set in environment variables
  secret: process.env.NEXTAUTH_SECRET,
};

// Export NextAuth handler for Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// ============================================================================
// AUTHENTICATION DATA FLOW SUMMARY:
// ============================================================================
// 1. User submits login form
// 2. authorize() → calls authApi.login() → gets { user, token }
// 3. authorize() → returns user with attached token
// 4. jwt() callback → stores user + token in JWT
// 5. JWT encrypted as cookie → stored in browser
// 6. On every request → JWT decrypted
// 7. session() callback → exposes user + accessToken to app
// 8. Your app uses session.accessToken to call your backend APIs
// ============================================================================

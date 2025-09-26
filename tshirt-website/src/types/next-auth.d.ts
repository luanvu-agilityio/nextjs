import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id?: string;
    firstName?: string;
    lastName?: string;
  }

  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id?: string;
      firstName?: string;
      lastName?: string;
    };
  }
}

export {};

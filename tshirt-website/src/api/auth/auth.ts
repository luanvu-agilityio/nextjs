import { http } from '@/components/HttpClient';
import { User } from '@/types';

export type AuthResponse = { token: string; user: User };

const USERS = 'users';

export const authApi = {
  login: async (payload: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const list = await http.get<User[]>(
      `${USERS}?email=${encodeURIComponent(payload.email)}&password=${encodeURIComponent(payload.password)}`
    );
    const user = Array.isArray(list) ? list[0] : undefined;
    if (!user) throw new Error('Invalid credentials');
    return { token: `mock-token-${Date.now()}-${user.id}`, user };
  },

  register: async (payload: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const body = {
      firstName: payload.firstName ?? '',
      lastName: payload.lastName ?? '',
      name:
        `${payload.firstName ?? ''} ${payload.lastName ?? ''}`.trim() ||
        payload.email,
      email: payload.email,
      password: payload.password,
      photo: null,
    };
    const user = await http.post<User>(USERS, body);
    return { token: `mock-token-${Date.now()}-${user.id}`, user };
  },

  getUser: async (id: string) => {
    return http.get<User>(`users/${id}`);
  },

  updateUser: async (id: string, patch: Partial<Omit<User, 'id'>>) => {
    return http.put<User>(`users/${id}`, patch);
  },
};

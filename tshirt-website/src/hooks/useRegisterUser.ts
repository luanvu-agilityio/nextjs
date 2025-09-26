'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth/auth';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Types
import { User } from '@/types';

export function useRegister() {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['me'] });
      router.push('/account-details');
    },
  });
}

export function useLogin() {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['me'] });
      router.push('/account-details');
    },
  });
}

export function useMe() {
  const { data: session } = useSession();

  let id: string | undefined;

  if (session?.user?.id && String(session.user.id).length > 0) {
    id = String(session.user.id);
  } else if (session?.user?.email) {
    id = String(session.user.email);
  } else {
    id = undefined;
  }

  return useQuery<User | undefined>({
    queryKey: ['me', id],
    queryFn: async () => {
      if (!id) throw new Error('No user id');
      return authApi.getUser(String(id));
    },
    enabled: !!id,
    initialData: session?.user
      ? {
          id: String(session.user.id ?? session.user.email ?? ''),
          name: session.user.name ?? '',
          email: session.user.email ?? '',
        }
      : undefined,
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      patch,
    }: {
      id: string;
      patch: Partial<Omit<User, 'id'>>;
    }) => authApi.updateUser(id, patch),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

export function signOutLocal(redirect = '/') {
  // keep for legacy flows if needed
  if (typeof window !== 'undefined') window.location.href = redirect;
}

'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// Types
import { Order, CheckoutFormData } from '@/types/order';
import { CartEntry } from '@/types';

// Constants
import { ROUTES } from '@/constants/route';

// API
import { ordersApi } from '@/api';
import { HttpError } from '@/components';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: {
      userId?: string;
      items: CartEntry[];
      formData: CheckoutFormData;
    }) => ordersApi.createOrder(payload),
    onSuccess: (order: Order) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      router.push(`${ROUTES.ORDER_CONFIRMATION}/${order.id}`);
    },
  });
}

export function useOrder(id: string, userId?: string) {
  return useQuery({
    queryKey: ['orders', id, userId],
    queryFn: () => ordersApi.getOrder(id, userId),
    enabled: !!id,

    retry: (failureCount, error: Error) => {
      if (error?.message?.includes('Unauthorized')) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function useUserOrders(userId?: string) {
  return useQuery({
    queryKey: ['orders', 'user', userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      try {
        const orders = await ordersApi.getUserOrders(userId);
        return orders || [];
      } catch (error: unknown) {
        console.error('Error fetching user orders:', error);
        // If it's a "no orders found" case, return empty array
        if (
          error instanceof Error &&
          (error.message?.includes('404') ||
            (error as HttpError)?.status === 404)
        ) {
          return [];
        }
        throw error;
      }
    },
    enabled: !!userId,
    retry: (failureCount, error: HttpError) => {
      if (error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

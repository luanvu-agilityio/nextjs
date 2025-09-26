// Components
import { HttpError } from '@/components';
import { orderHttp } from '@/components/HttpClient';

// Types
import { CartEntry } from '@/types';
import { Order, CheckoutFormData } from '@/types/order';

const ORDERS_ENDPOINT = 'orders';

export const ordersApi = {
  createOrder: async (payload: {
    userId?: string;
    items: CartEntry[];
    formData: CheckoutFormData;
  }): Promise<Order> => {
    const { userId, items, formData } = payload;

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );
    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    const orderData = {
      userId: userId || 'guest',
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.qty,
        price: item.product.price,
        note: item.note || '',
      })),
      shippingInfo: formData.shippingInfo,
      paymentInfo: {
        ...formData.paymentInfo,
        cardNumber:
          '**** **** **** ' + formData.paymentInfo.cardNumber.slice(-4),
        cvv: '***',
      },
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return orderHttp.post<Order>(ORDERS_ENDPOINT, orderData);
  },

  getOrder: async (id: string, userId?: string): Promise<Order> => {
    const order = await orderHttp.get<Order>(`${ORDERS_ENDPOINT}/${id}`);

    if (userId && order.userId !== userId && order.userId !== 'guest') {
      throw new Error('Unauthorized: You can only view your own orders');
    }

    return order;
  },

  getUserOrders: async (userId: string): Promise<Order[]> => {
    if (!userId) {
      return [];
    }

    try {
      const orders = await orderHttp.get<Order[]>(
        `${ORDERS_ENDPOINT}?userId=${userId}`
      );

      return Array.isArray(orders) ? orders : [];
    } catch (error: unknown) {
      console.error('Error fetching user orders:', error);

      // If it's a 404 or "not found", return empty array instead of throwing
      if (
        error &&
        typeof error === 'object' &&
        'status' in error &&
        (error as HttpError).status === 404
      ) {
        return [];
      }

      throw error; // Re-throw other errors
    }
  },

  getAllOrders: async (): Promise<Order[]> => {
    return orderHttp.get<Order[]>(`${ORDERS_ENDPOINT}`);
  },

  updateOrderStatus: async (
    id: string,
    status: Order['status']
  ): Promise<Order> => {
    return orderHttp.put<Order>(`${ORDERS_ENDPOINT}/${id}`, {
      status,
      updatedAt: new Date().toISOString(),
    });
  },
};

import z from 'zod';
import { FORM_VALIDATION_MESSAGES } from '@/constants/messages';

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, FORM_VALIDATION_MESSAGES.FIRST_NAME_REQUIRED),
    lastName: z.string().min(1, FORM_VALIDATION_MESSAGES.LAST_NAME_REQUIRED),
    email: z.string().email(FORM_VALIDATION_MESSAGES.INVALID_EMAIL),
    password: z.string().min(6, FORM_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
    confirmPassword: z
      .string()
      .min(6, FORM_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
    remember: z.boolean().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: FORM_VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH,
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const accountSchema = z.object({
  name: z.string().min(2, FORM_VALIDATION_MESSAGES.NAME_REQUIRED),
  street: z.string().min(2, FORM_VALIDATION_MESSAGES.STREET_REQUIRED),
  address: z.string().min(2, FORM_VALIDATION_MESSAGES.ADDRESS_REQUIRED),
  phone: z.string().min(8, FORM_VALIDATION_MESSAGES.PHONE_REQUIRED),
  gender: z.enum(['male', 'female', 'other']),
});

export type AccountFormValues = z.infer<typeof accountSchema>;

export const shippingInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 digits'),
  country: z.string().min(1, 'Country is required'),
});

export const paymentInfoSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
});

export const checkoutFormSchema = z.object({
  isGuest: z.boolean(),
  shippingInfo: shippingInfoSchema,
  paymentInfo: paymentInfoSchema,
});

export type ShippingInfoFormData = z.infer<typeof shippingInfoSchema>;
export type PaymentInfoFormData = z.infer<typeof paymentInfoSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

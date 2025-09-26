export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ACCOUNT: '/account-details',
  SHOP: '/shop',
  PRODUCT_DETAIL: (id: string) => `/shop/${id}`,
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation',
  CART: '/cart',
  ABOUT: '/about',
  CONTACT: '/contact',
  WISHLIST: '/wishlist',
  ORDER_HISTORY: '/order-history',
};

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.SHOP,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.CART,
  ROUTES.WISHLIST,
  ROUTES.CHECKOUT,
];
export const PROTECTED_ROUTES = [
  ROUTES.ACCOUNT,
  ROUTES.ORDER_CONFIRMATION,
  ROUTES.ORDER_HISTORY,
];

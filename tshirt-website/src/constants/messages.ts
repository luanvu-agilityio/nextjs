// Authentication Messages
export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_ALREADY_EXISTS: 'This email is already registered.',
  USER_NOT_FOUND: 'No account found with this email.',
  ACCESS_DENIED: 'Access denied. Please contact support.',
  ACCOUNT_NOT_FOUND: 'Account not found. Please check your email address.',
  EMAIL_ALREADY_REGISTERED:
    'This email is already registered. Try logging in instead.',
};

// Network Messages
export const NETWORK_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  SERVICE_UNAVAILABLE:
    'Service temporarily unavailable. Please try again later.',
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  INVALID_REQUEST:
    'Invalid request. Please check your information and try again.',
  CHECK_INPUT: 'Please check your input and try again.',
  TOO_MANY_ATTEMPTS: 'Too many attempts. Please wait a moment and try again.',
};

// General Messages
export const GENERAL_MESSAGES = {
  SOMETHING_WRONG: 'Something went wrong. Please try again.',
};

// Form Validation Messages
export const FORM_VALIDATION_MESSAGES = {
  FIRST_NAME_REQUIRED: 'First name required',
  LAST_NAME_REQUIRED: 'Last name required',
  INVALID_EMAIL: 'Invalid email',
  PASSWORD_MIN_LENGTH: 'Min 6 characters',
  PASSWORDS_DONT_MATCH: "Passwords don't match",
  NAME_REQUIRED: 'Name required',
  STREET_REQUIRED: 'Street required',
  ADDRESS_REQUIRED: 'Address required',
  PHONE_REQUIRED: 'Phone required',
};

// Toast Titles
export const TOAST_TITLES = {
  // Success Titles
  ACCOUNT_CREATED: 'Account created successfully!',
  WELCOME_BACK: 'Welcome back!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated!',
  PHOTO_UPDATED: 'Photo updated!',
  ADDED_TO_CART: 'Added to cart!',
  ADDED_TO_WISHLIST: 'Added to wishlist!',
  REMOVED_FROM_CART: 'Removed from cart',
  REMOVED_FROM_WISHLIST: 'Removed from wishlist',
  NOTE_SAVED: 'Note saved',
  PROCEEDING_TO_CHECKOUT: 'Proceeding to checkout',
  ORDER_PLACED: 'Order placed successfully',

  // Error Titles
  LOGIN_FAILED: 'Login failed',
  SIGNUP_FAILED: 'Sign up failed',
  UPDATE_FAILED: 'Update failed',
  UPLOAD_FAILED: 'Upload failed',
  CHECKOUT_FAILED: 'Checkout failed',
  PRODUCT_NOT_FOUND: 'Product not found',
  CART_EMPTY: 'Cart is empty',
  INSUFFICIENT_STOCK: 'Insufficient stock',
  ALREADY_IN_WISHLIST: 'Already in wishlist',
  ORDER_FAILED: 'Order failed',
};

// Toast Descriptions
export const TOAST_DESCRIPTIONS = {
  // Success Descriptions
  ACCOUNT_CREATED: 'Welcome! Please log in with your new account.',
  LOGIN_SUCCESS: 'You have successfully logged in.',
  LOGOUT_SUCCESS: 'You have been signed out. See you next time!',
  PROFILE_UPDATED: 'Your profile has been successfully updated.',
  PHOTO_UPDATED: 'Your profile photo has been successfully updated.',
  NOTE_SAVED: 'Your note has been saved successfully.',
  CHECKOUT_REDIRECT: 'Redirecting to checkout page...',
  CHECKOUT_PROCEEDING: 'Proceeding to checkout...',
  ORDER_PLACED:
    'Thank you for your purchase! You will receive a confirmation email shortly.',

  // Product Actions
  PRODUCT_ADDED_TO_CART: (productName: string) =>
    `${productName} has been added to your cart.`,
  PRODUCT_MOVED_TO_CART: (productName: string) =>
    `${productName} has been moved to your cart.`,
  PRODUCT_SAVED_TO_WISHLIST: (productName: string) =>
    `${productName} has been saved to your wishlist.`,
  PRODUCT_REMOVED_FROM_CART: (productName: string) =>
    `${productName} has been removed from your cart.`,
  PRODUCT_REMOVED_FROM_WISHLIST: (productName: string) =>
    `${productName} has been removed from your wishlist.`,

  // Error Descriptions
  MUST_BE_LOGGED_IN: 'You must be logged in to update your profile.',
  UNABLE_TO_CHECKOUT: 'Unable to proceed to checkout. Please try again.',
  UNABLE_TO_ADD_TO_CART: 'Unable to add product to cart.',
  UNABLE_TO_ADD_TO_WISHLIST: 'Unable to add product to wishlist.',
  UNABLE_TO_REMOVE_FROM_CART:
    'Unable to remove item from cart. Please try again.',
  UNABLE_TO_REMOVE_FROM_WISHLIST:
    'Unable to remove product from wishlist. Please try again.',
  UNABLE_TO_UPDATE_QUANTITY: 'Unable to update quantity. Please try again.',
  UNABLE_TO_SAVE_NOTE: 'Unable to save note. Please try again.',
  ADD_PRODUCTS_TO_CART: 'Add some products to your cart before checkout.',
  PRODUCT_ALREADY_IN_WISHLIST: 'This product is already in your wishlist.',
  INSUFFICIENT_STOCK: (available: number) =>
    `Only ${available} items available.`,
  INSUFFICIENT_STOCK_GENERIC: (available: number) =>
    `Only ${available} items available in stock.`,
  GENERIC_TRY_AGAIN: 'Please try again.',
  ORDER_FAILED: 'There was an error processing your order. Please try again.',
};

// Toast Variants
export const TOAST_VARIANTS = {
  SUCCESS: 'success' as const,
  ERROR: 'error' as const,
  WARNING: 'warning' as const,
  INFO: 'info' as const,
};

// Complete Toast Messages (combines title, description, and variant)
export const TOAST_MESSAGES = {
  // Authentication
  ACCOUNT_CREATED: {
    title: TOAST_TITLES.ACCOUNT_CREATED,
    description: TOAST_DESCRIPTIONS.ACCOUNT_CREATED,
    variant: TOAST_VARIANTS.SUCCESS,
  },
  LOGIN_SUCCESS: {
    title: TOAST_TITLES.WELCOME_BACK,
    description: TOAST_DESCRIPTIONS.LOGIN_SUCCESS,
    variant: TOAST_VARIANTS.SUCCESS,
  },
  LOGOUT_SUCCESS: {
    title: TOAST_TITLES.LOGOUT_SUCCESS,
    description: TOAST_DESCRIPTIONS.LOGOUT_SUCCESS,
    variant: TOAST_VARIANTS.SUCCESS,
  },

  // Profile
  PROFILE_UPDATED: {
    title: TOAST_TITLES.PROFILE_UPDATED,
    description: TOAST_DESCRIPTIONS.PROFILE_UPDATED,
    variant: TOAST_VARIANTS.SUCCESS,
  },
  PHOTO_UPDATED: {
    title: TOAST_TITLES.PHOTO_UPDATED,
    description: TOAST_DESCRIPTIONS.PHOTO_UPDATED,
    variant: TOAST_VARIANTS.SUCCESS,
  },
  MUST_BE_LOGGED_IN: {
    title: TOAST_TITLES.UPDATE_FAILED,
    description: TOAST_DESCRIPTIONS.MUST_BE_LOGGED_IN,
    variant: TOAST_VARIANTS.ERROR,
  },

  // Cart
  NOTE_SAVED: {
    title: TOAST_TITLES.NOTE_SAVED,
    description: TOAST_DESCRIPTIONS.NOTE_SAVED,
    variant: TOAST_VARIANTS.SUCCESS,
    duration: 2000,
  },
  CART_EMPTY: {
    title: TOAST_TITLES.CART_EMPTY,
    description: TOAST_DESCRIPTIONS.ADD_PRODUCTS_TO_CART,
    variant: TOAST_VARIANTS.WARNING,
  },
  CHECKOUT_SUCCESS: {
    title: TOAST_TITLES.PROCEEDING_TO_CHECKOUT,
    description: TOAST_DESCRIPTIONS.CHECKOUT_REDIRECT,
    variant: TOAST_VARIANTS.SUCCESS,
  },

  // Product Actions - Functions that return toast objects
  PRODUCT_NOT_FOUND_CART: {
    title: TOAST_TITLES.PRODUCT_NOT_FOUND,
    description: TOAST_DESCRIPTIONS.UNABLE_TO_ADD_TO_CART,
    variant: TOAST_VARIANTS.ERROR,
  },
  PRODUCT_NOT_FOUND_WISHLIST: {
    title: TOAST_TITLES.PRODUCT_NOT_FOUND,
    description: TOAST_DESCRIPTIONS.UNABLE_TO_ADD_TO_WISHLIST,
    variant: TOAST_VARIANTS.ERROR,
  },
  PRODUCT_NOT_FOUND_CHECKOUT: {
    title: TOAST_TITLES.PRODUCT_NOT_FOUND,
    description: TOAST_DESCRIPTIONS.UNABLE_TO_CHECKOUT,
    variant: TOAST_VARIANTS.ERROR,
  },
  ALREADY_IN_WISHLIST: {
    title: TOAST_TITLES.ALREADY_IN_WISHLIST,
    description: TOAST_DESCRIPTIONS.PRODUCT_ALREADY_IN_WISHLIST,
    variant: TOAST_VARIANTS.INFO,
  },

  // Generic Error Messages
  UPDATE_FAILED: {
    title: TOAST_TITLES.UPDATE_FAILED,
    description: TOAST_DESCRIPTIONS.UNABLE_TO_REMOVE_FROM_CART,
    variant: TOAST_VARIANTS.ERROR,
  },
  CHECKOUT_FAILED: {
    title: TOAST_TITLES.CHECKOUT_FAILED,
    description:
      TOAST_DESCRIPTIONS.UNABLE_TO_CHECKOUT +
      ' ' +
      TOAST_DESCRIPTIONS.GENERIC_TRY_AGAIN,
    variant: TOAST_VARIANTS.ERROR,
  },

  ORDER_FAILED: {
    title: TOAST_TITLES.ORDER_FAILED,
    description: TOAST_DESCRIPTIONS.ORDER_FAILED,
    variant: TOAST_VARIANTS.ERROR,
  },

  ORDER_PLACED: {
    title: TOAST_TITLES.ORDER_PLACED,
    description: TOAST_DESCRIPTIONS.ORDER_PLACED,
    variant: TOAST_VARIANTS.SUCCESS,
  },
};

// Helper functions for dynamic messages
export const createToastMessage = {
  addedToCart: (productName: string) => ({
    title: TOAST_TITLES.ADDED_TO_CART,
    description: TOAST_DESCRIPTIONS.PRODUCT_ADDED_TO_CART(productName),
    variant: TOAST_VARIANTS.SUCCESS,
  }),

  movedToCart: (productName: string) => ({
    title: TOAST_TITLES.ADDED_TO_CART,
    description: TOAST_DESCRIPTIONS.PRODUCT_MOVED_TO_CART(productName),
    variant: TOAST_VARIANTS.SUCCESS,
  }),

  addedToWishlist: (productName: string) => ({
    title: TOAST_TITLES.ADDED_TO_WISHLIST,
    description: TOAST_DESCRIPTIONS.PRODUCT_SAVED_TO_WISHLIST(productName),
    variant: TOAST_VARIANTS.SUCCESS,
  }),

  removedFromCart: (productName: string) => ({
    title: TOAST_TITLES.REMOVED_FROM_CART,
    description: TOAST_DESCRIPTIONS.PRODUCT_REMOVED_FROM_CART(productName),
    variant: TOAST_VARIANTS.SUCCESS,
  }),

  removedFromWishlist: (productName: string) => ({
    title: TOAST_TITLES.REMOVED_FROM_WISHLIST,
    description: TOAST_DESCRIPTIONS.PRODUCT_REMOVED_FROM_WISHLIST(productName),
    variant: TOAST_VARIANTS.SUCCESS,
  }),

  insufficientStock: (available: number) => ({
    title: TOAST_TITLES.INSUFFICIENT_STOCK,
    description: TOAST_DESCRIPTIONS.INSUFFICIENT_STOCK(available),
    variant: TOAST_VARIANTS.WARNING,
  }),

  insufficientStockGeneric: (available: number) => ({
    title: TOAST_TITLES.INSUFFICIENT_STOCK,
    description: TOAST_DESCRIPTIONS.INSUFFICIENT_STOCK_GENERIC(available),
    variant: TOAST_VARIANTS.WARNING,
  }),
};

// Legacy exports for backward compatibility
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: TOAST_TITLES.ACCOUNT_CREATED,
  WELCOME_BACK: TOAST_TITLES.WELCOME_BACK,
  LOGIN_SUCCESS: TOAST_DESCRIPTIONS.LOGIN_SUCCESS,
  LOGOUT_SUCCESS: TOAST_TITLES.LOGOUT_SUCCESS,
  LOGOUT_DESCRIPTION: TOAST_DESCRIPTIONS.LOGOUT_SUCCESS,
  PROFILE_UPDATED: TOAST_TITLES.PROFILE_UPDATED,
  PROFILE_UPDATE_DESCRIPTION: TOAST_DESCRIPTIONS.PROFILE_UPDATED,
  PHOTO_UPDATED: TOAST_TITLES.PHOTO_UPDATED,
  PHOTO_UPDATE_DESCRIPTION: TOAST_DESCRIPTIONS.PHOTO_UPDATED,
  ACCOUNT_CREATED_DESCRIPTION: TOAST_DESCRIPTIONS.ACCOUNT_CREATED,
};

// HTTP Status Messages Map
export const HTTP_STATUS_MESSAGES = {
  400: VALIDATION_MESSAGES.INVALID_REQUEST,
  401: AUTH_MESSAGES.INVALID_CREDENTIALS,
  403: AUTH_MESSAGES.ACCESS_DENIED,
  404: AUTH_MESSAGES.ACCOUNT_NOT_FOUND,
  409: AUTH_MESSAGES.EMAIL_ALREADY_REGISTERED,
  422: VALIDATION_MESSAGES.CHECK_INPUT,
  429: VALIDATION_MESSAGES.TOO_MANY_ATTEMPTS,
  500: NETWORK_MESSAGES.SERVER_ERROR,
  502: NETWORK_MESSAGES.SERVICE_UNAVAILABLE,
  503: NETWORK_MESSAGES.SERVICE_UNAVAILABLE,
  504: NETWORK_MESSAGES.SERVICE_UNAVAILABLE,
};

// String Error Keywords Map
export const STRING_ERROR_KEYWORDS = {
  INVALID: AUTH_MESSAGES.INVALID_CREDENTIALS,
  CREDENTIALS: AUTH_MESSAGES.INVALID_CREDENTIALS,
  NETWORK: NETWORK_MESSAGES.NETWORK_ERROR,
  TIMEOUT: NETWORK_MESSAGES.TIMEOUT,
};

// Error Instance Keywords Map
export const ERROR_INSTANCE_KEYWORDS = {
  'invalid credentials': AUTH_MESSAGES.INVALID_CREDENTIALS,
  'email already exists': AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
  'user not found': AUTH_MESSAGES.USER_NOT_FOUND,
  network: NETWORK_MESSAGES.NETWORK_ERROR,
  timeout: NETWORK_MESSAGES.TIMEOUT,
};

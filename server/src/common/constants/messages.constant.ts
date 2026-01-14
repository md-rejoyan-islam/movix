export const AUTH_MESSAGES = {
  // Success messages
  REGISTER_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  PASSWORD_RESET_EMAIL_SENT:
    'If a user with this email exists, a password reset link will be sent',
  PASSWORD_RESET_SUCCESS: 'Password has been reset successfully',
  TOKEN_REFRESH_SUCCESS: 'Token refreshed successfully',

  // Error messages
  USER_ALREADY_EXISTS: 'User with this email already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  ACCOUNT_DEACTIVATED: 'Account is deactivated',
  INVALID_TOKEN: 'Invalid or expired token',
  INVALID_ACCESS_TOKEN: 'Invalid or expired access token',
  INVALID_REFRESH_TOKEN: 'Invalid or expired refresh token',
  ACCESS_TOKEN_REQUIRED: 'Access token is required',
  USER_NOT_FOUND: 'User not found',
  USER_INACTIVE: 'User not found or inactive',
  INVALID_RESET_TOKEN: 'Invalid or expired reset token',
} as const;

export const WISHLIST_MESSAGES = {
  // Success messages
  ITEM_ADDED: 'Item added to wishlist',
  ITEM_REMOVED: 'Item removed from wishlist',
  WISHLIST_CLEARED: 'Wishlist cleared',

  // Error messages
  ITEM_ALREADY_EXISTS: 'Item already in wishlist',
  ITEM_NOT_FOUND: 'Wishlist item not found',
} as const;

export const COMMON_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
} as const;

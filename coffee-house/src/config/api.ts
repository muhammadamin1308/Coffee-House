const BACKEND_URL = 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com';

export const API_BASE_URL = BACKEND_URL;

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  FAVORITES: `${API_BASE_URL}/products/favorites`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  CART: `${API_BASE_URL}/cart`,
  CONFIRM_ORDER: `${API_BASE_URL}/orders/confirm`,
};

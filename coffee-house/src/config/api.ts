const BACKEND_URL = 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com';

// Use corsproxy.io which supports both GET and POST requests over HTTPS
const CORS_PROXY = 'https://corsproxy.io/?';

const shouldUseProxy = import.meta.env.PROD;

export const API_BASE_URL = shouldUseProxy 
  ? CORS_PROXY + encodeURIComponent(BACKEND_URL)
  : BACKEND_URL;

export const API_ENDPOINTS = {
  PRODUCTS: shouldUseProxy ? `${CORS_PROXY}${encodeURIComponent(BACKEND_URL + '/products')}` : `${BACKEND_URL}/products`,
  FAVORITES: shouldUseProxy ? `${CORS_PROXY}${encodeURIComponent(BACKEND_URL + '/products/favorites')}` : `${BACKEND_URL}/products/favorites`,
  REGISTER: shouldUseProxy ? `${CORS_PROXY}${encodeURIComponent(BACKEND_URL + '/auth/register')}` : `${BACKEND_URL}/auth/register`,
  LOGIN: shouldUseProxy ? `${CORS_PROXY}${encodeURIComponent(BACKEND_URL + '/auth/login')}` : `${BACKEND_URL}/auth/login`,
  CART: shouldUseProxy ? `${CORS_PROXY}${encodeURIComponent(BACKEND_URL + '/cart')}` : `${BACKEND_URL}/cart`,
  CONFIRM_ORDER: shouldUseProxy ? `${CORS_PROXY}${encodeURIComponent(BACKEND_URL + '/orders/confirm')}` : `${BACKEND_URL}/orders/confirm`,
};

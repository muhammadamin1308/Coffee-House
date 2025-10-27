const BACKEND_URL = 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com';

export const API_BASE_URL = import.meta.env.PROD 
  ? `${CORS_PROXY}/${BACKEND_URL}`
  : BACKEND_URL;

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  FAVORITES: `${API_BASE_URL}/products/favorites`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  CART: `${API_BASE_URL}/cart`,
};

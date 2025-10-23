import type {Coffee, FavCoffee, Category} from '../types/index'

const API_BASE_URL = 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com'

export class ProductService {
  private products: FavCoffee[] = []

  async loadProducts(): Promise<FavCoffee[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`)
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      this.products = data.data || data;
      return this.products
    } catch (error) {
      console.log('Failed to load products', error)
      return []
    }
  }

  async loadFavoriteProducts(): Promise<FavCoffee[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/favorites`);
      if (!response.ok) {
        throw new Error('Failed to fetch favorite products');
      }
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Failed to load favorite products:', error);
      throw error; // Re-throw to be caught by the caller
    }
  }

  async getProductById(id: number): Promise<Coffee | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`)
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      return data.data || data;
    } catch (error) {
      console.error('Failed to load product by ID:', error);
      return null;
    }
  }

  getProducts(): FavCoffee[]{
    return this.products;
  }

  getProductsByCategory(category: Category): FavCoffee[]{
    return this.products.filter(p => p.category === category)
  }
}


export const productService = new ProductService()

import type {Coffee, FavCoffee, Category} from '../types/index'
import { API_ENDPOINTS } from '../config/api'

export class ProductService {
  private products: FavCoffee[] = []

  async loadProducts(): Promise<FavCoffee[]> {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS)
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
      const response = await fetch(API_ENDPOINTS.FAVORITES);
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
    // First, ensure products are loaded
    if (this.products.length === 0) {
      await this.loadProducts();
    }

    // Find the product in cached data
    const product = this.products.find(p => p.id === id);
    
    if (!product) {
      console.error('Product not found in cache:', id);
      return null;
    }

    // Convert FavCoffee to Coffee by adding sizes and additives
    const coffeeProduct: Coffee = {
      ...product,
      sizes: {
        s: {
          size: '200 ml',
          price: product.price,
          discountPrice: product.discountPrice,
        },
        m: {
          size: '300 ml',
          price: (parseFloat(product.price) + 0.50).toFixed(2),
          discountPrice: product.discountPrice 
            ? (parseFloat(product.discountPrice) + 0.50).toFixed(2) 
            : null,
        },
        l: {
          size: '400 ml',
          price: (parseFloat(product.price) + 1.00).toFixed(2),
          discountPrice: product.discountPrice 
            ? (parseFloat(product.discountPrice) + 1.00).toFixed(2) 
            : null,
        },
        xl: {
          size: '500 ml',
          price: (parseFloat(product.price) + 1.50).toFixed(2),
          discountPrice: product.discountPrice 
            ? (parseFloat(product.discountPrice) + 1.50).toFixed(2) 
            : null,
        },
        xxl: {
          size: '600 ml',
          price: (parseFloat(product.price) + 2.00).toFixed(2),
          discountPrice: product.discountPrice 
            ? (parseFloat(product.discountPrice) + 2.00).toFixed(2) 
            : null,
        },
      },
      additives: [
        {
          name: 'Sugar',
          price: '0.50',
          discountPrice: null,
        },
        {
          name: 'Cinnamon',
          price: '0.50',
          discountPrice: null,
        },
        {
          name: 'Syrup',
          price: '0.50',
          discountPrice: null,
        },
      ],
    };

    return coffeeProduct;
  }

  getProducts(): FavCoffee[]{
    return this.products;
  }

  getProductsByCategory(category: Category): FavCoffee[]{
    return this.products.filter(p => p.category === category)
  }
}


export const productService = new ProductService()

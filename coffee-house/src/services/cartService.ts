import type { CartItem, Size, Coffee } from "../types";

const CART_STORAGE_KEY = "coffeeHouseCart";

export class CartService {
  private static instance: CartService;

  private constructor() {}

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  getCart(): CartItem[] {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    this.dispatchCartUpdate();
  }

  addItem(product: Coffee, size: Size, additives: string[]): void {
    const cart = this.getCart();
    
    // Calculate prices
    const sizeOption = product.sizes?.[size];
    const basePrice = parseFloat(sizeOption?.price || product.price);
    const baseDiscountPrice = sizeOption?.discountPrice ? parseFloat(sizeOption.discountPrice) : (product.discountPrice ? parseFloat(product.discountPrice) : null);
    
    // Calculate additives price
    let additivesPrice = 0;
    let additivesDiscountPrice = 0;
    
    if (product.additives && additives.length > 0) {
      product.additives.forEach(additive => {
        if (additives.includes(additive.name)) {
          additivesPrice += parseFloat(additive.price);
          if (additive.discountPrice) {
            additivesDiscountPrice += parseFloat(additive.discountPrice);
          }
        }
      });
    }
    
    const totalPrice = basePrice + additivesPrice;
    const totalDiscountPrice = baseDiscountPrice !== null ? baseDiscountPrice + additivesDiscountPrice : null;

    // Check if item with same configuration already exists
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.size === size &&
        JSON.stringify(item.additives.sort()) === JSON.stringify([...additives].sort())
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        image: `/assets/coffee/${product.id}.jpg`,
        size,
        additives: [...additives],
        price: totalPrice,
        discountPrice: totalDiscountPrice,
        quantity: 1,
      };
      cart.push(newItem);
    }

    this.saveCart(cart);
  }

  removeItem(index: number): void {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      this.saveCart(cart);
    }
  }

  updateQuantity(index: number, quantity: number): void {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      if (quantity <= 0) {
        this.removeItem(index);
      } else {
        cart[index].quantity = quantity;
        this.saveCart(cart);
      }
    }
  }

  clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
    this.dispatchCartUpdate();
  }

  getItemCount(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal(): { total: number; discountTotal: number | null } {
    const cart = this.getCart();
    let total = 0;
    let discountTotal = 0;
    let hasDiscount = false;

    cart.forEach((item) => {
      total += item.price * item.quantity;
      if (item.discountPrice !== null) {
        discountTotal += item.discountPrice * item.quantity;
        hasDiscount = true;
      } else {
        discountTotal += item.price * item.quantity;
      }
    });

    return {
      total,
      discountTotal: hasDiscount ? discountTotal : null,
    };
  }

  private dispatchCartUpdate(): void {
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }
}

export const cartService = CartService.getInstance();

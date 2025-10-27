export type Size = "s" | "m" | "l" | "xl" | "xxl";
export type Category = "coffee" | "tea" | "dessert";
export type discountPrice = string | null;

export interface SizeOption {
  size: string;
  price: string;
  discountPrice: discountPrice;
}

export interface Additive {
  name: string;
  price: string;
  discountPrice: discountPrice;
}

export interface FavCoffee {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: discountPrice;
  category: Category;
}

export interface Coffee extends FavCoffee {
  sizes?: Record<Size, SizeOption>;
  additives?: Additive[];
}

export interface CartItem {
  id: number;
  name: string;
  price: string;
  selectedSize?: Size;
  selectedAdditivesPrice?: string;
  quantity: number;
}

export interface FormData {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const CITIES_STREETS: Record<string, string[]> = {
  "Tashkent": [
    "Tashkent city",
    "Fifth street",
    "zerro",
  ],
  "Almaty": [
    "Astana street",
    "WTF st 9/11",

  ],
  "Bishkek": [
    "Kizil kum st",
    "Mount st",
  ],
};

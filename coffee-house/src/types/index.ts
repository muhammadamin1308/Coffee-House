export type Size = "s" | "m" | "l" | "xl" | "xxl";
export type Category = "coffee" | "tea" | "dessert";
export type discountPrice = string | null | undefined;


export interface SizeOption{
  size: string;
  price: string;
  discountPrice?: discountPrice;
}

export interface Additive{
  size: string;
  price: string;
  discountPrice?: discountPrice;
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
 additives: Additive[]
}

export interface CartItem {
  id: number;
  name: string;
  price: string;
  selectedSize?: Size;
  selectedAdditivesPrice?: string;
  quantity: number;
}
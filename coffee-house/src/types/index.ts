export type Size = 'small' | 'medium' | 'large';
export type Category = 'coffee' | 'tea' | 'dessert';

export interface CoffeeItem {
  id: number;
  name: string;
  description: string;
  price: number;
  size: Size;
  discountPrice: number;
  category: Category;
  image?: string;
}

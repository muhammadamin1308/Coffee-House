import type { Coffee, Size } from "../../types";

export class ModalState {
  private currentProduct: Coffee | null = null;
  private selectedSize: Size = "s";
  private selectedAdditives: Set<number> = new Set();
  private isUserLoggedIn: boolean = false;


  //Getters  
  getCurrentProduct(): Coffee | null {
    return this.currentProduct
  }

  getSelectedSize(): Size{
    return this.selectedSize;
  }

  getSelectedAdditives(): Set<number> {
    return this.selectedAdditives;
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  //Setters
  setCurrentProduct(product: Coffee | null): void {
    this.currentProduct = product;
  }

  setSelectedSize(size: Size): void {
    this.selectedSize = size;
  }

  addAdditive(index: number): void {
    this.selectedAdditives.add(index);
  }

  removeAdditive(index: number): void {
    this.selectedAdditives.delete(index);
  }

  clearSelections(): void{
    this.selectedAdditives.clear();
    this.selectedSize = 's'
    this.currentProduct = null;
  }

  initializeDefaultSize(sizes: string[]): void {
    if (sizes.length > 0){
      this.selectedSize = sizes[0] as Size
    }
  }
}

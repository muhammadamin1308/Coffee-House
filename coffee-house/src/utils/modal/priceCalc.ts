import type { Coffee, Size } from "../../types";

export class PriceCalculator {
  calculateTotal(
    product: Coffee,
    selectedSize: Size,
    selectedAdditives: Set<number>,
    isUserLoggedIn: boolean
  ): number {
    if (!product.sizes) {
      return 0;
    }
    const sizeOption = product.sizes[selectedSize];
    const sizePrice =
      isUserLoggedIn && sizeOption.discountPrice
        ? parseFloat(sizeOption.discountPrice)
        : parseFloat(sizeOption.price);

    let additivesPrice = 0;
    selectedAdditives.forEach((index) => {
      if(!product.additives){
        return
      }
      const additive = product.additives[index];
      const price =
        isUserLoggedIn && additive.discountPrice
          ? parseFloat(additive.discountPrice)
          : parseFloat(additive.price);
      additivesPrice += price;
    });

    return sizePrice + additivesPrice;
  }

  renderPriceTooltip(
    price: string,
    discountPrice: string | undefined,
    isUserLoggedIn: boolean
  ): string {
    if (isUserLoggedIn && discountPrice) {
      return `
        <span class="original-price">$${price}</span>
        <span class="discount-price">$${discountPrice}</span>
      `;
    }
    return `<span class="price">$${price}</span>`;
  }
}
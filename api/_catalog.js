// api/_catalog.js  (files starting with _ are not exposed as endpoints)
export const PRODUCTS = {
  // id: price in MAD
  1: 199,
  2: 349,
};
export const FREE_SHIPPING_FROM = 500; // same as freeFrom in CartContext
export const SHIPPING_FEE = 30;        // same as your shipping cost

export function priceOrder(items) {
  let subtotal = 0;
  for (const { id, qty } of items) {
    const price = PRODUCTS[id];
    if (price === undefined || !Number.isInteger(qty) || qty < 1 || qty > 50) {
      throw new Error("Invalid item");
    }
    subtotal += price * qty;
  }
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
}
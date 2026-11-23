import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/products";

const CartContext = createContext(null);
const KEY = "teckrain-cart";
const FREE_SHIPPING_FROM = 50;
const SHIPPING_FEE = 5;

export const money = (n) => `$${n.toFixed(2)}`;

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load); // { productId: quantity }

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable, cart still works in memory */
    }
  }, [lines]);

  const items = useMemo(
    () => products.filter((p) => lines[p.id]).map((p) => ({ ...p, qty: lines[p.id] })),
    [lines]
  );

  const add = (p) => setLines((l) => ({ ...l, [p.id]: Math.min((l[p.id] || 0) + 1, 10) }));
  const setQty = (id, q) =>
    setLines((l) => {
      const next = { ...l };
      if (q <= 0) delete next[id];
      else next[id] = Math.min(q, 10);
      return next;
    });
  const remove = (id) => setQty(id, 0);
  const clear = () => setLines({});

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = items.length && subtotal < FREE_SHIPPING_FROM ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{ items, add, setQty, remove, clear, count, subtotal, shipping, total, freeFrom: FREE_SHIPPING_FROM }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
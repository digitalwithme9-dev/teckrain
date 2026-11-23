import { Link } from "react-router-dom";
import { useCart, money } from "../../context/CartContext";

function Qty({ item, setQty }) {
  const btn = "flex h-9 w-9 items-center justify-center text-lg text-black transition-colors hover:bg-blue-600 hover:text-white";
  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-gray-300">
      <button type="button" aria-label="Decrease quantity" className={btn} onClick={() => setQty(item.id, item.qty - 1)}>−</button>
      <span className="w-8 text-center font-semibold" aria-live="polite">{item.qty}</span>
      <button type="button" aria-label="Increase quantity" className={btn} onClick={() => setQty(item.id, item.qty + 1)}>+</button>
    </div>
  );
}

export default function Cart() {
  const { items, setQty, remove, subtotal, shipping, total, freeFrom } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-6xl" aria-hidden="true">🛒</p>
        <h1 className="mt-4 text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">Looks like you haven't added anything yet.</p>
        <Link to="/#products" className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-black">
          Browse products
        </Link>
      </section>
    );
  }

  const remaining = Math.max(freeFrom - subtotal, 0);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Shopping cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl bg-blue-50 p-4 text-sm">
            {remaining > 0 ? (
              <p>Add <strong className="text-blue-600">{money(remaining)}</strong> more for free shipping.</p>
            ) : (
              <p className="font-semibold text-blue-600">You've unlocked free shipping 🎉</p>
            )}
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100">
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${Math.min((subtotal / freeFrom) * 100, 100)}%` }} />
            </div>
          </div>

          {items.map((item) => (
            <article key={item.id} className="flex gap-4 rounded-2xl border border-gray-200 p-4">
              <img src={item.image} alt={item.name} className="h-24 w-24 shrink-0 rounded-xl bg-blue-50 object-contain sm:h-28 sm:w-28" />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="font-bold">{money(item.price * item.qty)}</p>
                </div>
                <p className="text-sm text-gray-500">{money(item.price)} each</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <Qty item={item} setQty={setQty} />
                  <button type="button" onClick={() => remove(item.id)} className="text-sm font-medium text-gray-500 transition-colors hover:text-blue-600">
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-28">
          <h2 className="text-xl font-bold">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-600">Shipping</dt><dd>{shipping === 0 ? "Free" : money(shipping)}</dd></div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold"><dt>Total</dt><dd>{money(total)}</dd></div>
          </dl>
          <Link to="/checkout" className="mt-6 block rounded-full bg-blue-600 py-3 text-center font-semibold text-white transition-colors hover:bg-black">
            Proceed to checkout
          </Link>
          <Link to="/#products" className="mt-3 block text-center text-sm font-medium text-blue-600 hover:underline">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
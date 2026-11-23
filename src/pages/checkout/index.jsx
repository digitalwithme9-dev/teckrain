import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, money } from "../../context/CartContext";

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20";

function Field({ label, name, form, onChange, type = "text", className = "", ...rest }) {
  return (
    <label className={`block text-sm font-medium ${className}`}>
      {label}
      <input name={name} type={type} value={form[name]} onChange={onChange} required className={`mt-1 ${inputClass}`} {...rest} />
    </label>
  );
}

const formatCard = (name, value) => {
  if (name === "number") {
    return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  if (name === "expiry") {
    const d = value.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  }
  if (name === "cvc") return value.replace(/\D/g, "").slice(0, 4);
  return value;
};

export default function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", postal: "", country: "Morocco" });
  const [card, setCard] = useState({ holder: "", number: "", expiry: "", cvc: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onCardChange = (e) => {
    const { name, value } = e.target;
    setCard((c) => ({ ...c, [name]: formatCard(name, value) }));
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Nothing to check out</h1>
        <p className="mt-2 text-gray-600">Your cart is empty.</p>
        <Link to="/#products" className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-black">
          Browse products
        </Link>
      </section>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    // TODO: send card details to your payment provider here (e.g. Stripe, CMI, Payzone)
    // and only continue once the payment succeeds.
    const last4 = card.number.replace(/\D/g, "").slice(-4);
    const order = {
      id: `TR-${Date.now().toString().slice(-6)}`,
      customer: form,
      items: items.map(({ id, name, price, qty, image }) => ({ id, name, price, qty, image })),
      subtotal, shipping, total,
      payment: `Card ending ${last4}`, // never keep the full card number
    };
    navigate("/success", { state: { order } });
    clear();
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <fieldset className="rounded-2xl border border-gray-200 p-6">
            <legend className="px-2 text-lg font-bold">Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" form={form} onChange={onChange} autoComplete="name" className="sm:col-span-2" />
              <Field label="Email" name="email" type="email" form={form} onChange={onChange} autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" form={form} onChange={onChange} autoComplete="tel" />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-gray-200 p-6">
            <legend className="px-2 text-lg font-bold">Delivery address</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Address" name="address" form={form} onChange={onChange} autoComplete="street-address" className="sm:col-span-2" />
              <Field label="City" name="city" form={form} onChange={onChange} autoComplete="address-level2" />
              <Field label="Postal code" name="postal" form={form} onChange={onChange} autoComplete="postal-code" />
              <Field label="Country" name="country" form={form} onChange={onChange} autoComplete="country-name" className="sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-gray-200 p-6">
            <legend className="px-2 text-lg font-bold">Card payment</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name on card"
                name="holder"
                form={card}
                onChange={onCardChange}
                autoComplete="cc-name"
                className="sm:col-span-2"
              />
              <Field
                label="Card number"
                name="number"
                form={card}
                onChange={onCardChange}
                autoComplete="cc-number"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                pattern="[0-9 ]{17,19}"
                title="Enter a 16-digit card number"
                className="sm:col-span-2"
              />
              <Field
                label="Expiry date"
                name="expiry"
                form={card}
                onChange={onCardChange}
                autoComplete="cc-exp"
                inputMode="numeric"
                placeholder="MM/YY"
                pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                title="Use the format MM/YY"
              />
              <Field
                label="CVC"
                name="cvc"
                form={card}
                onChange={onCardChange}
                autoComplete="cc-csc"
                inputMode="numeric"
                placeholder="123"
                pattern="[0-9]{3,4}"
                title="3 or 4 digits"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">Your payment details are encrypted and never stored on our servers.</p>
          </fieldset>
        </div>

        <aside className="h-fit rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-28">
          <h2 className="text-xl font-bold">Your order</h2>
          <ul className="mt-4 space-y-4">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3 text-sm">
                <img src={i.image} alt="" className="h-14 w-14 rounded-lg bg-blue-50 object-contain" />
                <span className="flex-1">{i.name} <span className="text-gray-500">× {i.qty}</span></span>
                <span className="font-semibold">{money(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-3 border-t border-gray-200 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-600">Shipping</dt><dd>{shipping === 0 ? "Free" : money(shipping)}</dd></div>
            <div className="flex justify-between text-lg font-bold"><dt>Total</dt><dd>{money(total)}</dd></div>
          </dl>
          <button type="submit" className="mt-6 w-full rounded-full bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
            Pay {money(total)}
          </button>
          <Link to="/cart" className="mt-3 block text-center text-sm font-medium text-blue-600 hover:underline">Back to cart</Link>
        </aside>
      </form>
    </section>
  );
}
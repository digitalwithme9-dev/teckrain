import { Link, Navigate, useLocation } from "react-router-dom";
import { money } from "../../context/CartContext";

export default function Success() {
  const { state } = useLocation();
  const order = state?.order;
  if (!order) return <Navigate to="/" replace />;

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-4xl text-white" aria-hidden="true">✓</div>
      <h1 className="mt-6 text-3xl font-bold">Thank you, {order.customer.name.split(" ")[0]}!</h1>
      <p className="mt-2 text-gray-600">
        Your order <strong className="text-black">{order.id}</strong> has been placed. We'll contact you at {order.customer.email} with delivery details.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 p-6 text-left">
        <ul className="space-y-3">
          {order.items.map((i) => (
            <li key={i.id} className="flex items-center gap-3 text-sm">
              <img src={i.image} alt="" className="h-12 w-12 rounded-lg bg-blue-50 object-contain" />
              <span className="flex-1">{i.name} <span className="text-gray-500">× {i.qty}</span></span>
              <span className="font-semibold">{money(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-gray-600">Shipping</dt><dd>{order.shipping === 0 ? "Free" : money(order.shipping)}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-600">Payment</dt><dd>{order.payment}</dd></div>
          <div className="flex justify-between text-lg font-bold"><dt>Total</dt><dd>{money(order.total)}</dd></div>
        </dl>
        <p className="mt-4 text-sm text-gray-600">Delivering to: {order.customer.address}, {order.customer.city}, {order.customer.country}</p>
      </div>

      <Link to="/" className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-black">
        Continue shopping
      </Link>
    </section>
  );
}
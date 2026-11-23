import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";

function ProductFeature({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  const { name, category, price, image, description, highlights, specs } = product;

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <img src={image} alt={name} className="mx-auto aspect-square w-full max-w-md object-contain" />
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{category}</p>
        <h3 className="mt-2 text-3xl font-bold leading-tight text-black">{name}</h3>
        <p className="mt-4 text-gray-600">{description}</p>

        <ul className="mt-5 space-y-2">
          {highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-black">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white" aria-hidden="true">✓</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-6">
          <p className="text-4xl font-extrabold text-black">${price}</p>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
          {added && (
            <Link to="/cart" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
              View cart
            </Link>
          )}
        </div>

        <dl className="mt-8 divide-y divide-gray-200 rounded-2xl border border-gray-200 text-sm">
          {specs.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 px-4 py-2.5">
              <dt className="text-gray-500">{label}</dt>
              <dd className="text-right font-medium text-black">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-10 text-3xl font-bold text-black">Featured product</h2>
      {products.map((p) => (
        <ProductFeature key={p.id} product={p} />
      ))}
    </section>
  );
}
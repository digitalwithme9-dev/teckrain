import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useCart } from "../../context/CartContext";

const links = [
  { label: "Products", to: "/#products" },
  { label: "Why Teckrain", to: "/#features" },
  { label: "Newsletter", to: "/#newsletter" },
];

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" aria-label="Teckrain home" className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4">
          <img src={logo} alt="Teckrain" className="h-14 w-auto" />
        </Link>

        <ul className="flex items-center gap-4 sm:gap-8">
          {links.map((l, i) => (
            <li key={l.to} className={i > 0 ? "hidden md:block" : ""}>
              <Link to={l.to} className="border-b-2 border-transparent py-1.5 font-medium text-black transition-colors hover:border-blue-600 hover:text-blue-600">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative inline-block rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
              🛒 Cart
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs">
                  {count}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
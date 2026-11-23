import logo from "../../assets/logo.png";

const columns = [
  { title: "Shop", links: [["Products", "/#products"], ["New arrivals", "/#products"], ["Deals", "/#products"]] },
  { title: "Help", links: [["Contact us", "/contact"], ["Shipping & returns", "/shipping"], ["FAQ", "/faq"]] },
];

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="/" aria-label="Teckrain home" className="inline-block rounded bg-white px-3 py-2">
            <img src={logo} alt="Teckrain" className="h-12 w-auto" />
          </a>
          <p className="mt-4 max-w-sm">Tech goods for everyday life. Quality products, fast delivery, easy returns.</p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="mb-3 font-semibold text-white">{c.title}</h3>
            <ul className="space-y-2">
              {c.links.map(([label, href]) => (
                <li key={label}><a href={href} className="transition-colors hover:text-blue-400">{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Teckrain. All rights reserved.
      </div>
    </footer>
  );
}
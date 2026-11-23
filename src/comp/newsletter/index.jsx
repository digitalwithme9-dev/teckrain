import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <section id="newsletter" className="scroll-mt-20 bg-blue-600 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <h2 className="text-3xl font-bold">Get 10% off your first order</h2>
        <p className="mt-2 text-blue-100">Join Teckrain for new arrivals and member-only deals.</p>
        {done ? (
          <p className="mt-6 font-semibold">Thanks! Check your inbox for your code.</p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 rounded-full px-5 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button type="submit" className="rounded-full bg-black px-6 py-3 font-semibold transition-colors hover:bg-gray-900">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
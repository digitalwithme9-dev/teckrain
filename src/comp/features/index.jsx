const features = [
  { icon: "🚚", title: "Free shipping", text: "On every order over $50." },
  { icon: "🛡️", title: "2-year warranty", text: "Covered on all devices." },
  { icon: "↩️", title: "30-day returns", text: "Changed your mind? Send it back." },
  { icon: "🔒", title: "Secure payment", text: "Your details stay protected." },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-y border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-2xl" aria-hidden="true">{f.icon}</span>
            <div>
              <h3 className="font-semibold text-black">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
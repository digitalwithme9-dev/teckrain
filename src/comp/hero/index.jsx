import hero from "../../assets/hero.png";

export default function Hero() {
  return (
    <section className="relative flex min-h-[34rem] items-center overflow-hidden bg-black text-white md:min-h-[36rem]">
      {/* Image sits on the right half; the left side is kept clear for the text */}
      <img
        src={hero}
        alt="Featured Teckrain tech products"
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-right md:w-[55%]"
      />
      {/* Mobile: dim the whole image so text is readable */}
      <div className="absolute inset-0 bg-black/70 md:hidden" />
      {/* Desktop: fade the image into the black text side */}
      <div className="absolute inset-y-0 right-0 hidden w-[55%] bg-gradient-to-r from-black via-black/50 to-transparent md:block" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-xl text-left">
          <p className="mb-5 inline-block rounded-full border border-blue-500/50 bg-blue-600/20 px-3 py-1 text-sm text-blue-300">
            Free shipping on orders over $50
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Tech that keeps up <span className="text-blue-500">with you.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-gray-300">
            Phones, laptops, audio and accessories from brands you trust, at prices that make sense.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#products" className="rounded-full bg-blue-600 px-7 py-3 font-semibold transition-colors hover:bg-blue-500">
              Shop products
            </a>
            <a href="#features" className="rounded-full border border-white/30 px-7 py-3 font-semibold transition-colors hover:border-blue-400 hover:text-blue-300">
              Why Teckrain
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
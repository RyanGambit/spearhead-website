export default function FeaturedOn() {
  const logos = ["TechCrunch", "PROTOCOL", "Pltr", "Forbes"];

  return (
    <section className="py-12 px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted mb-8">
          Featured on
        </p>
        <div className="flex flex-wrap items-center gap-12 md:gap-16">
          {logos.map((name) => (
            <span
              key={name}
              className="text-white/40 text-lg md:text-xl font-semibold tracking-wide hover:text-white/60 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

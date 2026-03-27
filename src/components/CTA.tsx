export default function CTA() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-4xl mx-auto text-center rounded-3xl bg-gradient-to-br from-purple-900/60 to-indigo-900/40 border border-white/10 py-16 px-8 backdrop-blur">
        <p className="text-xs uppercase tracking-widest text-muted mb-4">
          Are you ready?
        </p>
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-8">
          Be a Part of the
          <br />
          Next Big Thing
        </h2>
        <button className="px-10 py-4 bg-accent text-black font-semibold rounded-full hover:bg-accent/90 transition-colors text-sm uppercase tracking-wide">
          Get Started
        </button>
      </div>
    </section>
  );
}

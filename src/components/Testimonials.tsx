const testimonials = [
  {
    name: "Olivia Colde",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies pharetra vulputate. Pellentesque in mi massa, eu lobortis lorem.",
  },
  {
    name: "Olivia Colde",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies pharetra vulputate. Pellentesque in mi massa, eu lobortis lorem.",
  },
  {
    name: "Olivia Colde",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies pharetra vulputate. Pellentesque in mi massa, eu lobortis lorem.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-16">
          Read What Others
          <br />
          Have to Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface border border-white/10 p-8 text-center hover:bg-surface-hover transition-colors"
            >
              {/* Avatar */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white/80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {t.name}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Analytics() {
  return (
    <>
      {/* Analytics Section 1 - Image left, text right */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Dashboard illustration */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-red-400" />
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-blue-500/30 rounded-full w-full" />
                <div className="h-3 bg-accent/30 rounded-full w-4/5" />
                <div className="h-3 bg-yellow-400/30 rounded-full w-3/5" />
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-muted">
              Analytics
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-tight text-white">
              Built-in Analytics
              <br />
              to Track Your NFTs
            </h2>
            <p className="text-muted text-base max-w-md">
              Use our built-in analytics dashboard to pull valuable insights and
              monitor the value of your Krypto portfolio over time.
            </p>
            <button className="px-8 py-3 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-black transition-colors text-sm uppercase tracking-wide">
              View Our Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Analytics Section 2 - Text left, image right */}
      <section id="pricing" className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-muted">
              Analytics
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-tight text-white">
              Built-in Analytics
              <br />
              to Track Your NFTs
            </h2>
            <p className="text-muted text-base max-w-md">
              Use our built-in analytics dashboard to pull valuable insights and
              monitor the value of your Krypto portfolio over time.
            </p>
            <button className="px-8 py-3 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-black transition-colors text-sm uppercase tracking-wide">
              View Our Pricing
            </button>
          </div>

          {/* Right - Phone illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-80">
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 border border-white/10 backdrop-blur shadow-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm">Verified</p>
                </div>
              </div>
              {/* Floating cube */}
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400/40 to-orange-400/20 border border-white/10 rotate-12" />
              {/* Floating check badge */}
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

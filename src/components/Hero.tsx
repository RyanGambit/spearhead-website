export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight uppercase text-white">
            Discover and
            <br />
            Collect Rare
            <br />
            NFTs
          </h1>
          <p className="text-muted text-base max-w-md">
            The most secure marketplace for buying and selling unique crypto
            assets.
          </p>
          <div className="flex gap-4 pt-2">
            <button className="px-8 py-3 bg-accent text-black font-semibold rounded-full hover:bg-accent/90 transition-colors text-sm uppercase tracking-wide">
              Buy NFTs
            </button>
            <button className="px-8 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm uppercase tracking-wide">
              Sell NFTs
            </button>
          </div>
        </div>

        {/* Right content - 3D illustration placeholder */}
        <div className="relative flex items-center justify-center">
          <div className="w-80 h-80 md:w-96 md:h-96 relative">
            {/* Decorative card elements */}
            <div className="absolute top-4 right-4 w-56 h-40 rounded-2xl bg-gradient-to-br from-primary/40 to-primary-light/20 backdrop-blur border border-white/10 shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-accent/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <p className="text-white/70 text-xs">Analytics</p>
              </div>
            </div>
            <div className="absolute bottom-8 left-0 w-48 h-32 rounded-2xl bg-gradient-to-br from-purple-900/60 to-purple-700/30 backdrop-blur border border-white/10 shadow-2xl flex items-center justify-center">
              <div className="w-full px-4 space-y-2">
                <div className="h-2 bg-accent/40 rounded-full w-3/4" />
                <div className="h-2 bg-primary-light/40 rounded-full w-full" />
                <div className="h-2 bg-yellow-400/40 rounded-full w-1/2" />
              </div>
            </div>
            {/* Floating orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-400 opacity-40 blur-2xl" />
            <div className="absolute top-12 left-12 w-16 h-16 rounded-full bg-gradient-to-br from-primary-light to-primary opacity-60 blur-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

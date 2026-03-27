export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold tracking-widest text-white">
              KRYPTO
            </span>
          </div>

          {/* Krypto links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Krypto</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Buy NFTs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Sell NFTs
                </a>
              </li>
            </ul>
          </div>

          {/* Market links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Market</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Browse NFTs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Buy NFTs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Sell NFTs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted text-xs hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Join our newsletter
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 min-w-0 px-4 py-2 text-xs bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-muted focus:outline-none focus:border-accent"
              />
              <button className="px-4 py-2 bg-accent text-black text-xs font-semibold rounded-lg hover:bg-accent/90 transition-colors whitespace-nowrap">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

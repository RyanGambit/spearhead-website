export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-transparent backdrop-blur-sm">
      <a href="#" className="text-xl font-bold tracking-widest text-white">
        KRYPTO
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#about"
          className="text-sm text-muted hover:text-white transition-colors"
        >
          about
        </a>
        <a
          href="#pricing"
          className="text-sm text-muted hover:text-white transition-colors"
        >
          pricing
        </a>
        <a
          href="#contact"
          className="text-sm text-muted hover:text-white transition-colors"
        >
          contact
        </a>
        <a
          href="#buy"
          className="text-sm text-white font-medium hover:text-accent transition-colors"
        >
          buy nfts
        </a>
      </div>
    </nav>
  );
}

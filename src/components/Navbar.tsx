import { useEffect, useState } from "react";
import { WA_LINK } from "../App";
//@ts-ignore
import logo from "../assets/logosiga.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/100 backdrop-blur-md shadow-md"
          : "bg-bg/50 backdrop-blur-sm"
      } border-b border-teal/10`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <img
          src={logo}
          alt="Siga Fibra"
          className="h-auto w-[clamp(70px,20vw,90px)]"
        />

        {/* Links - hidden on mobile */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { label: "Planos", href: "#planos" },
            { label: "Por que a Siga?", href: "#porque-siga" },
            { label: "Dúvidas", href: "#faq" },
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-muted font-700 text-sm hover:text-teal transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal hover:bg-teal-dark text-white font-800 text-sm px-5 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal/30"
        >
          Assinar pelo WhatsApp
        </a>
      </nav>
    </header>
  );
}

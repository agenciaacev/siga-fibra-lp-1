import { WA_LINK } from '../App'

const footerLinks = [
  {
    title: 'Sobre Nós',
    links: ['Quem Somos', 'Política de Privacidade', 'Trabalhe Conosco', 'Termos de Uso Disney'],
  },
  {
    title: 'Nossas Soluções',
    links: ['Para Você e sua Família', 'Para sua Empresa', 'Lan To Lan', 'Link Dedicado'],
  },
  {
    title: 'Suporte Técnico',
    links: ['Autoatendimento via Whatsapp', '(85) 3198-9550', 'suporte@sigafibra.com'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white/60 text-sm">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-6">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-black text-white mb-3">
              siga<span className="text-teal">.</span>fibra
            </div>
            <p className="leading-relaxed text-sm">
              Internet por fibra óptica de verdade para você e sua família.
              Fortaleza — CE.
            </p>

            {/* Baixe o app */}
            <div className="mt-6">
              <p className="text-white font-700 text-xs uppercase tracking-widest mb-3">
                Baixe nosso app
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 text-white font-700 text-xs px-4 py-2 rounded-lg transition-colors inline-block w-fit"
                >
                  ▶ Google Play
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 text-white font-700 text-xs px-4 py-2 rounded-lg transition-colors inline-block w-fit"
                >
                  🍎 App Store
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <p className="text-white font-800 text-xs uppercase tracking-widest mb-4">
                {title}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={WA_LINK}
                      className="hover:text-teal transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
          <span>
            SIGA FIBRA LTDA — CNPJ: 18.577.080/0001-09 | Rua Gonçalves Ledo, 2848 — Fortaleza-CE
          </span>
          <span>©2025 SIGA FIBRA — Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  )
}

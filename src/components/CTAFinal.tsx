import { WA_LINK } from '../App'

export default function CTAFinal() {
  return (
    <section className="relative bg-gradient-to-br from-teal to-[#00B896] py-24 md:py-32 overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/8 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-800 tracking-widest uppercase px-5 py-2 rounded-full mb-8">
          🚀 Comece hoje mesmo
        </span>

        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          Chega de sofrer com internet ruim
        </h2>

        <p className="text-white/85 font-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Mude hoje para uma internet que funciona de verdade.
          Sinta a diferença já nos primeiros dias.
        </p>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-teal-dark font-900 font-semibold text-lg px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 hover:shadow-white/30 transition-all duration-200"
        >
          QUERO INSTALAR MINHA INTERNET AGORA
        </a>

        <p className="text-white/60 font-600 text-sm mt-6">
          Sem burocracia &nbsp;•&nbsp; Instalação rápida &nbsp;•&nbsp; Cancelamento fácil
        </p>
      </div>
    </section>
  )
}

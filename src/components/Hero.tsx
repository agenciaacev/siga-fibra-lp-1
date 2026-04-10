import { WA_LINK } from '../App'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-white to-teal-light overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

        {/* Left: Copy */}
        <div className="animate-fade-up">
          <span className="inline-block bg-teal text-white text-xs font-800 tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            ✦ Instalação Rápida na Sua Região
          </span>

          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-dark mb-6">
            Internet Rápida de Verdade na Sua Casa —{' '}
            <span className="text-teal">Sem Travar, Sem Estresse</span>{' '}
            e Sem Complicação
          </h1>

          <p className="text-muted font-600 text-lg leading-relaxed mb-8">
            Pare de perder tempo com internet lenta. Tenha velocidade, estabilidade e
            suporte de verdade com a Siga Fibra.{' '}
            <strong className="text-dark">
              Instalação rápida + planos acessíveis
            </strong>{' '}
            para você e sua família navegarem sem limites.
          </p>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal hover:bg-teal-dark text-white font-900 text-base px-10 py-5 rounded-full transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/40 animate-pulse-slow"
          >
            QUERO MINHA INTERNET RÁPIDA AGORA
          </a>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              'Sem fidelidade obrigatória',
              'Suporte humano real',
              'Cancelamento fácil',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-muted font-700 text-sm">
                <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Speed Visual */}
        <div className="animate-float">
          <div className="relative bg-gradient-to-br from-teal to-[#00E0C0] rounded-4xl p-12 text-white text-center overflow-hidden shadow-2xl shadow-teal/30">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/8" />

            <div className="relative z-10">
              <p className="text-white/70 font-700 text-sm uppercase tracking-widest mb-2">
                Velocidade real
              </p>
              <div className="text-8xl font-black leading-none tracking-tighter">
                1<span className="text-4xl font-800">GB</span>
              </div>
              <p className="text-white/80 font-600 mt-2 text-sm">
                na sua casa, de verdade
              </p>

              <div className="flex justify-center gap-8 mt-10 pt-8 border-t border-white/20">
                {[
                  { value: '0ms', label: 'de lag' },
                  { value: '∞', label: 'dispositivos' },
                  { value: '24h', label: 'suporte' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <strong className="block text-2xl font-900">{value}</strong>
                    <span className="text-xs text-white/70 font-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating card below */}
          <div className="bg-white rounded-2xl px-6 py-4 mt-4 shadow-lg flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-800 text-dark text-sm">Instalação agendada com sucesso!</p>
              <p className="text-muted text-xs font-600">Equipe a caminho — hoje mesmo</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

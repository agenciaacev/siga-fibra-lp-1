const solutionItems = [
  {
    title: 'Mais Velocidade',
    desc: 'Chega a velocidades muito maiores que o padrão comum do mercado. Você sente a diferença no primeiro uso.',
  },
  {
    title: 'Mais Estabilidade',
    desc: 'A fibra óptica mantém o sinal firme mesmo com muitos dispositivos conectados ao mesmo tempo.',
  },
  {
    title: 'Menos Travamentos',
    desc: 'Diga tchau aos bufferings e quedas de conexão exatamente no pior momento possível.',
  },
]

export default function Solution() {
  return (
    <section id="solucao" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left: Copy */}
        <div>
          <span className="inline-block bg-teal-light text-teal-dark text-xs font-800 tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            A Solução
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-tracking-tight mb-5">
            Conheça a Siga Fibra
          </h2>

          <p className="text-muted font-600 text-lg leading-relaxed mb-4">
            A Siga Fibra leva internet por{' '}
            <strong className="text-[#575756]">fibra óptica</strong> direto até sua casa —
            isso significa mais velocidade, mais estabilidade e muito menos travamentos.
          </p>

          <p className="text-muted font-600 leading-relaxed mb-8">
            Diferente da internet comum, a fibra óptica mantém a qualidade mesmo com
            vários dispositivos conectados. É a tecnologia certa para o seu dia a dia.
          </p>

          {/* Solution items */}
          <div className="flex flex-col gap-4">
            {solutionItems.map(({ title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 bg-bg rounded-xl px-5 py-4"
              >
                <div className="w-7 h-7 rounded-full bg-teal-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-teal-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-800 text-dark text-sm mb-1">{title}</p>
                  <p className="text-muted font-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual comparison */}
        <div className="flex flex-col gap-5">
          {/* Internet comum */}
          <div className="bg-bg rounded-2xl p-6 border border-red-100">
            <p className="text-red-400 font-800 text-xs uppercase tracking-widest mb-4">
              ✕ Internet Comum
            </p>
            <div className="space-y-3">
              {[
                { label: 'Estabilidade', pct: 30 },
                { label: 'Velocidade', pct: 25 },
                { label: 'Múltiplos devices', pct: 20 },
              ].map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted text-xs font-700">{label}</span>
                    <span className="text-red-400 text-xs font-800">{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-200 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Siga Fibra */}
          <div className="bg-teal-light rounded-2xl p-6 border border-teal/20">
            <p className="text-teal-dark font-800 text-xs uppercase tracking-widest mb-4">
              ✓ Siga Fibra — Fibra Óptica
            </p>
            <div className="space-y-3">
              {[
                { label: 'Estabilidade', pct: 98 },
                { label: 'Velocidade', pct: 100 },
                { label: 'Múltiplos devices', pct: 95 },
              ].map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-teal-darker text-xs font-700">{label}</span>
                    <span className="text-teal-dark text-xs font-800">{pct}%</span>
                  </div>
                  <div className="h-2 bg-teal/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom note */}
          <div className="bg-gradient-to-r from-teal to-[#00E0C0] rounded-2xl px-6 py-4 text-white text-center">
            <p className="font-800 text-sm">
              É ideal para trabalho, estudo, streaming e jogos — tudo ao mesmo tempo.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

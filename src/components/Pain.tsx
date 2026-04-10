const painPoints = [
  {
    icon: '📺',
    title: 'Vídeo travando',
    desc: 'Bem na melhor parte do filme ou série, aquela tela de carregamento aparece.',
  },
  {
    icon: '💼',
    title: 'Internet caindo',
    desc: 'No meio de uma reunião importante ou de uma aula que não dá pra perder.',
  },
  {
    icon: '📶',
    title: 'Wi-Fi lento',
    desc: 'Quando mais de uma pessoa usa a internet em casa, tudo trava junto.',
  },
  {
    icon: '💸',
    title: 'Pagar caro à toa',
    desc: 'Por um serviço que não entrega o que promete no contrato.',
  },
]

export default function Pain() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-light text-teal-dark text-xs font-800 tracking-widest uppercase px-5 py-2 rounded-full mb-5">
            Você passa por isso?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
            Cansado de sofrer com internet ruim todo dia?
          </h2>
          <p className="text-muted font-600 text-lg max-w-xl mx-auto leading-relaxed">
            A verdade é simples: o problema{' '}
            <strong className="text-dark">não é você</strong>… é a sua internet atual.
          </p>
        </div>

        {/* Pain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {painPoints.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <span className="text-3xl flex-shrink-0 mt-0.5">{icon}</span>
              <div>
                <p className="font-800 text-dark text-base mb-1">{title}</p>
                <p className="text-muted font-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="bg-gradient-to-r from-teal/10 to-teal/5 border-2 border-teal/20 rounded-2xl px-8 py-6 text-center">
          <p className="font-800 text-dark text-lg mb-1">
            👉 Enquanto isso, você perde tempo, produtividade e até momentos de lazer.
          </p>
          <p className="text-muted font-600">
            Mas isso tem solução — e ela é mais simples do que você imagina.
          </p>
        </div>

      </div>
    </section>
  )
}

const benefits = [
  {
    icon: '⚡',
    title: 'Internet realmente rápida',
    desc: 'Velocidades muito maiores que o padrão comum — você sente a diferença desde o primeiro dia de uso.',
  },
  {
    icon: '🔒',
    title: 'Estabilidade de verdade',
    desc: 'Menos quedas, menos dor de cabeça. Fibra óptica é mais estável que qualquer outro tipo de conexão.',
  },
  {
    icon: '🚀',
    title: 'Instalação rápida e simples',
    desc: 'Sem burocracia. Nossa equipe faz tudo por você — basta marcar o horário e aguardar.',
  },
  {
    icon: '🤝',
    title: 'Suporte próximo e eficiente',
    desc: 'Você não fica falando com robô. Tem uma equipe humana pronta para resolver de verdade.',
  },
  {
    icon: '💰',
    title: 'Ótimo custo-benefício',
    desc: 'Você paga pelo que realmente recebe. Planos acessíveis com qualidade de conexão premium.',
  },
  {
    icon: '📍',
    title: 'Cobertura na sua região',
    desc: 'A Siga Fibra atende sua região com cobertura otimizada. Verifique disponibilidade agora.',
  },
]

const seals = [
  { label: 'Instalação', value: 'Rápida' },
  { label: 'Suporte', value: 'Humanizado' },
  { label: 'Cancelamento', value: 'Fácil' },
  { label: 'Cobertura', value: 'Na sua região' },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="bg-bg py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-light text-teal-dark text-xs font-800 tracking-widest uppercase px-5 py-2 rounded-full mb-5">
            Por que a Siga Fibra?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
            Benefícios que fazem diferença de verdade
          </h2>
          <p className="text-muted font-600 text-lg max-w-xl mx-auto leading-relaxed">
            Não é só internet. É qualidade de vida, produtividade e tranquilidade no dia a dia.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {benefits.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-light flex items-center justify-center text-2xl mb-5">
                {icon}
              </div>
              <h3 className="font-800 text-dark text-base mb-2">{title}</h3>
              <p className="text-muted font-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Seals row */}
        <div className="flex flex-wrap justify-center gap-4">
          {seals.map(({ label, value }) => (
            <div
              key={label}
              className="bg-teal-light rounded-2xl px-7 py-5 text-center min-w-[140px]"
            >
              <p className="font-900 text-teal-dark text-lg">{value}</p>
              <p className="text-teal font-700 text-xs uppercase tracking-widest mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

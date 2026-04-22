//@ts-ignore
import imgFibra from '../assets/img-fibra.png'

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
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* Left: Copy */}
        <div>
          <span className="inline-block bg-[#d4f0e0] text-[#0f6e56] text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5">
            A Solução
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-tracking-tight mb-5">
            Conheça a Siga Fibra
          </h2>

          <p className="text-muted font-600 text-lg leading-relaxed mb-4">
            A Siga Fibra leva internet por{' '}
            <strong className="text-[#575756]">fibra óptica</strong> direto até sua casa
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

        {/* Right: Image */}
        <div className="flex items-center justify-center h-full min-h-[400px] md:min-h-[600px] bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={imgFibra}
            alt="Fibra Óptica Siga" 
            className="w-full h-full object-cover"
          />
        </div>
        
      </div>
    </section>
  )
}
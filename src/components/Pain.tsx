//@ts-ignore
import videoTravando from '../assets/102.png'
//@ts-ignore
import internetCaindo from '../assets/101.png'
//@ts-ignore
import wifiLento from '../assets/103.png'
//@ts-ignore
import pagarCaro from '../assets/104.png'

const painPoints = [
  {
    image: videoTravando,
    alt: 'Vídeo travando',
    title: 'Vídeo travando',
    desc: 'Bem na melhor parte do filme ou série, aquela tela de carregamento aparece.',
  },
  {
    image: internetCaindo,
    alt: 'Internet caindo',
    title: 'Internet caindo',
    desc: 'No meio de uma reunião importante ou de uma aula que não dá pra perder.',
  },
  {
    image: wifiLento,
    alt: 'Wi-Fi lento',
    title: 'Wi-Fi lento',
    desc: 'Quando mais de uma pessoa usa a internet em casa, tudo trava junto.',
  },
  {
    image: pagarCaro,
    alt: 'Pagar caro à toa',
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
          <span className="inline-block bg-[#d4f0e0] text-[#0f6e56] text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5">
            Você passa por isso?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#575756] tracking-tight mb-4">
            Cansado de sofrer com internet lenta todo dia?
          </h2>
          <p className="text-muted font-600 text-lg max-w-xl mx-auto leading-relaxed">
            A verdade é simples: o problema{' '}
            <strong className="text-[#575756]">não é você</strong>… é a sua internet atual.
          </p>
        </div>

        {/* Pain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {painPoints.map(({ image, alt, title, desc }) => (
            <div
              key={title}
              className="relative flex flex-col items-center text-center bg-white rounded-2xl px-6 pt-20 pb-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 mt-16"
            >
              {/* Fundo circular + imagem flutuando */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-teal/20 to-teal/5 border border-teal/20 flex items-center justify-center shadow-sm">
                <img
                  src={image}
                  alt={alt}
                  className="w-20 h-20 object-contain drop-shadow-md"
                />
              </div>

              <p className="font-800 text-dark text-base mb-1">{title}</p>
              <p className="text-muted font-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="bg-gradient-to-r from-teal/10 to-teal/5 border-2 border-teal/20 rounded-2xl px-8 py-6 text-center">
          <p className="font-800 text-dark text-lg mb-1">
            👉 Enquanto isso, você perde tempo, produtividade e até momentos de lazer.
          </p>
          <p className="text-muted font-600">
            A boa notícia? A solução está ao seu alcance e é muito simples.
          </p>
        </div>

      </div>
    </section>
  )
}
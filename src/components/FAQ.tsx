import { useState } from 'react'

const faqs = [
  {
    q: '"Mas será que funciona na minha casa?"',
    a: 'Sim! A Siga Fibra atende sua região com cobertura otimizada. Entre em contato e verifique a disponibilidade na sua rua — é rápido e sem compromisso.',
  },
  {
    q: '"E se der algum problema?"',
    a: 'Você tem suporte humano pronto para resolver. Sem filas intermináveis, sem robôs — uma equipe real que resolve de verdade.',
  },
  {
    q: '"É difícil instalar?"',
    a: 'Não. Nossa equipe faz tudo por você. Você só precisa marcar o horário e aguardar — a instalação é rápida e sem complicação.',
  },
  {
    q: '"E se eu não gostar?"',
    a: 'Cancelamento fácil, sem burocracia. Mas spoiler: você vai gostar. A diferença se sente já nos primeiros dias de uso.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-teal/10 transition-all"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-7 py-5 text-left gap-4 hover:bg-teal-lighter transition-colors"
      >
        <span className="font-800 text-dark text-base">{q}</span>
        <span
          className={`text-teal text-xl font-700 flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>

      {open && (
        <div className="px-7 pb-6 border-t border-teal/10">
          <p className="text-muted font-600 leading-relaxed pt-4">
            👉 {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-bg py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-light text-teal-dark text-xs font-800 tracking-widest uppercase px-5 py-2 rounded-full mb-5">
            Sem desculpas
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#575756]text-darktracking-tight mb-4">
            Quebrando suas dúvidas
          </h2>
          <p className="text-muted font-600 text-lg max-w-md mx-auto">
            Sabemos que você pode ter perguntas. Aqui estão as respostas honestas.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {faqs.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>

      </div>
    </section>
  )
}

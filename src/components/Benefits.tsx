const benefits = [
  {
    title: "Internet realmente rápida",
    desc: "Velocidades muito maiores que o padrão comum — você sente a diferença desde o primeiro dia de uso.",
  },
  {
    title: "Estabilidade de verdade",
    desc: "Menos quedas, menos dor de cabeça. Fibra óptica é mais estável que qualquer outro tipo de conexão.",
  },
  {
    title: "Instalação rápida e simples",
    desc: "Sem burocracia. Nossa equipe faz tudo por você — basta marcar o horário e aguardar.",
  },
  {
    title: "Suporte próximo e eficiente",
    desc: "Você não fica falando com robô. Tem uma equipe humana pronta para resolver de verdade.",
  },
  {
    title: "Ótimo custo-benefício",
    desc: "Você paga pelo que realmente recebe. Planos acessíveis com qualidade de conexão premium.",
  },
  {
    title: "Cobertura na sua região",
    desc: "A Siga Fibra atende sua região com cobertura otimizada. Verifique disponibilidade agora.",
  },
];

const seals = [
  { label: "Rápida", value: "Instalação" },
  { label: "Humanizado", value: "Suporte" },
  { label: "Fácil", value: "Cancelamento" },
  { label: "Na sua região", value: "Cobertura" },
];

//@ts-ignore
import logo from "../assets/g.png";

export default function Benefits() {
  return (
    <section className="bg-[#f5f7f2] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#d4f0e0] text-[#0f6e56] text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5">
            Por que a Siga Fibra?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#2c3e30] tracking-tight mb-4">
            Benefícios que fazem diferença de verdade
          </h2>
          <p className="text-[#6b7c72] text-lg max-w-xl mx-auto leading-relaxed">
            Não é só internet. É qualidade de vida, produtividade e tranquilidade no dia a dia.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {benefits.map(({ title, desc }, i) => (
            <div
              key={title}
              className="relative bg-white rounded-2xl p-7 border border-[#d8e8dd]/70 overflow-hidden
                         hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,110,86,0.10)] transition-all duration-200"
            >
              <span className="absolute top-5 right-5 text-[11px] font-bold text-[#b9d9c8] tracking-wide">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[#d4f0e0] to-[#b9e8d4] flex items-center justify-center mb-5">
                <img src={logo} alt="Siga Fibra" className="w-[30px] h-[30px] object-contain" />
              </div>

              <div className="absolute bottom-4 right-4 w-9 h-9 opacity-[0.07] pointer-events-none">
                <img src={logo} alt="" className="w-full h-full object-contain" />
              </div>

              <h3 className="font-extrabold text-[#1e3328] text-[15px] mb-2">{title}</h3>
              <p className="text-[#6b7c72] text-[13.5px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Selos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {seals.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center bg-white border border-[#c6dfd0] rounded-2xl px-6 py-8 text-center"
            >
              <p className="font-black text-[#0f6e56] text-[22px] leading-none mb-2">{value}</p>
              <p className="text-[#5DCAA5] text-[11px] font-semibold uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
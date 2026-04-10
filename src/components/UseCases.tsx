const useCases = [
  { icon: '🎬', label: 'Assistir Netflix e YouTube sem travar' },
  { icon: '💼', label: 'Trabalhar e estudar online' },
  { icon: '🎮', label: 'Jogar sem lag' },
  { icon: '📱', label: 'Usar vários celulares ao mesmo tempo' },
]

export default function UseCases() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-gradient-to-br from-teal to-[#00B896] rounded-4xl p-10 md:p-14 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/8 pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-white/70 font-700 text-xs uppercase tracking-widest mb-3">
                Ideal para
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                Tudo o que você ama funcionando de verdade
              </h2>
              <p className="text-white/80 font-600 leading-relaxed">
                Com a Siga Fibra, você tem liberdade para usar a internet sem pensar
                em limite, queda ou travamento. A fibra aguenta tudo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {useCases.map(({ icon, label }) => (
                <div
                  key={label}
                  className="bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-3 transition-all"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-white font-700 text-sm leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

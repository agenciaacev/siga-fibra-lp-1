import { useState } from "react";

// ─── Tipos ─────────────────────────────────────────────────────────────────────
type Category = "standard" | "top" | "premium";

interface Platform {
  id: string;
  name: string;
  category: Category;
  price: number;
  src: string;
}

interface SelectedPlatforms {
  standard: Platform | null;
  top: Platform | null;
  premium: Platform | null;
}

// ─── Imports de imagens ────────────────────────────────────────────────────────
//@ts-ignore
import deezerImg    from "../assets/deezer.png";
//@ts-ignore
import globoplayImg from "../assets/globoplayicon.png";
//@ts-ignore
import disneyImg    from "../assets/disney+.png";
//@ts-ignore
import hboImg       from "../assets/hbo.webp";
//@ts-ignore
import primeImg     from "../assets/prime-video.png";

const PLATFORMS: Platform[] = [
  { id: "deezer",    name: "Deezer",       category: "standard", price: 9.90,  src: deezerImg    },
  { id: "globoplay", name: "Globoplay",    category: "standard", price: 29.90,  src: globoplayImg },
  { id: "disney",    name: "Disney+",      category: "top",      price: 29.90, src: disneyImg    },
  { id: "prime",     name: "Prime Video",  category: "top",      price: 29.90, src: primeImg     },
  { id: "hbo",       name: "HBO Max",      category: "premium",  price: 29.90, src: hboImg       },
];

const CATEGORY_LABELS: Record<Category, string> = {
  standard: "Standard",
  top: "Top",
  premium: "Premium",
};

// ─── "Siga Hiper Max+" removido ───────────────────────────────────────────────
// Upload do plano 1Gb corrigido de "500" (que aparecia como 500Gb) para "500Mb"
const plans = [
  { name: "Siga Nitro",      speed: "600", unit: "Mb", upload: "300Mb", priceDisc: 84.90,  priceFull: 104.90, popular: false },
  { name: "Siga Nitro",      speed: "800", unit: "Mb", upload: "400Mb", priceDisc: 99.90,  priceFull: 119.90, popular: true  },
  { name: "Siga Nitro",      speed: "1",   unit: "Gb", upload: "500Mb", priceDisc: 109.90, priceFull: 129.90, popular: false },
  { name: "Siga Hiper Flow", speed: "2",   unit: "Gb", upload: "2Gb",   priceDisc: 159.90, priceFull: 179.90, popular: false },
  { name: "Siga Hiper Max",  speed: "3",   unit: "Gb", upload: "3Gb",   priceDisc: 199.90, priceFull: 219.90, popular: false },
];

const WPP_NUMBER = "558531989550";
const GRADIENT   = "linear-gradient(135deg, #00c2c7 0%, #3ecf8e 100%)";

// ─── CSS do shimmer injetado uma vez ──────────────────────────────────────────
// Adicione isso no seu CSS global (ex: index.css ou App.css):
//
// @keyframes shimmer {
//   0%   { background-position: 0%   50%; }
//   50%  { background-position: 100% 50%; }
//   100% { background-position: 0%   50%; }
// }
//
// .btn-shimmer {
//   background: linear-gradient(135deg, #00c2c7 0%, #3ecf8e 50%, #00a8b0 100%);
//   background-size: 200% 200%;
//   animation: shimmer 2.5s ease infinite;
// }

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatPrice(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

function calcTotal(base: number, selected: SelectedPlatforms): number {
  return (
    base +
    (selected.standard?.price ?? 0) +
    (selected.top?.price      ?? 0) +
    (selected.premium?.price  ?? 0)
  );
}

function calcPlatformsExtra(selected: SelectedPlatforms): number {
  return (
    (selected.standard?.price ?? 0) +
    (selected.top?.price      ?? 0) +
    (selected.premium?.price  ?? 0)
  );
}

function buildWhatsAppMessage(
  plan: typeof plans[0],
  total: number,
  selected: SelectedPlatforms
): string {
  const plats = (["standard", "top", "premium"] as Category[])
    .map((cat) => {
      const p = selected[cat];
      return p ? `${p.name} (${CATEGORY_LABELS[cat]})` : null;
    })
    .filter(Boolean);

  const platsText = plats.length > 0 ? plats.join(", ") : "Nenhuma";

  return encodeURIComponent(
    `Olá! Tenho interesse no plano ${plan.name} ${plan.speed}${plan.unit}.\n` +
    `Valor: R$ ${formatPrice(total)}/mês\n` +
    `Plataformas escolhidas: ${platsText}`
  );
}

// ─── Background decorativo SVG ─────────────────────────────────────────────────
function BackgroundDecor() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="plans-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.2" fill="#a8d9c8" opacity="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#plans-dots)" />
      <ellipse cx="92%" cy="4%" rx="260" ry="210" fill="#b8e8d8" opacity="0.55" />
      <ellipse cx="8%"  cy="96%" rx="210" ry="170" fill="#b8e8d8" opacity="0.5" />
      <ellipse cx="50%" cy="50%" rx="340" ry="200" fill="#e8f8f2" opacity="0.4" />
      <circle cx="93%" cy="0"   r="200" fill="none" stroke="#9dd5be" strokeWidth="1"   opacity="0.55" />
      <circle cx="93%" cy="0"   r="270" fill="none" stroke="#9dd5be" strokeWidth="0.6" opacity="0.35" />
      <circle cx="93%" cy="0"   r="340" fill="none" stroke="#9dd5be" strokeWidth="0.4" opacity="0.2"  />
      <circle cx="5%"  cy="100%" r="170" fill="none" stroke="#9dd5be" strokeWidth="1"   opacity="0.55" />
      <circle cx="5%"  cy="100%" r="240" fill="none" stroke="#9dd5be" strokeWidth="0.6" opacity="0.3"  />
      <ellipse cx="88%" cy="0" rx="200" ry="100" fill="#00c2c7" opacity="0.07" />
      <line x1="0" y1="68%" x2="100%" y2="22%" stroke="#9dd5be" strokeWidth="0.5" opacity="0.4" />
      <rect x="76%" y="62%" width="38" height="38" rx="6"
        fill="none" stroke="#00c2c7" strokeWidth="1" opacity="0.3"
        transform="rotate(18 76% 62%)" />
      <rect x="14%" y="12%" width="28" height="28" rx="4"
        fill="none" stroke="#3ecf8e" strokeWidth="1" opacity="0.3"
        transform="rotate(-12 14% 12%)" />
      <circle cx="54%" cy="6%"  r="9"  fill="none" stroke="#0F6E56" strokeWidth="0.8" opacity="0.25" />
      <circle cx="46%" cy="94%" r="13" fill="none" stroke="#00c2c7" strokeWidth="0.8" opacity="0.25" />
      <circle cx="83%" cy="72%" r="6"  fill="none" stroke="#3ecf8e" strokeWidth="0.8" opacity="0.3"  />
      <circle cx="18%" cy="38%" r="5"  fill="none" stroke="#00c2c7" strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

// ─── Botão de plataforma ───────────────────────────────────────────────────────
function PlatformButton({
  platform,
  isSelected,
  onSelect,
}: {
  platform: Platform;
  isSelected: boolean;
  onSelect: (p: Platform) => void;
}) {
  return (
    <button
      onClick={() => onSelect(platform)}
      className={`relative p-0 rounded-[14px] border-[2px] transition-all cursor-pointer w-full aspect-square overflow-hidden ${
        isSelected
          ? "border-[#00c2c7] shadow-md scale-95"
          : "border-transparent hover:border-[#3ecf8e] hover:scale-95"
      }`}
    >
      <img
        src={platform.src}
        alt={platform.name}
        className="w-full h-full object-cover"
      />
      {isSelected && (
        <div className="absolute inset-0 bg-[#00c2c7]/20 flex items-center justify-center">
          <span className="text-white text-lg font-black drop-shadow">✓</span>
        </div>
      )}
    </button>
  );
}

// ─── Banner "+20 plataformas" ──────────────────────────────────────────────────
function MorePlatformsBanner() {
  return (
    <div className="w-full mt-3 flex items-center justify-between gap-2 rounded-[12px] px-3 py-2.5 border border-dashed border-[#3ecf8e] bg-[#f0faf7] hover:bg-[#e6faf8] transition-all group">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {["🎬", "🎵", "📺"].map((emoji, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-white border border-[#cce8dc] flex items-center justify-center text-[10px] shadow-sm"
            >
              {emoji}
            </div>
          ))}
        </div>
        <div className="text-left">
          <p className="text-[10px] font-extrabold text-[#0F6E56] leading-tight">
            +20 plataformas disponíveis
          </p>
          <p className="text-[9px] text-[#7a9a8e] leading-tight">
            Filmes, séries, música e muito mais
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Card do plano ─────────────────────────────────────────────────────────────
function PlanCard({ plan }: { plan: typeof plans[0] }) {
  const [selected, setSelected] = useState<SelectedPlatforms>({
    standard: null,
    top: null,
    premium: null,
  });

  const extra      = calcPlatformsExtra(selected);
  const totalDisc  = calcTotal(plan.priceDisc, selected);
  const totalFull  = calcTotal(plan.priceFull, selected);
  const hasSelection = Object.values(selected).some(Boolean);

  const handleSelect = (platform: Platform) => {
    setSelected((prev) => {
      const current = prev[platform.category];
      return {
        ...prev,
        [platform.category]: current?.id === platform.id ? null : platform,
      };
    });
  };

  const handleAssinar = () => {
    const msg = buildWhatsAppMessage(plan, totalDisc, selected);
    window.open(`https://wa.me/${WPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="bg-white rounded-[22px] overflow-hidden border border-[#cce8dc] flex flex-col">
      {/* ── Header ── */}
      <div
        className="relative overflow-hidden px-6 pt-5 pb-6"
        style={{ background: GRADIENT }}
      >
        <div className="absolute w-[100px] h-[100px] rounded-full bg-white/10 -bottom-8 -right-4 pointer-events-none" />
        <div className="absolute w-[60px] h-[60px] rounded-full bg-white/7 -top-2 right-10 pointer-events-none" />

        {plan.popular && (
          <span className="inline-block bg-white text-[#0F6E56] text-[9px] font-extrabold tracking-widest uppercase rounded-full px-3 py-1 mb-2">
            Mais popular
          </span>
        )}

        <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase mb-1">
          {plan.name}
        </p>
        <p className="text-white font-black leading-none" style={{ fontSize: 52 }}>
          {plan.speed}
          <span className="text-[20px] font-bold">{plan.unit}</span>
        </p>
        {/* Upload agora exibe o valor completo (ex: "500Mb") sem concatenar unit */}
        <p className="text-white/65 text-xs mt-1">
          Download / {plan.upload} Upload
        </p>
        <span className="absolute bottom-3 right-4 text-[11px] font-extrabold tracking-[.15em] text-white/40 uppercase">
          SIGA
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 gap-4 p-5">

        {/* Preço dinâmico */}
        <div>
          <p className="text-[11px] text-[#7a9a8e] font-semibold">
            {hasSelection ? "Total com plataformas" : "A partir de"}
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[13px] font-bold text-[#1a2e26]">R$</span>
            <span className="text-[34px] font-black text-[#1a2e26] leading-none">
              {formatPrice(totalDisc).split(",")[0]}
            </span>
            <span className="text-[16px] font-bold text-[#1a2e26]">
              ,{formatPrice(totalDisc).split(",")[1]}
            </span>
            <span className="text-xs text-[#7a9a8e]">/mês</span>
          </div>
          <div className="bg-[#e1f5ee] rounded-[8px] px-3 py-2 mt-2 text-[10.5px] text-[#0F6E56] leading-relaxed">
            Pague até o vencimento:{" "}
            <strong>R$ {formatPrice(totalDisc)}/mês</strong>
            {hasSelection && (
              <span className="text-[#7a9a8e]"> (plano + serviços)</span>
            )}
            <br />
            <span className="text-[#7a9a8e]">
              Após o vencimento: R$ {formatPrice(totalFull)}/mês
            </span>
          </div>
        </div>

        <hr className="border-[#e8f2ee]" />

        {/* Plataformas */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-extrabold tracking-widest uppercase text-[#7a9a8e]">
              Adicionar serviços
            </p>
            <span className="text-[9px] text-[#7a9a8e]">máx. 1 por categoria</span>
          </div>

          <div className="grid grid-cols-5 gap-[6px]">
            {PLATFORMS.map((plt) => (
              <PlatformButton
                key={plt.id}
                platform={plt}
                isSelected={selected[plt.category]?.id === plt.id}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* ── Legenda: plataformas de vídeo são com anúncio ── */}
          <p className="mt-2 text-[8.5px] text-[#9ab5aa] italic leading-relaxed flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b0cfc5] flex-shrink-0" />
            Os serviços de vídeo (Globoplay, Disney+, Prime Video e HBO Max) são versões com anúncios.
          </p>

          <MorePlatformsBanner />

          {hasSelection && (
            <div className="mt-2 flex items-center justify-between bg-[#f0faf7] rounded-[8px] px-3 py-2">
              <span className="text-[10px] text-[#5a7a6e]">
                {(["standard", "top", "premium"] as Category[])
                  .filter((cat) => selected[cat])
                  .map((cat) => selected[cat]!.name)
                  .join(" + ")}
              </span>
              <span className="text-[10px] font-extrabold text-[#0F6E56]">
                +R$ {formatPrice(extra)}/mês
              </span>
            </div>
          )}
        </div>

        {/* ── CTA com efeito shimmer ── */}
        <button
          onClick={handleAssinar}
          className="mt-auto w-full text-white font-extrabold text-[14px] tracking-wide rounded-[14px] py-[14px] cursor-pointer border-0 hover:opacity-90 active:opacity-80 btn-shimmer"
        >
          Assinar agora
        </button>
      </div>
    </div>
  );
}

// ─── Seção principal ───────────────────────────────────────────────────────────
export default function Plans() {
  const plansRow1 = plans.slice(0, 3);
  const plansRow2 = plans.slice(3);

  return (
    <section
      id="planos"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "#d6f0e8" }}
    >
      {/* Background decorativo */}
      <BackgroundDecor />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="inline-block bg-[#d4f0e0] text-[#0f6e56] text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5">
            Conecte-se
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#575756] mb-3">
            Nossos planos de fibra
          </h2>
          <p className="text-[#575756] text-base max-w-lg mx-auto">
            Pague até do vencimento e garanta o desconto. Após o vencimento,
            o valor retorna ao preço padrão.
          </p>
        </div>

        {/* Linha 1 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plansRow1.map((plan, i) => (
            <PlanCard key={i} plan={plan} />
          ))}
        </div>

        {/* Linha 2 — 2 cards centralizados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-5">
          {plansRow2.map((plan, i) => (
            <PlanCard key={i + 3} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";

// Replace with your actual WA_LINK import in your project:
// import { WA_LINK } from '../App'
const WA_LINK = "https://wa.me/558531989550?text=Ol%C3%A1!%20Quero%20contratar%20a%20Siga%20Fibra!";

// ─── Plans ────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    value: "1",
    unit: "Gb",
    label: "na sua casa, de verdade",
    gradient: "linear-gradient(135deg, #00C9A7 0%, #00C4C0 55%, #00DEDE 100%)",
    shadow: "0 40px 80px rgba(0,196,192,0.45)",
  },
  {
    value: "600",
    unit: "Mb",
    label: "para sua família toda",
    gradient: "linear-gradient(135deg, #00C9A7 0%, #00C4C0 55%, #00DEDE 100%)",
    shadow: "0 40px 80px rgba(0,196,192,0.45)",
    // gradient: 'linear-gradient(135deg, #00B8D9 0%, #00CFEE 55%, #00E8FF 100%)',
    // shadow: '0 40px 80px rgba(0,184,217,0.45)',
  },
  {
    value: "700",
    unit: "Mb",
    label: "velocidade sem limites",
    gradient: "linear-gradient(135deg, #00C9A7 0%, #00C4C0 55%, #00DEDE 100%)",
    shadow: "0 40px 80px rgba(0,196,192,0.45)",
  },
];

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: "rgba(0,201,167,0.2)",
            animation: `particleFloat ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── SpeedCard3D ──────────────────────────────────────────────────────────────
function SpeedCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseRotate, setMouseRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Plan cycling state
  const [planIndex, setPlanIndex] = useState(0);
  const [animRotateY, setAnimRotateY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [barKey, setBarKey] = useState(0);

  const plan = PLANS[planIndex];

  // Auto-cycle every 3.5s
  useEffect(() => {
    const id = setInterval(() => {
      setIsAnimating(true);
      setAnimRotateY(90);

      // Mid-flip: swap content
      const swapTimeout = setTimeout(() => {
        setPlanIndex((i) => (i + 1) % PLANS.length);
        setBarKey((k) => k + 1);
        setAnimRotateY(0);
      }, 360);

      // Done: re-enable hover tilt
      const doneTimeout = setTimeout(() => {
        setIsAnimating(false);
      }, 760);

      return () => {
        clearTimeout(swapTimeout);
        clearTimeout(doneTimeout);
      };
    }, 3500);

    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMouseRotate({ x: -dy * 12, y: dx * 12 });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // Compose final transform: animation Y takes priority during flip
  const rotateX = isAnimating ? 0 : mouseRotate.x;
  const rotateY = isAnimating ? animRotateY : mouseRotate.y;
  const scale = isHovered && !isAnimating ? 1.03 : 1;

  const transition = isAnimating
    ? "transform 0.36s cubic-bezier(0.4, 0, 0.2, 1)"
    : isHovered
      ? "transform 0.08s ease-out"
      : "transform 0.5s ease-out";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (!isAnimating) setIsHovered(true);
      }}
      onMouseLeave={() => {
        setMouseRotate({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      style={{ perspective: "1000px", cursor: "pointer", userSelect: "none" }}
    >
      {/* 3D wrapper */}
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transition,
          transformStyle: "preserve-3d",
          borderRadius: "2rem",
          boxShadow: isHovered
            ? `${plan.shadow.replace("0.45", "0.55")}, 0 0 0 1px rgba(0,201,167,0.15)`
            : plan.shadow,
        }}
      >
        <div
          className="relative overflow-hidden text-white text-center"
          style={{
            background: plan.gradient,
            borderRadius: "2rem",
            padding: "2.5rem 2.5rem 2rem",
            transition: "background 0.4s ease",
          }}
        >
          {/* Glare */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.28) 0%, transparent 60%)`,
              borderRadius: "2rem",
              opacity: isHovered ? 1 : 0,
              transition: isHovered ? "none" : "opacity 0.4s",
            }}
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.05) 39px,rgba(255,255,255,0.05) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.05) 39px,rgba(255,255,255,0.05) 40px)",
              borderRadius: "2rem",
            }}
          />

          {/* Decorative orbs */}
          <div
            className="absolute -top-14 -right-14 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* Plan indicator dots */}
          <div
            className="absolute top-4 right-0 left-0 flex justify-center gap-1.5 pointer-events-none"
            style={{ transform: "translateZ(20px)" }}
          >
            {PLANS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === planIndex ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i === planIndex
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.35)",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div
            className="relative z-10"
            style={{ transform: "translateZ(30px)", paddingTop: "0.5rem" }}
          >
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-4"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                borderRadius: "50px",
                padding: "5px 18px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Velocidade real
            </span>

            {/* Main number */}
            <div
              style={{
                fontSize: "clamp(5rem, 11vw, 7.5rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                textShadow: "0 6px 24px rgba(0,0,0,0.15)",
                transition: "opacity 0.15s ease",
                opacity: isAnimating && animRotateY >= 88 ? 0 : 1,
              }}
            >
              {plan.value}
              <span
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 800,
                  verticalAlign: "middle",
                }}
              >
                {plan.unit}
              </span>
            </div>

            <p
              className="text-white/80 font-600 mt-1 text-sm tracking-wide"
              style={{
                transition: "opacity 0.15s ease",
                opacity: isAnimating && animRotateY >= 88 ? 0 : 1,
              }}
            >
              {plan.label}
            </p>

            {/* Speed bar — key forces remount & animation restart per plan */}
            <div className="mt-5 mb-5">
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "50px",
                  height: "5px",
                  overflow: "hidden",
                }}
              >
                <div
                  key={barKey}
                  style={{
                    height: "100%",
                    width: "0%",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "50px",
                    animation:
                      "speedBar 2.2s 0.5s cubic-bezier(0.4,0,0.2,1) forwards",
                    boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 600,
                  }}
                >
                  0 MB/s
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 600,
                  }}
                >
                  velocidade máxima ✓
                </span>
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                paddingTop: "1.25rem",
              }}
            >
              {[
                { value: "0ms", label: "de lag" },
                { value: "∞", label: "dispositivos" },
                { value: "24h", label: "suporte" },
              ].map(({ value, label }, i) => (
                <div
                  key={label}
                  className="text-center flex-1"
                  style={{
                    borderLeft:
                      i > 0 ? "1px solid rgba(255,255,255,0.2)" : "none",
                    transform: "translateZ(12px)",
                  }}
                >
                  <strong
                    className="block text-xl font-900"
                    style={{ textShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
                  >
                    {value}
                  </strong>
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.65)",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ground shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "-18px",
          left: "12%",
          right: "12%",
          height: "18px",
          background: "rgba(0,201,167,0.25)",
          filter: "blur(14px)",
          borderRadius: "50%",
          transition: "all 0.5s ease",
          transform: isHovered ? "scaleX(1.1)" : "scaleX(1)",
          opacity: isHovered ? 0.6 : 0.35,
        }}
      />
    </div>
  );
}

// ─── FloatingNotification ─────────────────────────────────────────────────────
function FloatingNotification() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        marginTop: "1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,201,167,0.08)",
        animation: "notifFloat 4s ease-in-out infinite",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          flexShrink: 0,
          background: "linear-gradient(135deg, #00C9A7, #00E0C0)",
          boxShadow: "0 4px 14px rgba(0,201,167,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div style={{ flex: 1 }}>
        <p
          style={{
            fontWeight: 800,
            color: "#575756",
            fontSize: "0.875rem",
            lineHeight: 1.3,
          }}
        >
          Instalação agendada com sucesso!
        </p>
        <p
          style={{
            color: "#6B7280",
            fontSize: "0.75rem",
            fontWeight: 600,
            marginTop: 2,
          }}
        >
          Equipe a caminho — hoje mesmo
        </p>
      </div>

      {/* Ping dot */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#00C9A7",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#00C9A7",
            animation: "ping 1.5s ease-out infinite",
          }}
        />
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes particleFloat {
          0%   { transform: translateY(0) scale(1); opacity: 0.3; }
          100% { transform: translateY(-30px) scale(1.5); opacity: 0.07; }
        }
        @keyframes speedBar {
          0%   { width: 0%; }
          100% { width: 96%; }
        }
        @keyframes notifFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes ping {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(40px) rotateY(-10deg); }
          to   { opacity: 1; transform: translateY(0) rotateY(0); }
        }
        .hero-left  { animation: heroReveal 0.7s ease both; }
        .hero-right { animation: cardReveal 0.85s 0.2s ease both; }
        .badge-reveal { animation: heroReveal 0.5s 0.05s ease both; }
        .title-reveal { animation: heroReveal 0.6s 0.15s ease both; }
        .sub-reveal   { animation: heroReveal 0.6s 0.25s ease both; }
        .cta-reveal   { animation: heroReveal 0.6s 0.35s ease both; }
        .trust-reveal { animation: heroReveal 0.6s 0.45s ease both; }
      `}</style>

      <section id="home"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #f0fdfb 45%, #e0faf5 100%)",
        }}
      >
        {/* Background orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-140px",
            right: "-140px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,201,167,0.11) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,201,167,0.07) 0%, transparent 70%)",
          }}
        />

        {mounted && <Particles />}

        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT */}
          <div className="hero-left">
            <div className="badge-reveal">
              <span
                className=" inline-flex items-center gap-2 text-white text-xs font-800 tracking-widest uppercase px-4 py-2 rounded-full mb-6"
                style={{
                  background: "linear-gradient(90deg, #00C9A7, #00DDB8)",
                  boxShadow: "0 4px 16px rgba(0,201,167,0.35)",
                }}
              >
                <span style={{ fontSize: 9 }}>✦</span>
                Instalação rápida na rua região
              </span>
            </div>

            <h1
              className="title-reveal  text-4xl md:text-5xl font-black leading-tight text-[#575756] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Internet rápida de verdade na sua casa{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9A7, #009E85)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                sem travar, sem estresse
              </span>{" "}
              e sem complicação
            </h1>

            <p className="sub-reveal text-muted font-600 text-lg leading-relaxed mb-8">
              Pare de perder tempo com internet lenta. <strong className="text-[#575756]">hipervelocidade</strong> ,
              estabilidade e suporte de verdade com a Siga Fibra.{" "}
              <strong className="text-[#575756]">
                Instalação rápida + planos acessíveis
              </strong>{" "}
              para você e sua família navegarem sem limites.
            </p>
                {/* bg-[#25D366] hover:bg-[#1ebe5a] */}
            <div className="cta-reveal">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white text-center font-900 font-semibold text-lg px-10 py-5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #25D366 0%, #25D366 100%)",
                  boxShadow:
                    "0 8px 32px #25D366, inset 0 1px 0 rgba(255,255,255,0.2)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 14px 42px #25D366, inset 0 1px 0 rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 32px #25D366, inset 0 1px 0 rgba(255,255,255,0.2)";
                }}
              >
                QUERO MINHA INTERNET RÁPIDA AGORA
              </a>
            </div>

            <div className="trust-reveal flex flex-wrap gap-5 mt-8">
              {[
                "Suporte humanizado",
                "Instalação rápida e fácil",
                "Planos sem pegadinhas",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-muted font-700 text-sm"
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#00C9A7,#00DDB8)",
                      flexShrink: 0,
                      boxShadow: "0 0 6px rgba(0,201,167,0.5)",
                    }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right" style={{ perspective: "1000px" }}>
            <SpeedCard3D />
            <FloatingNotification />
          </div>
        </div>
      </section>
    </>
  );
}

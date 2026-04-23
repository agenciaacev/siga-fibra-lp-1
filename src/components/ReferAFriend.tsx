import { useState } from "react";
import amigoIndicaForm from "../assets/regulamentoAmigoIndica.pdf"

type FormData = {
  // Quem indica (cliente atual)
  indicadorNome: string;
  indicadorCpf: string;
  indicadorTelefone: string;
  indicadorEmail: string;
  // Quem foi indicado
  indicadoNome: string;
  indicadoTelefone: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx2p3O7Z8-E1QlnMH5bLDHtqxJlsJJb9pMcbs3O2DWSVsnrYCZCKEUD7nUUonDhQcF4/execIIIII";

function maskPhone(value: string) {
  return value
    .replace(/\D/g, "") 
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
    .slice(0, 15);
}

function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

export default function AmigoIndica() {
  const [form, setForm] = useState<FormData>({
    indicadorNome: "",
    indicadorCpf: "",
    indicadorTelefone: "",
    indicadorEmail: "",
    indicadoNome: "",
    indicadoTelefone: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (field: keyof FormData, value: string) => {
    let formatted = value;
    if (field === "indicadorTelefone" || field === "indicadoTelefone") {
      formatted = maskPhone(value);
    }
    if (field === "indicadorCpf") {
      formatted = maskCpf(value);
    }
    setForm((prev) => ({ ...prev, [field]: formatted }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.indicadorNome.trim()) newErrors.indicadorNome = "Informe seu nome";
    if (!form.indicadorCpf.trim() || form.indicadorCpf.length < 14)
      newErrors.indicadorCpf = "CPF inválido";
    if (!form.indicadorTelefone.trim() || form.indicadorTelefone.length < 14)
      newErrors.indicadorTelefone = "Telefone inválido";
    if (!form.indicadorEmail.trim() || !/\S+@\S+\.\S+/.test(form.indicadorEmail))
      newErrors.indicadorEmail = "E-mail inválido";
    if (!form.indicadoNome.trim()) newErrors.indicadoNome = "Informe o nome do amigo";
    if (!form.indicadoTelefone.trim() || form.indicadoTelefone.length < 14)
      newErrors.indicadoTelefone = "Telefone inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      const payload = {
        indicadorNome: form.indicadorNome,
        indicadorCpf: form.indicadorCpf,
        indicadorTelefone: form.indicadorTelefone,
        indicadorEmail: form.indicadorEmail,
        indicadoNome: form.indicadoNome,
        indicadoTelefone: form.indicadoTelefone,
      };
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      setForm({
        indicadorNome: "",
        indicadorCpf: "",
        indicadorTelefone: "",
        indicadorEmail: "",
        indicadoNome: "",
        indicadoTelefone: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="amigo-indica"
      className="w-full py-20 px-4 font-['DM_Sans'] relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #E8F5F1 0%, #C8EDE3 30%, #B5E5D6 60%, #D8F2EB 100%)",
      }}
    >
      {/* Aurora — faixa única atravessando o componente */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aurora-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00C9A7" stopOpacity="0" />
            <stop offset="18%"  stopColor="#00B37E" stopOpacity="0.32" />
            <stop offset="50%"  stopColor="#00C4C0" stopOpacity="0.42" />
            <stop offset="82%"  stopColor="#00B37E" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#00C9A7" stopOpacity="0" />
          </linearGradient>
          <filter id="aurora-blur" x="-25%" y="-60%" width="150%" height="220%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>
        <path
          d="M-80,340 C120,210 340,480 620,310 C860,160 1060,430 1320,270 C1390,225 1430,275 1520,250
             L1520,480 C1430,510 1340,440 1100,490 C840,545 640,310 380,440 C140,545 -20,460 -80,490 Z"
          fill="url(#aurora-grad)"
          filter="url(#aurora-blur)"
        />
      </svg>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Label topo */}
        <div className="flex justify-center mb-4">
          <span className="bg-[#E0FAF2] text-[#00B37E] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
            Amigo Indica
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#575756] leading-tight">
            Indique um amigo e{" "}
            <span className="text-[#00B37E]">ganhe desconto de 100%</span>
          </h2>
          <p className="text-[#6B7C75] mt-3 text-base max-w-xl mx-auto leading-relaxed">
            Compartilhe a internet que funciona de verdade. Seu amigo assina e
            você recebe um desconto de 100% na sua fatura.
          </p>
        </div>

        {/* Steps visuais */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 mb-12 mt-8">
          {[
            { num: "01", label: "Preencha o formulário" },
            { num: "02", label: "Seu amigo assina" },
            { num: "03", label: "Você ganha o desconto" },
          ].map((step, i) => (
            <div key={step.num} className="flex items-center gap-2 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00B37E] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {step.num}
                </div>
                <span className="text-sm font-medium text-[#2D4A3E]">{step.label}</span>
              </div>
              {i < 2 && (
                <div className="hidden sm:block w-10 h-px bg-[#C4E8DB] mx-4 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Texto para download do PDF */}
        <p className="text-center text-sm text-[#6B7C75] mt-4 mb-8">
          Quer saber mais sobre como funciona esse benefício?{" "}
          <a
            href={amigoIndicaForm}
            download
            className="text-[#00B37E] underline hover:text-[#009E6E] transition-colors"
          >
            Clique aqui para saber mais
          </a>
        </p>

        {/* Card do formulário */}
        <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,179,126,0.08)] border border-[#E8F5F0] overflow-hidden">

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#EEF7F3]">

            {/* Coluna esquerda: Quem indica */}
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E0FAF2] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B37E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#00B37E] font-semibold uppercase tracking-wider">Seus dados</p>
                  <h3 className="text-base font-bold text-[#575756]">Quem está indicando</h3>
                </div>
              </div>

              <div className="space-y-4">
                <Field
                  label="Nome completo"
                  placeholder="Seu nome"
                  value={form.indicadorNome}
                  error={errors.indicadorNome}
                  onChange={(v) => handleChange("indicadorNome", v)}
                />
                <Field
                  label="CPF"
                  placeholder="000.000.000-00"
                  value={form.indicadorCpf}
                  error={errors.indicadorCpf}
                  onChange={(v) => handleChange("indicadorCpf", v)}
                  inputMode="numeric"
                />
                <Field
                  label="WhatsApp / Telefone"
                  placeholder="(00) 00000-0000"
                  value={form.indicadorTelefone}
                  error={errors.indicadorTelefone}
                  onChange={(v) => handleChange("indicadorTelefone", v)}
                  inputMode="tel"
                />
                <Field
                  label="E-mail"
                  placeholder="seu@email.com"
                  value={form.indicadorEmail}
                  error={errors.indicadorEmail}
                  onChange={(v) => handleChange("indicadorEmail", v)}
                  type="email"
                />
              </div>
            </div>

            {/* Coluna direita: Quem é indicado */}
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E0FAF2] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B37E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#00B37E] font-semibold uppercase tracking-wider">Dados do amigo</p>
                  <h3 className="text-base font-bold text-[#575756]">Quem está sendo indicado</h3>
                </div>
              </div>

              <div className="space-y-4">
                <Field
                  label="Nome completo"
                  placeholder="Nome do amigo"
                  value={form.indicadoNome}
                  error={errors.indicadoNome}
                  onChange={(v) => handleChange("indicadoNome", v)}
                />
                <Field
                  label="WhatsApp / Telefone"
                  placeholder="(00) 00000-0000"
                  value={form.indicadoTelefone}
                  error={errors.indicadoTelefone}
                  onChange={(v) => handleChange("indicadoTelefone", v)}
                  inputMode="tel"
                />
              </div>

              {/* Info box */}
              <div className="mt-6 bg-[#F0FDF8] border border-[#C4E8DB] rounded-2xl p-4">
                <div className="flex gap-3">
                  <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B37E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-xs text-[#2D4A3E] leading-relaxed">
                    Assim que seu amigo assinar um plano Siga Fibra, você será notificado por e-mail com as instruções para resgatar o seu desconto.
                  </p>
                </div>
              </div>

              {/* Botão */}
              <div className="mt-6">
                {status === "success" ? (
                  <div className="flex items-center gap-3 bg-[#E0FAF2] text-[#00804A] rounded-2xl px-6 py-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="font-semibold text-sm">Indicação enviada com sucesso!</span>
                  </div>
                ) : status === "error" ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-red-50 text-red-600 rounded-2xl px-6 py-4 text-sm font-medium">
                      Erro ao enviar. Tente novamente.
                    </div>
                    <SubmitButton onClick={handleSubmit} loading={false} />
                  </div>
                ) : (
                  <SubmitButton onClick={handleSubmit} loading={status === "loading"} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé da seção */}
        <p className="text-center text-xs text-[#9BB5AB] mt-6">
          Ao enviar, você concorda com os termos e condições do programa Amigo Indica Siga Fibra.
        </p>
      </div>
    </section>
  );
}

// Componente de campo reutilizável
interface FieldProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
}

function Field({ label, placeholder, value, error, onChange, type = "text", inputMode }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#2D4A3E] tracking-wide">
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-3 rounded-xl text-sm text-[#0F2E24] placeholder-[#AABFB8]
          border transition-all duration-200 outline-none font-['DM_Sans']
          ${error
            ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
            : "border-[#D4EBE2] bg-[#F7FAF9] focus:border-[#00B37E] focus:bg-white focus:ring-2 focus:ring-[#00B37E]/20"
          }
        `}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}

// Botão de submit
function SubmitButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        w-full py-4 px-6 rounded-2xl font-bold text-sm text-white
        bg-[#00B37E] hover:bg-[#009E6E] active:scale-[0.98]
        transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,179,126,0.3)]
        font-['DM_Sans']
      "
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          Enviando...
        </>
      ) : (
        <>
          Enviar indicação
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </>
      )}
    </button>
  );
}

import { Ban, KeyRound, Layers, Lock, Scale, Server, ShieldCheck } from "lucide-react";

// Condensed from Condo-Admin-Tool's own LegalModal.tsx ("Seguridad y protección de datos") —
// real, already-true claims about the product, not generic marketing copy.
const POINTS = [
  { icon: Layers, title: "Aislamiento por condominio", copy: "La información de cada condominio está completamente separada de la de cualquier otro — nadie ve datos que no son de su propia comunidad." },
  { icon: KeyRound, title: "Contraseñas nunca en texto plano", copy: "Se almacenan con funciones de hash seguras diseñadas para contraseñas, y el acceso está controlado según el rol de cada persona." },
  { icon: Lock, title: "Conexión siempre cifrada", copy: "Toda la comunicación entre tu dispositivo y nuestros servidores viaja cifrada (HTTPS), igual que hacia la base de datos." },
  { icon: Server, title: "Infraestructura confiable", copy: "Alojado sobre proveedores de nube reconocidos por su seguridad y disponibilidad, con respaldos periódicos de la información." },
  { icon: Ban, title: "No vendemos tus datos", copy: "No compartimos ni vendemos tu información personal a terceros con fines publicitarios — se usa únicamente para operar el servicio." },
  { icon: Scale, title: "Tus derechos, respetados", copy: "Conforme a la Ley 8968 de Costa Rica, podés acceder, rectificar, cancelar y oponerte al uso de tus datos personales cuando quieras." },
];

export function Security() {
  return (
    <section id="seguridad" className="mx-auto max-w-[1100px] px-5 py-20">
      <div className="mx-auto mb-12 max-w-[620px] text-center">
        <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Seguridad</span>
        <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">La protección de tus datos, en cada parte</h2>
        <p className="mt-3 inline-flex items-start gap-2 rounded-[12px] bg-primary-soft px-4 py-3 text-left text-[12px] font-bold leading-relaxed text-primary">
          <ShieldCheck size={18} className="mt-0.5 shrink-0" />
          Es una prioridad en cómo construimos Livva, no un agregado posterior.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
        {POINTS.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-2xl border border-border bg-surface p-6">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-[10px] bg-primary-soft text-primary"><Icon size={20} /></div>
            <h3 className="mb-1.5 text-[14px] font-extrabold text-text">{title}</h3>
            <p className="text-[12px] leading-relaxed text-text-muted">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

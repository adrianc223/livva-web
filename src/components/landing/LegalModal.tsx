"use client";

import { Lock, ShieldCheck, X } from "lucide-react";

type LegalTopic = "terms" | "security";
type LegalModalProps = { topic: LegalTopic; onClose: () => void };

// Ported verbatim from Condo-Admin-Tool's own src/components/dashboard/LegalModal.tsx (the
// modal the app itself already shows from its Footer) — same content, adapted to this repo's
// pure-Tailwind convention (no legacy `.row-action` class here) instead of a design rewrite.
const sectionTitleClass = "mb-1.5 mt-5 text-[13px] font-extrabold text-text first:mt-0";
const paragraphClass = "mb-2.5 text-[11px] leading-[1.6] text-text-muted";
const listClass = "mb-2.5 grid gap-1 pl-4 text-[11px] leading-[1.6] text-text-muted [list-style:disc]";

function TermsContent() {
  return (
    <div>
      <p className={paragraphClass}>
        Última actualización: septiembre de 2026. Al usar Livva como administrador, residente, propietario, inquilino o
        comercio afiliado, aceptas los siguientes términos.
      </p>

      <h3 className={sectionTitleClass}>1. Descripción del servicio</h3>
      <p className={paragraphClass}>
        Livva es una plataforma de administración de condominios que permite gestionar unidades y residentes, cuotas y
        comprobantes de pago, anuncios, reservas de amenidades, mensajería interna y un marketplace de comercios operados
        por residentes. Livva facilita estos procesos, pero no es parte de la relación entre el condominio y sus
        residentes, ni entre un comercio y sus clientes.
      </p>

      <h3 className={sectionTitleClass}>2. Cuentas y roles</h3>
      <p className={paragraphClass}>
        Cada persona usa Livva bajo un rol: administrador (gestiona el condominio), propietario o inquilino de una unidad
        (residente), o comercio afiliado. El administrador de tu condominio es responsable de crear y gestionar las
        cuentas de residentes e inquilinos; eres responsable de mantener segura tu contraseña y de toda actividad
        realizada desde tu cuenta.
      </p>

      <h3 className={sectionTitleClass}>3. Uso aceptable</h3>
      <ul className={listClass}>
        <li>No publiques contenido falso, difamatorio, discriminatorio o que infrinja derechos de terceros en anuncios, mensajes o el marketplace.</li>
        <li>No uses la plataforma para actividades fraudulentas o ilegales.</li>
        <li>No intentes acceder a información de otro condominio o de otra cuenta sin autorización.</li>
      </ul>

      <h3 className={sectionTitleClass}>4. Cuotas, pagos y el marketplace</h3>
      <p className={paragraphClass}>
        El registro de cuotas y comprobantes de pago dentro de Livva es una herramienta de gestión entre el residente y
        su condominio — Livva no procesa ni custodia esos fondos. De igual forma, las transacciones entre un comercio
        afiliado y sus clientes se acuerdan directamente entre ellos; Livva únicamente facilita el contacto y la
        publicación de productos o servicios.
      </p>

      <h3 className={sectionTitleClass}>5. Contenido generado por el usuario</h3>
      <p className={paragraphClass}>
        Conservas la propiedad del contenido que publiques (anuncios, mensajes, productos del marketplace), pero nos
        otorgas el derecho de mostrarlo dentro de la plataforma a quienes correspondan según tu condominio y rol. Un
        administrador puede revisar, aprobar o retirar publicaciones de comercios y productos.
      </p>

      <h3 className={sectionTitleClass}>6. Privacidad y protección de datos</h3>
      <p className={paragraphClass}>
        El tratamiento de tus datos personales se describe en la sección de <strong>Seguridad</strong> de este mismo
        sitio, que forma parte de estos términos.
      </p>

      <h3 className={sectionTitleClass}>7. Suspensión y terminación</h3>
      <p className={paragraphClass}>
        Un administrador puede suspender o eliminar el acceso de un residente, inquilino o comercio de su condominio
        (por ejemplo, cuando un inquilino deja la unidad). El dueño de la plataforma puede suspender un condominio
        completo por incumplimiento de estos términos o falta de pago del servicio, sin que esto elimine los datos ya
        registrados salvo que se solicite expresamente.
      </p>

      <h3 className={sectionTitleClass}>8. Limitación de responsabilidad</h3>
      <p className={paragraphClass}>
        Livva se ofrece &ldquo;tal cual&rdquo;. Hacemos nuestro mejor esfuerzo por mantener el servicio disponible y
        preciso, pero no garantizamos que esté libre de interrupciones o errores, y no somos responsables por acuerdos,
        pagos o disputas entre residentes, administradores o comercios.
      </p>

      <h3 className={sectionTitleClass}>9. Cambios a estos términos</h3>
      <p className={paragraphClass}>Podemos actualizar estos términos conforme evolucione la plataforma. Los cambios importantes se anunciarán dentro de la aplicación.</p>

      <h3 className={sectionTitleClass}>10. Contacto</h3>
      <p className={paragraphClass}>
        Si tienes dudas sobre estos términos, contacta a la administración de tu condominio o escríbenos a{" "}
        <strong>soporte@livvaadmin.info</strong>.
      </p>
    </div>
  );
}

function SecurityContent() {
  return (
    <div>
      <div className="mb-4 flex items-start gap-2.5 rounded-[13px] bg-primary-soft px-4 py-3 text-[11px] leading-[1.6] font-bold text-primary">
        <ShieldCheck size={16} className="mt-0.5 shrink-0" />
        Procuramos la protección de tus datos en todo momento — es una prioridad en cada parte de cómo construimos
        Livva, no un agregado posterior.
      </div>

      <h3 className={sectionTitleClass}>Aislamiento de datos por condominio</h3>
      <p className={paragraphClass}>
        La información de cada condominio (unidades, residentes, cuotas, mensajes, anuncios) está estrictamente
        separada de la de cualquier otro condominio en la plataforma. Un administrador o residente solo puede ver los
        datos del condominio al que pertenece.
      </p>

      <h3 className={sectionTitleClass}>Contraseñas y acceso</h3>
      <p className={paragraphClass}>
        Las contraseñas nunca se guardan en texto plano — se almacenan mediante funciones de hash seguras diseñadas
        específicamente para contraseñas. El acceso a cada sección de la aplicación está controlado según tu rol
        (administrador, propietario, inquilino o comercio), y un inquilino nunca tiene acceso a la información
        financiera del propietario de su unidad.
      </p>

      <h3 className={sectionTitleClass}>Conexión cifrada</h3>
      <p className={paragraphClass}>
        Toda la comunicación entre tu dispositivo y nuestros servidores viaja cifrada (HTTPS), igual que la conexión
        entre nuestros servidores y la base de datos.
      </p>

      <h3 className={sectionTitleClass}>Infraestructura</h3>
      <p className={paragraphClass}>
        Livva se aloja sobre proveedores de infraestructura en la nube reconocidos por sus prácticas de seguridad y
        disponibilidad, con respaldos periódicos de la información.
      </p>

      <h3 className={sectionTitleClass}>Retención y eliminación</h3>
      <p className={paragraphClass}>
        Cuando un condominio, residente o inquilino deja la plataforma, su acceso se revoca de inmediato. Antes de
        eliminar los datos de un condominio de forma permanente, se conserva un respaldo por un período razonable,
        disponible únicamente para el dueño de la plataforma en caso de ser necesario para fines de soporte o
        cumplimiento.
      </p>

      <h3 className={sectionTitleClass}>No vendemos tus datos</h3>
      <p className={paragraphClass}>
        No compartimos ni vendemos tu información personal a terceros con fines publicitarios. Tus datos se usan
        únicamente para operar el servicio dentro de tu condominio.
      </p>

      <h3 className={sectionTitleClass}>Tus derechos</h3>
      <p className={paragraphClass}>
        De acuerdo con la Ley N.° 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales de
        Costa Rica, tienes derecho a acceder, rectificar, cancelar y oponerte al uso de tus datos personales. Puedes
        ejercer estos derechos a través de la administración de tu condominio o escribiéndonos directamente.
      </p>

      <div className="mt-4 flex items-start gap-2.5 rounded-[13px] border border-border px-4 py-3 text-[11px] leading-[1.6] text-text-muted">
        <Lock size={16} className="mt-0.5 shrink-0" />
        ¿Preguntas sobre privacidad o seguridad? Escríbenos a <strong>soporte@livvaadmin.info</strong>.
      </div>
    </div>
  );
}

export function LegalModal({ topic, onClose }: LegalModalProps) {
  const title = topic === "terms" ? "Términos y condiciones" : "Seguridad y protección de datos";

  return (
    <div
      className="fixed inset-0 z-30 grid place-items-center bg-[rgba(27,34,29,0.42)] p-5 backdrop-blur-[5px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[85vh] w-[min(100%,640px)] flex-col overflow-hidden rounded-[17px] border border-border bg-surface shadow-[0_22px_70px_rgba(25,35,28,0.22)]">
        <div className="flex items-center justify-between gap-3 border-b border-border px-[26px] py-5">
          <h2 className="m-0 text-lg tracking-[-0.5px] text-text" id="legal-modal-title">{title}</h2>
          <button
            className="grid place-items-center rounded-full p-1.5 text-text-muted hover:bg-surface-muted"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-[26px] py-5">{topic === "terms" ? <TermsContent /> : <SecurityContent />}</div>
      </div>
    </div>
  );
}

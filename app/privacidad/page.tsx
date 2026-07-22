import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad | Miracle",
  description: "Información sobre el tratamiento de datos personales en Miracle.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de privacidad"
      intro="Esta política explica qué datos trata Miracle en esta versión de la web, para qué los utiliza y cómo puedes ejercer tus derechos."
    >
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable es el proyecto cultural Miracle, con correo de contacto y ejercicio de derechos en{" "}
          <a href="mailto:info@miraclebgo.com">info@miraclebgo.com</a>.
        </p>
        <p>
          Esta es una versión provisional de la web. La identificación legal y el domicilio profesional del
          responsable se completarán antes de activar ventas o contratación online.
        </p>
      </section>

      <section>
        <h2>2. Datos que tratamos</h2>
        <ul>
          <li>Newsletter: la dirección de correo electrónico facilitada voluntariamente.</li>
          <li>
            Checkout de prueba: los datos introducidos se mantienen únicamente durante la sesión en el navegador y
            no se envían a Miracle ni se genera un pedido real.
          </li>
          <li>
            Carrito: los artículos seleccionados se guardan localmente en el navegador para mantener la bolsa de
            compra.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalidades y legitimación</h2>
        <p>
          Utilizamos el email para gestionar la suscripción y enviar novedades sobre eventos, drops y actividades de
          Miracle. La base jurídica es el consentimiento que otorgas al enviar el formulario. Puedes retirarlo en
          cualquier momento escribiendo al email de contacto o utilizando el enlace de baja de las comunicaciones.
        </p>
      </section>

      <section>
        <h2>4. Conservación</h2>
        <p>
          El email se conservará mientras mantengas la suscripción o hasta que solicites su supresión, sin perjuicio de
          los periodos estrictamente necesarios para atender obligaciones legales o acreditar el consentimiento.
        </p>
      </section>

      <section>
        <h2>5. Proveedores y transferencias</h2>
        <p>
          La newsletter se gestiona mediante Brevo, que trata el email como proveedor tecnológico por cuenta de
          Miracle. Cuando un proveedor trate datos fuera del Espacio Económico Europeo, el tratamiento se realizará
          con las garantías reconocidas por la normativa aplicable y conforme a sus condiciones de protección de
          datos.
        </p>
      </section>

      <section>
        <h2>6. Tus derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad, así como retirar el
          consentimiento, escribiendo a <a href="mailto:info@miraclebgo.com">info@miraclebgo.com</a>. Para evitar que
          otra persona actúe en tu nombre, podremos pedir información razonable para verificar tu identidad.
        </p>
        <p>
          Si consideras que el tratamiento incumple la normativa, puedes presentar una reclamación ante la Agencia
          Española de Protección de Datos en <a href="https://www.aepd.es">aepd.es</a>.
        </p>
      </section>

      <section>
        <h2>7. Cookies y almacenamiento local</h2>
        <p>
          En esta versión no utilizamos cookies publicitarias ni herramientas de analítica propias. El carrito emplea
          almacenamiento local estrictamente funcional en tu dispositivo. Si en el futuro incorporamos analítica,
          publicidad u otras tecnologías no esenciales, actualizaremos esta política y, cuando corresponda,
          solicitaremos consentimiento.
        </p>
      </section>

      <section>
        <h2>8. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta información cuando cambien la web, sus servicios o la normativa. La fecha de la
          versión vigente se muestra al inicio de la página.
        </p>
      </section>
    </LegalPage>
  );
}

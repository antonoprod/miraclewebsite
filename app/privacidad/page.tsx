import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Información sobre el tratamiento de datos personales en Miracle.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de privacidad"
      intro="Esta política explica qué datos trata Miracle al usar la web, suscribirte o realizar una compra, para qué los utiliza y cómo puedes ejercer tus derechos."
    >
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable es el proyecto cultural Miracle, con correo de contacto y ejercicio de derechos en{" "}
          <a href="mailto:info@miraclebgo.com">info@miraclebgo.com</a>.
        </p>
        <ul>
          <li>Responsable: Antonio Villagrasa.</li>
          <li>NIF: 48409522L.</li>
          <li>Domicilio profesional: Av de la Huerta 35, Alboraya.</li>
        </ul>
      </section>

      <section>
        <h2>2. Datos que tratamos</h2>
        <ul>
          <li>Newsletter: la dirección de correo electrónico facilitada voluntariamente.</li>
          <li>
            Compra: nombre, email, teléfono, dirección de envío, código postal, productos, variantes, importes y datos
            necesarios para gestionar el pedido, la entrega, devoluciones y atención posventa.
          </li>
          <li>
            Carrito: los artículos seleccionados se guardan localmente en el navegador para mantener la bolsa de
            compra.
          </li>
          <li>
            Pago: Stripe procesa los datos de pago. Miracle no recibe ni almacena los datos completos de la tarjeta.
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
        <p>
          Los datos de compra se tratan para ejecutar el contrato, entregar el pedido, atender devoluciones y cumplir
          obligaciones contables, fiscales, de consumo y prevención del fraude.
        </p>
      </section>

      <section>
        <h2>4. Conservación</h2>
        <p>
          El email se conservará mientras mantengas la suscripción o hasta que solicites su supresión, sin perjuicio de
          los periodos estrictamente necesarios para atender obligaciones legales o acreditar el consentimiento.
        </p>
        <p>
          Los datos de pedidos y facturación se conservarán durante los plazos exigidos por la normativa aplicable. Los
          datos de una compra de Sandbox se utilizan únicamente para verificar técnicamente el flujo de pago.
        </p>
      </section>

      <section>
        <h2>5. Proveedores y transferencias</h2>
        <p>
          La newsletter se gestiona mediante Brevo, que trata el email como proveedor tecnológico por cuenta de
          Miracle. Stripe procesa el pago y los datos asociados al Checkout. También podrán intervenir proveedores de
          hosting, correo y transporte en la medida necesaria para prestar el servicio.
        </p>
        <p>
          Cuando un proveedor trate datos fuera del Espacio Económico Europeo, el tratamiento se realizará con las
          garantías reconocidas por la normativa aplicable. No vendemos datos personales.
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

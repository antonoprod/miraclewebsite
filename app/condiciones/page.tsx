import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Condiciones de uso | Miracle",
  description: "Condiciones aplicables al acceso y uso de la web de Miracle.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Condiciones de uso"
      intro="Estas condiciones regulan el acceso a la versión provisional de la web de Miracle y describen el alcance actual de sus contenidos y funcionalidades."
    >
      <section>
        <h2>1. Titular y contacto</h2>
        <p>
          Esta web corresponde al proyecto cultural Miracle. Puedes contactar en{" "}
          <a href="mailto:info@miraclebgo.com">info@miraclebgo.com</a>.
        </p>
        <p>
          La identidad legal completa y el domicilio profesional se incorporarán antes de habilitar cualquier venta o
          contratación online.
        </p>
      </section>

      <section>
        <h2>2. Objeto de la web</h2>
        <p>
          La web informa sobre eventos, proyectos culturales y productos asociados a Miracle. Puedes navegar por sus
          contenidos y suscribirte voluntariamente a la newsletter.
        </p>
      </section>

      <section>
        <h2>3. Tienda y checkout provisional</h2>
        <p>
          La sección Shop y el checkout son actualmente una demostración. No existe una pasarela de pago activa, no se
          realiza ningún cobro y la confirmación de un pedido de prueba no crea una compraventa, reserva ni obligación
          de entrega.
        </p>
        <p>
          Los productos, precios, disponibilidad y gastos de envío que aparecen tienen carácter informativo y podrán
          cambiar antes de activar la tienda. No envíes datos de pago a través de ningún formulario o canal no
          habilitado expresamente por Miracle.
        </p>
      </section>

      <section>
        <h2>4. Futuras ventas</h2>
        <p>
          Antes de aceptar compras reales publicaremos las condiciones de contratación aplicables, incluyendo la
          identidad del vendedor, precios e impuestos, formas de pago, zonas y costes de envío, entrega, garantía,
          devoluciones, derecho de desistimiento y atención posventa. También se solicitará la aceptación expresa de
          esas condiciones antes de pagar.
        </p>
      </section>

      <section>
        <h2>5. Uso responsable</h2>
        <p>Al utilizar la web te comprometes a:</p>
        <ul>
          <li>No emplearla para actividades ilícitas, fraudulentas o que perjudiquen a terceros.</li>
          <li>No interferir en su funcionamiento ni intentar acceder a sistemas o datos sin autorización.</li>
          <li>No introducir contenido malicioso mediante formularios u otros medios.</li>
        </ul>
      </section>

      <section>
        <h2>6. Propiedad intelectual</h2>
        <p>
          Los textos, fotografías, diseños, marcas, logotipos y demás contenidos pertenecen a Miracle o se utilizan
          con autorización de sus titulares. No pueden reproducirse, distribuirse o explotarse con fines comerciales
          sin permiso previo, salvo en los casos permitidos por la ley.
        </p>
      </section>

      <section>
        <h2>7. Disponibilidad y enlaces</h2>
        <p>
          Procuramos mantener la información disponible y actualizada, pero esta versión puede contener errores,
          interrupciones o funcionalidades incompletas. Los enlaces a servicios externos se facilitan como referencia;
          sus titulares son responsables de sus propios contenidos y condiciones.
        </p>
      </section>

      <section>
        <h2>8. Responsabilidad</h2>
        <p>
          Nada en estas condiciones limita los derechos que la normativa reconoce a consumidores y usuarios. Miracle
          no responde de daños derivados de un uso contrario a estas condiciones, de actuaciones de terceros o de
          incidencias técnicas fuera de su control razonable.
        </p>
      </section>

      <section>
        <h2>9. Legislación aplicable</h2>
        <p>
          Estas condiciones se interpretan conforme a la legislación española. Cualquier controversia se someterá a
          los juzgados que correspondan legalmente, respetando en todo caso el fuero aplicable a consumidores y
          usuarios.
        </p>
      </section>
    </LegalPage>
  );
}

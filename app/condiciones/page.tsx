import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Condiciones de compra y uso",
  description: "Condiciones aplicables a las compras y al uso de la web de Miracle.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Condiciones de compra y uso"
      intro="Estas condiciones regulan la compra de productos Miracle, los envíos, las devoluciones y el uso de la web."
    >
      <section>
        <h2>1. Titular y contacto</h2>
        <p>
          Esta web y su tienda corresponden al proyecto cultural Miracle, gestionado por una persona trabajadora
          autónoma. Puedes contactar antes y después de la compra en{" "}
          <a href="mailto:info@miraclebgo.com">info@miraclebgo.com</a>.
        </p>
        <ul>
          <li>Titular: Antonio Villagrasa.</li>
          <li>NIF: 48409522L.</li>
          <li>Domicilio profesional: Av de la Huerta 35, Alboraya.</li>
        </ul>
      </section>

      <section>
        <h2>2. Objeto de la web</h2>
        <p>
          La web informa sobre eventos, proyectos culturales y productos asociados a Miracle. Puedes navegar por sus
          contenidos y suscribirte voluntariamente a la newsletter.
        </p>
      </section>

      <section>
        <h2>3. Productos, precios y pedido</h2>
        <p>
          Las características, variantes, disponibilidad y precio de cada producto se muestran antes de añadirlo a la
          bolsa. Los precios se expresan en euros e incluyen los impuestos aplicables. Los gastos de envío se calculan
          según el código postal y se muestran antes de acceder al pago.
        </p>
        <p>
          Antes de pagar podrás revisar productos, variantes, cantidades, subtotal, envío y total. El pedido se
          considera aceptado cuando Stripe confirma el pago y se muestra la página de confirmación.
        </p>
      </section>

      <section>
        <h2>4. Pago</h2>
        <p>
          El pago se procesa en el Checkout seguro alojado por Stripe. Miracle no recibe ni almacena los datos
          completos de la tarjeta. Hasta que se activen las claves de producción, el Checkout estará identificado como
          entorno de prueba y no efectuará cargos reales.
        </p>
      </section>

      <section>
        <h2>5. Envíos y entrega</h2>
        <ul>
          <li>España peninsular: 4,90 €.</li>
          <li>Baleares: 7,90 €.</li>
          <li>Canarias, Ceuta y Melilla: no disponibles actualmente.</li>
          <li>Gorras disponibles: entrega estimada de 2–4 días laborables.</li>
          <li>Camiseta Miracle x Nicaso: preventa con producción estimada de 3–5 semanas, más transporte.</li>
        </ul>
        <p>
          Si un pedido combina productos disponibles y productos en preventa, se enviará completo cuando la preventa
          esté preparada. Los plazos son estimaciones y comunicaremos cualquier retraso relevante.
        </p>
      </section>

      <section>
        <h2>6. Desistimiento y devoluciones</h2>
        <p>
          Puedes desistir de una compra online dentro de los 14 días naturales siguientes a la recepción, sin
          necesidad de justificar la decisión. Comunícalo por escrito a{" "}
          <a href="mailto:info@miraclebgo.com">info@miraclebgo.com</a>, indicando nombre, número de pedido, productos y
          la decisión inequívoca de desistir.
        </p>
        <p>
          Los productos deben devolverse sin uso y con sus elementos originales. El cliente asume el coste directo de
          la devolución, salvo error de Miracle o producto defectuoso. Reembolsaremos los importes legalmente
          correspondientes mediante el mismo medio de pago, pudiendo retener el reembolso hasta recibir los bienes o
          una prueba de su devolución.
        </p>
        <p>
          La fabricación en lotes de la camiseta Nicaso no elimina el derecho de desistimiento, salvo que una unidad se
          confeccione conforme a especificaciones individuales o esté claramente personalizada.
        </p>
      </section>

      <section>
        <h2>7. Productos defectuosos y garantía</h2>
        <p>
          Si el producto llega dañado, es incorrecto o presenta una falta de conformidad, escríbenos cuanto antes con
          el número de pedido y fotografías. Aplicaremos la garantía legal vigente para bienes nuevos, sin limitar los
          derechos de reparación, sustitución, reducción del precio o resolución que correspondan.
        </p>
      </section>

      <section>
        <h2>8. Disponibilidad y cancelaciones</h2>
        <p>
          El stock se valida de nuevo antes de crear el pago. Si excepcionalmente no pudiéramos servir un pedido ya
          pagado, lo comunicaremos y reembolsaremos sin demora el importe correspondiente. En preventas informaremos
          de cambios sustanciales en el plazo y ofreceremos la cancelación cuando legalmente proceda.
        </p>
      </section>

      <section>
        <h2>9. Uso responsable y propiedad intelectual</h2>
        <p>
          No puedes utilizar la web de forma ilícita, fraudulenta, perjudicial o que interfiera con su funcionamiento.
          Los textos, fotografías, diseños, marcas y logotipos pertenecen a Miracle o se utilizan con autorización y
          no pueden explotarse comercialmente sin permiso, salvo los usos permitidos por la ley.
        </p>
      </section>

      <section>
        <h2>10. Legislación aplicable</h2>
        <p>
          Estas condiciones se interpretan conforme a la legislación española. Cualquier controversia se someterá a
          los juzgados que correspondan legalmente, respetando en todo caso el fuero aplicable a consumidores y
          usuarios.
        </p>
      </section>
    </LegalPage>
  );
}

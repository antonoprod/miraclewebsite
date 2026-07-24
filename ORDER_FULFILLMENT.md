# Gestión de pedidos

Stripe será el registro operativo de los pedidos durante esta primera etapa. No
es necesario mantener otro panel ni duplicar datos personales.

## Flujo

1. Un pago confirmado crea una transacción en Stripe.
2. El webhook establece `fulfillment_status` como `preparing` en los metadatos
   del pago.
3. Miracle recibe por correo los productos, variantes, cantidades y dirección.
4. Al entregar el paquete al transportista, se edita el pago en Stripe:
   - `fulfillment_status`: `shipped`
   - `shipping_carrier`: nombre del transportista
   - `tracking_number`: número de seguimiento
   - `shipped_at`: fecha en formato `AAAA-MM-DD`
5. Si un pedido se cancela o reembolsa, se usa:
   - `fulfillment_status`: `cancelled` o `refunded`

## Cómo actualizar un pedido

1. En Stripe, abrir **Transacciones**.
2. Buscar el pago por correo del cliente, importe o identificador.
3. Abrir el pago y localizar **Metadatos**.
4. Pulsar **Editar** y actualizar los campos anteriores.

No se deben guardar direcciones, teléfonos, documentos de identidad ni datos
de tarjeta en los metadatos. Esa información ya está protegida en el detalle
del pago y en el correo de pedido.

## Estados permitidos

- `awaiting_payment`: Checkout creado, todavía sin confirmar.
- `preparing`: pago confirmado; pedido pendiente de preparar o producir.
- `shipped`: entregado al transportista.
- `cancelled`: cancelado antes del envío.
- `refunded`: importe reembolsado.

Stripe y Brevo deben revisarse durante los primeros pedidos para confirmar que
el webhook, el aviso por correo y el stock funcionan correctamente.

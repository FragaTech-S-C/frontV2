import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../../../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Editar evento" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<form id="event-edit-form" class="box"> <label>
T\xEDtulo
<input name="title" value="Meetup de comunidad" required> </label> <label>
Descripci\xF3n
<textarea name="description" rows="4">Evento de prueba para la edici\xF3n de datos.</textarea> </label> <label>
Ubicaci\xF3n
<input name="location" value="CABA" required> </label> <label>
Fecha de inicio
<input name="startDate" type="datetime-local" value="2026-11-12T19:00"> </label> <button class="btn" type="submit">Guardar cambios</button> <p id="event-edit-status" aria-live="polite"></p> </form> <script type="module">
    import { api } from '@/lib/api';

    const form = document.getElementById('event-edit-form');
    const status = document.getElementById('event-edit-status');
    const eventId = window.location.pathname.split('/').filter(Boolean)[1];

    form?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);

      try {
        await api.createEvent({
          title: String(formData.get('title') ?? ''),
          description: String(formData.get('description') ?? ''),
          location: String(formData.get('location') ?? ''),
          startDate: String(formData.get('startDate') ?? new Date().toISOString()),
          eventId,
        });
        status.textContent = 'Evento actualizado correctamente.';
      } catch (error) {
        status.textContent = error instanceof Error ? error.message : 'No se pudo actualizar el evento.';
      }
    });
  <\/script> `])), maybeRenderHead()) })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/events/[id]/edit.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/events/[id]/edit.astro";
const $$url = "/events/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

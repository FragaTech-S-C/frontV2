import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Reports = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Reportes" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<section class="box"> <h2>Crear reporte</h2> <form id="report-form"> <label>
Tipo
<select name="targetType"> <option value="event">Evento</option> <option value="group">Grupo</option> <option value="user">Usuario</option> <option value="comment">Comentario</option> </select> </label> <label>
ID del objetivo
<input name="targetId" value="demo-target" required> </label> <label>
Asunto
<input name="subject" placeholder="Violaci\xF3n de normas, spam, etc." required> </label> <label>
Detalle
<textarea name="message" rows="5" placeholder="Describ\xED el problema..." required></textarea> </label> <button class="btn" type="submit">Enviar reporte</button> </form> <p id="report-status" aria-live="polite"></p> </section> <script type="module">
    import { api } from '@/lib/api';

    const form = document.getElementById('report-form');
    const status = document.getElementById('report-status');

    form?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const payload = {
        reporterId: 'local-user',
        targetType: String(formData.get('targetType') ?? 'event'),
        targetId: String(formData.get('targetId') ?? 'demo-target'),
        subject: String(formData.get('subject') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
      };

      try {
        await api.createReport(payload);
        status.textContent = 'Reporte enviado correctamente.';
        form.reset();
      } catch (error) {
        status.textContent = error instanceof Error ? error.message : 'No se pudo enviar el reporte.';
      }
    });
  <\/script> `])), maybeRenderHead()) })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/reports.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/reports.astro";
const $$url = "/reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reports,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

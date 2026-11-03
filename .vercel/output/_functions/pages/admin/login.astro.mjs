import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Acceso administrador" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<form id="admin-login-form" class="box"> <h2>Ingreso de administrador</h2> <label>
Email
<input name="email" type="email" placeholder="admin@meetia.com" required> </label> <label>
Contrase\xF1a
<input name="password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required> </label> <button class="btn" type="submit">Ingresar</button> <p id="admin-login-status" aria-live="polite"></p> </form> <script type="module">
    import { api } from '@/lib/api';

    const form = document.getElementById('admin-login-form');
    const status = document.getElementById('admin-login-status');

    form?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const email = String(formData.get('email') ?? '').trim();
      const password = String(formData.get('password') ?? '').trim();

      try {
        const result = await api.adminLogin({ email, password });
        status.textContent = 'Sesi\xF3n de administrador iniciada correctamente.';
        window.location.href = '/dashboard';
      } catch (error) {
        status.textContent = error instanceof Error ? error.message : 'No se pudo iniciar sesi\xF3n como administrador.';
      }
    });
  <\/script> `])), maybeRenderHead()) })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/admin/login.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AuthLayout } from '../../../chunks/AuthLayout_7W31p4bj.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Callback = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Iniciando sesi\xF3n" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="box" style="max-width:420px; margin: 2rem auto;"> <h2>Finalizando acceso</h2> <p id="google-status">Procesando tu sesión con Google...</p> </div> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/auth/google/callback.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/auth/google/callback.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/auth/google/callback.astro";
const $$url = "/auth/google/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Callback,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

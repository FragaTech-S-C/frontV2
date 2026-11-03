import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_7W31p4bj.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "P\xE1gina no encontrada" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>La dirección no existe o fue movida.</p> <a class="btn" href="/dashboard">Volver al dashboard</a> ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/404.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

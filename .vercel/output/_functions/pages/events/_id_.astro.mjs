import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../../chunks/AppLayout_BuD1tO0P.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  Astro2.params.id ?? "evento";
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Evento", "data-astro-cid-xoscxyy6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="event-detail-shell" class="box" data-astro-cid-xoscxyy6> <p data-astro-cid-xoscxyy6>Cargando evento...</p> </div> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/events/[id].astro?astro&type=script&index=0&lang.ts")}  ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/events/[id].astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/events/[id].astro";
const $$url = "/events/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

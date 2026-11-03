import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Mis grupos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="row"> <a class="btn" href="/groups/new">Nuevo grupo</a> <a class="btn out" href="/dashboard">Volver</a> </div> <div id="groups-list" class="grid"></div> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/index.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/index.astro";
const $$url = "/groups";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

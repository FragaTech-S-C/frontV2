import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../../chunks/AppLayout_BuD1tO0P.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$id = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Grupo", "data-astro-cid-5j6k2vdu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="group-shell" data-astro-cid-5j6k2vdu></div> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/[id].astro?astro&type=script&index=0&lang.ts")}  ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/[id].astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/[id].astro";
const $$url = "/groups/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

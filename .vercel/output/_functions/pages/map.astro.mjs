import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../renderers.mjs';

const $$Map = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Mapa" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="box"> <h2>Mapa de eventos</h2> <div id="osm-map" style="height: 520px; width: 100%; border-radius: 16px; overflow: hidden;"></div> </section> <iframe id="osm-map" title="Mapa de eventos en Buenos Aires" src="https://www.openstreetmap.org/export/embed.html?bbox=-58.5200%2C-34.7000%2C-58.2600%2C-34.4800&layer=mapnik&marker=-34.6037%2C-58.3816" style="height: 520px; width: 100%; border: 0; border-radius: 16px;" loading="lazy"></iframe> ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/map.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/map.astro";
const $$url = "/map";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Map,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

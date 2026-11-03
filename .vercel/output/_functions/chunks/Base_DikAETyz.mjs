import { e as createComponent, p as renderHead, o as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} · Meetia</title>${renderHead()}</head> <body>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/layouts/Base.astro", void 0);

export { $$Base as $ };

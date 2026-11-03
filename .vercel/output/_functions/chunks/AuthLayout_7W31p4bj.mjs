import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, o as renderSlot } from './astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$Base } from './Base_DikAETyz.mjs';

const $$Astro = createAstro();
const $$AuthLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthLayout;
  const { title } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="auth"> <section class="box"> <h1>${title}</h1> ${renderSlot($$result2, $$slots["default"])} </section> </main> ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/layouts/AuthLayout.astro", void 0);

export { $$AuthLayout as $ };

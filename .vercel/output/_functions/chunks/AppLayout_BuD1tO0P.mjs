import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, o as renderSlot, l as renderScript } from './astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$Base } from './Base_DikAETyz.mjs';

const $$Astro = createAstro();
const $$AppLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AppLayout;
  const { title } = Astro2.props;
  const path = Astro2.url.pathname;
  const links = [
    ["/", "Home"],
    ["/groups", "Grupos"],
    ["/dashboard", "Dashboard"],
    ["/search", "Buscar"],
    ["/invitations", "Invitaciones"],
    ["/profile", "Perfil"]
  ];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="app"> <nav class="nav" aria-label="Principal"> <span class="brand">Meetia</span> ${links.map(([href, label]) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute(path.startsWith(href) ? "page" : void 0, "aria-current")}>${label}</a>`)} <button id="logout-button" type="button" class="btn out">Cerrar sesión</button> </nav> <main class="main"> <h1>${title}</h1> ${renderSlot($$result2, $$slots["default"])} </main> </div> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/layouts/AppLayout.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/layouts/AppLayout.astro", void 0);

export { $$AppLayout as $ };

import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../../renderers.mjs';

const $$Friends = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Amigos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="friend-form" class="row"> <input id="friend-email" class="grow" aria-label="Añadir amigo" placeholder="Buscar por email"> <button class="btn" type="submit" id="add-friend-submit">Añadir amigo</button> </form> <div id="friend-status" class="box" style="display:none; margin-bottom:1rem;"></div> <div class="box"> <h3>Amigos</h3> <div id="friends-list"></div> </div> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/profile/friends.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/profile/friends.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/profile/friends.astro";
const $$url = "/profile/friends";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Friends,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

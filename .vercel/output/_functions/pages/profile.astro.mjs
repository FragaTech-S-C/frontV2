import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Mi perfil" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="profile-form" class="box"> <div class="ph" id="profile-avatar" style="max-width:120px;min-height:120px;display:grid;place-items:center;">Avatar</div> <label>Nombre<input id="firstName" name="firstName"></label> <label>Apellido<input id="lastName" name="lastName"></label> <label>Nickname<input id="nickname" name="nickname"></label> <label>Email<input id="email" name="email" type="email" readonly></label> <label>Teléfono<input id="phone" name="phone" type="tel" placeholder="Opcional"></label> <label>Foto de perfil<input id="avatar-file" name="avatar-file" type="file" accept="image/*"></label> <label>URL opcional<input id="avatar-url" name="avatar-url" type="url" placeholder="https://..."></label> <h3>Intereses</h3> <div class="ph">Categorías seleccionables</div> <div class="row"> <button class="btn" type="submit">Guardar cambios</button> <a class="btn out" href="/reset-password">Restablecer contraseña</a> <a class="btn out" href="/profile/friends">Ver amigos</a> </div> <p id="profile-status" aria-live="polite"></p> </form> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/profile/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/profile/index.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/profile/index.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

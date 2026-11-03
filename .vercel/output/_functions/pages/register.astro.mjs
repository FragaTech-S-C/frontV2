import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, l as renderScript } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_7W31p4bj.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Crear cuenta" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="register-form" class="box" style="border:0;padding:0;background:none"> <label>Nombre<input name="firstName" required></label> <label>Apellido<input name="lastName" required></label> <label>Nickname<input name="nickname" required></label> <label>Email<input type="email" name="email" required></label> <label>Contraseña<input type="password" name="password" required></label> <label>Rol
<select name="role"> <option value="NORMAL_USER">Personal</option> <option value="INSTITUTIONAL_USER">Institucional</option> <!-- <option value="ADMIN">Administrador</option> <-- Se asigna manualmente --> </select> </label> <button class="btn" type="submit">Registrarme</button> <a class="btn out"${addAttribute(`${"http://localhost:3000/api"}/auth/google` , "href")}>Registrarme con Google</a> <p id="register-status" aria-live="polite"></p> <p>¿Ya tenés cuenta? <a href="/login">Iniciá sesión</a></p> </form> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/register.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/register.astro", void 0);
const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

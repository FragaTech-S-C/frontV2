import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, l as renderScript } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_7W31p4bj.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Iniciar sesión" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="login-form" class="box" style="border:0;padding:0;background:none"> <label>Email<input type="email" name="email" required></label> <label>Contraseña<input type="password" name="password" required></label> <button class="btn" type="submit">Entrar</button> <a class="btn out"${addAttribute(`${"http://localhost:3000/api"}/auth/google` , "href")}>Continuar con Google</a> <a class="btn out" href="/reset-password">Olvidé mi contraseña</a> <p id="login-status" aria-live="polite"></p> <p>¿No tenés cuenta? <a href="/register">Registrate</a></p> </form> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/login.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/login.astro", void 0);
const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

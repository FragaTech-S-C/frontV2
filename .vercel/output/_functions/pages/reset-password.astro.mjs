import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_7W31p4bj.mjs';
export { renderers } from '../renderers.mjs';

const $$ResetPassword = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Restablecer contrase\xF1a" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="box" style="border:0;padding:0;background:none;max-width:30rem;margin:0 auto;"> <h2>Restablecer contraseña</h2> <form id="request-reset-form" style="display:flex;flex-direction:column;gap:0.85rem;"> <label>
Enviar token al email registrado
<input type="email" name="email" placeholder="tu@email.com" required> </label> <button name="sendToken" class="btn" type="submit">Enviar token</button> </form> <form id="confirm-reset-form" style="display:flex;flex-direction:column;gap:0.85rem;margin-top:1.5rem;"> <!-- <label>
        Email
        <input type="email" name="email" placeholder="tu@email.com" required />
      </label> --> <label>
Token recibido por email
<input type="text" name="token" placeholder="Código de verificación" required> </label> <label>
Nueva contraseña
<input type="password" name="newPassword" minlength="8" placeholder="Mínimo 8 caracteres" required> </label> <label>
Repetir nueva contraseña
<input type="password" name="confirmPassword" minlength="8" placeholder="Repetir contraseña" required> </label> <button class="btn" type="submit">Guardar nueva contraseña</button> </form> <p id="reset-status" aria-live="polite" style="margin-top:1rem; min-height:1.5rem;"></p> <p style="margin-top:1rem;"><a href="/login">Volver al inicio de sesión</a></p> </div> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/reset-password.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/reset-password.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/reset-password.astro";
const $$url = "/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ResetPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

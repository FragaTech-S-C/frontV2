import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../../renderers.mjs';

const $$New = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Nuevo grupo" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="group-form" class="box"> <label>Nombre<input name="name" required></label> <label>Descripción<textarea name="description" rows="4"></textarea></label> <div class="row"> <label class="grow">Tipo
<select name="type"> <option value="personal">Personal</option> <option value="institutional">Institucional</option> </select> </label> <!-- <label class="grow">Líder<input name="leader" value="Yo" readonly /></label> --> </div> <div id="group-institutional-fields" style="display:none;"> <label>Institución asociada
<select name="institutionId"> <option value="">Seleccioná una institución</option> </select> </label> </div> <div class="box" style="padding:0.75rem; margin:0.75rem 0;"> <label>
Buscar miembro por nick
<input id="member-search" type="search" placeholder="Ej: ana, mate, lu" autocomplete="off"> </label> <div id="member-results" style="display:grid; gap:0.5rem; margin-top:0.5rem;"></div> <div id="selected-members" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.75rem;"></div> </div> <div class="row"> <button class="btn" type="submit">Crear grupo</button> <a class="btn out" href="/groups">Cancelar</a> </div> <p id="group-status" aria-live="polite"></p> </form> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/new.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/new.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/groups/new.astro";
const $$url = "/groups/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, l as renderScript, h as createAstro, k as renderComponent } from '../../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../../chunks/AppLayout_BuD1tO0P.mjs';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$EventForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EventForm;
  const { cancelHref = "/dashboard" } = Astro2.props;
  const categoryOptions = [
    { value: "CONFERENCE", label: "Conferencia" },
    { value: "WORKSHOP", label: "Taller" },
    { value: "MEETING", label: "Reuni\xF3n" },
    { value: "SOCIAL", label: "Social" },
    { value: "SPORTS", label: "Deportivo" },
    { value: "CULTURAL", label: "Cultural" },
    { value: "EDUCATIONAL", label: "Educativo" },
    { value: "NETWORKING", label: "Networking" },
    { value: "OTHER", label: "Otros" }
  ];
  const visibilityOptions = [
    { value: "PUBLIC", label: "P\xFAblico" },
    { value: "INSTITUTION", label: "Instituci\xF3n" },
    { value: "GROUP", label: "Grupo" },
    { value: "PRIVATE", label: "Privado" }
  ];
  const provinceOptions = [
    "CABA",
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "C\xF3rdoba",
    "Corrientes",
    "Entre R\xEDos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuqu\xE9n",
    "R\xEDo Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucum\xE1n"
  ];
  return renderTemplate`${maybeRenderHead()}<form id="event-form" class="box"> <label>Título<input name="title" required></label> <label>Descripción<textarea name="description" rows="4"></textarea></label> <div class="row"> <label class="grow">Inicio<input type="datetime-local" name="startDate" required></label> <label class="grow">Fin<input type="datetime-local" name="endDate"></label> </div> <div class="row"> <label class="grow">Categoría
<select name="category"> ${categoryOptions.map(({ value, label }) => renderTemplate`<option${addAttribute(value, "value")}>${label}</option>`)} </select> </label> <label class="grow">Visibilidad
<select name="visibility"> ${visibilityOptions.map(({ value, label }) => renderTemplate`<option${addAttribute(value, "value")}>${label}</option>`)} </select> </label> </div> <div class="row"> <label class="grow">HQ<input name="location" placeholder="Roque Sáenz Peña"></label> <label class="grow">Provincia
<select name="province"> <option value="">Seleccioná una provincia</option> ${provinceOptions.map((province) => renderTemplate`<option${addAttribute(province, "value")}>${province}</option>`)} </select> </label> </div> <div id="institutional-event-fields" style="display:none;"> <div class="row"> <label class="grow">Institución asociada
<select name="institutionId"> <option value="">Seleccioná una institución</option> </select> </label> <label class="grow">Máx. asistentes<input type="number" name="maxAttendees" min="0" value="0"></label> </div> <div class="row"> <label class="grow">Etiquetas<input name="tags" placeholder="tech,networking"></label> <label class="grow">¿Es gratis?<select name="isFree"><option value="true">Sí</option><option value="false">No</option></select></label> </div> <label id="price-field-wrapper" class="grow" style="display:none;">Precio<input type="number" name="price" min="0" step="0.01" placeholder="0.00"></label> <label>Página web<input type="url" name="website"></label> <label>URL de inscripción<input type="url" name="registrationUrl"></label> </div> <label>Imagen del evento<input type="url" name="coverImage" placeholder="https://example.com/cover.jpg"></label> <div class="ph" id="event-status" style="display:none"></div> <div class="row"> <button class="btn" type="submit">Guardar evento</button> <a class="btn out"${addAttribute(cancelHref, "href")}>Cancelar</a> </div> </form> ${renderScript($$result, "/home/ray/Desktop/nmeetia/frontV2/src/components/EventForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/components/EventForm.astro", void 0);

const $$New = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Nuevo evento" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "EventForm", $$EventForm, {})}` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/events/new.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/events/new.astro";
const $$url = "/events/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../chunks/AppLayout_BuD1tO0P.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const $$Invitations = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Invitaciones", "data-astro-cid-t72gkpsi": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="box" data-astro-cid-t72gkpsi> <h2 data-astro-cid-t72gkpsi>Solicitudes de amistad</h2> <div id="friend-request-list" class="invite-list" data-astro-cid-t72gkpsi></div> </section> <section class="box" data-astro-cid-t72gkpsi> <h2 data-astro-cid-t72gkpsi>Invitaciones a eventos</h2> <div id="event-invitation-list" class="invite-list" data-astro-cid-t72gkpsi></div> </section> ${renderScript($$result2, "/home/ray/Desktop/nmeetia/frontV2/src/pages/invitations.astro?astro&type=script&index=0&lang.ts")}  ` })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/invitations.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/invitations.astro";
const $$url = "/invitations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Invitations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

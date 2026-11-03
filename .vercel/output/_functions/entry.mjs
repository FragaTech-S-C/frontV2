import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_ZtdhZJVW.mjs';
import { manifest } from './manifest_Cra6fdox.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin.astro.mjs');
const _page4 = () => import('./pages/auth/google/callback.astro.mjs');
const _page5 = () => import('./pages/dashboard.astro.mjs');
const _page6 = () => import('./pages/events/new.astro.mjs');
const _page7 = () => import('./pages/events/_id_/edit.astro.mjs');
const _page8 = () => import('./pages/events/_id_/route.astro.mjs');
const _page9 = () => import('./pages/events/_id_.astro.mjs');
const _page10 = () => import('./pages/groups/new.astro.mjs');
const _page11 = () => import('./pages/groups/_id_.astro.mjs');
const _page12 = () => import('./pages/groups.astro.mjs');
const _page13 = () => import('./pages/invitations.astro.mjs');
const _page14 = () => import('./pages/login.astro.mjs');
const _page15 = () => import('./pages/map.astro.mjs');
const _page16 = () => import('./pages/profile/friends.astro.mjs');
const _page17 = () => import('./pages/profile.astro.mjs');
const _page18 = () => import('./pages/recommendations.astro.mjs');
const _page19 = () => import('./pages/register.astro.mjs');
const _page20 = () => import('./pages/reports.astro.mjs');
const _page21 = () => import('./pages/reset-password.astro.mjs');
const _page22 = () => import('./pages/reviews.astro.mjs');
const _page23 = () => import('./pages/search.astro.mjs');
const _page24 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/index.astro", _page3],
    ["src/pages/auth/google/callback.astro", _page4],
    ["src/pages/dashboard.astro", _page5],
    ["src/pages/events/new.astro", _page6],
    ["src/pages/events/[id]/edit.astro", _page7],
    ["src/pages/events/[id]/route.astro", _page8],
    ["src/pages/events/[id].astro", _page9],
    ["src/pages/groups/new.astro", _page10],
    ["src/pages/groups/[id].astro", _page11],
    ["src/pages/groups/index.astro", _page12],
    ["src/pages/invitations.astro", _page13],
    ["src/pages/login.astro", _page14],
    ["src/pages/map.astro", _page15],
    ["src/pages/profile/friends.astro", _page16],
    ["src/pages/profile/index.astro", _page17],
    ["src/pages/recommendations.astro", _page18],
    ["src/pages/register.astro", _page19],
    ["src/pages/reports.astro", _page20],
    ["src/pages/reset-password.astro", _page21],
    ["src/pages/reviews.astro", _page22],
    ["src/pages/search.astro", _page23],
    ["src/pages/index.astro", _page24]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "626f2de8-cf6d-4034-86e5-7744fe2a777e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };

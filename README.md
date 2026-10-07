# Meetia — Layouts en Astro

Un archivo `.astro` por ruta, con la misma estructura de baja fidelidad del lienzo.

```bash
npm install
npm run dev
```

| Archivo | Ruta |
|---|---|
| login.astro | /login |
| register.astro | /register |
| dashboard.astro | /dashboard |
| search.astro | /search |
| recommendations.astro | /recommendations |
| events/new.astro | /events/new |
| events/[id]/index.astro | /events/:id |
| events/[id]/edit.astro | /events/:id/edit |
| events/[id]/route.astro | /events/:id/route |
| groups/index.astro | /groups |
| groups/new.astro | /groups/new |
| groups/[id].astro | /groups/:id |
| profile/index.astro | /profile |
| profile/friends.astro | /profile/friends |
| invitations.astro | /invitations |
| 404.astro | * |

Las rutas con `[id]` usan `getStaticPaths` con ids de ejemplo; al conectar el backend se reemplaza por render en servidor.

import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_RLqGsNZ3.mjs';
import 'piccolore';
import { $ as $$AppLayout } from '../chunks/AppLayout_BuD1tO0P.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Reviews = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Rese\xF1as" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<section class="box"> <h2>Dejar rese\xF1a</h2> <form id="review-form"> <label>
Evento ID
<input name="eventId" value="event-demo-1" required> </label> <label>
Usuario ID
<input name="userId" value="local-user" required> </label> <label>
Calificaci\xF3n
<select name="rating"> <option value="5">5 - Excelente</option> <option value="4">4 - Muy bueno</option> <option value="3">3 - Bueno</option> <option value="2">2 - Regular</option> <option value="1">1 - Malo</option> </select> </label> <label>
Comentario
<textarea name="comment" rows="4" placeholder="Contanos c\xF3mo fue tu experiencia..."></textarea> </label> <button class="btn" type="submit">Publicar rese\xF1a</button> </form> <p id="review-status" aria-live="polite"></p> </section> <section class="box"> <h2>Rese\xF1as recientes</h2> <div id="review-list"></div> </section> <script type="module">
    import { api } from '@/lib/api';

    const reviewForm = document.getElementById('review-form');
    const reviewStatus = document.getElementById('review-status');
    const reviewList = document.getElementById('review-list');

    const renderReviews = async () => {
      try {
        const reviews = await api.getReviews('event-demo-1');
        if (!reviews.length) {
          reviewList.innerHTML = '<p>A\xFAn no hay rese\xF1as para este evento.</p>';
          return;
        }

        reviewList.innerHTML = reviews.map((review) => \`
          <article class="review-item">
            <strong>\${'\u2605'.repeat(Number(review.rating))}\${'\u2606'.repeat(5 - Number(review.rating))}</strong>
            <p>\${review.comment || 'Sin comentario.'}</p>
            <small>Usuario: \${review.userId}</small>
          </article>
        \`).join('');
      } catch (error) {
        reviewList.innerHTML = '<p>No se pudieron cargar las rese\xF1as.</p>';
      }
    };

    reviewForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(reviewForm);
      const payload = {
        eventId: String(formData.get('eventId') ?? 'event-demo-1'),
        userId: String(formData.get('userId') ?? 'local-user'),
        rating: Number(formData.get('rating') ?? 5),
        comment: String(formData.get('comment') ?? '').trim(),
      };

      try {
        await api.createReview(payload);
        reviewStatus.textContent = 'Rese\xF1a guardada correctamente.';
        reviewForm.reset();
        await renderReviews();
      } catch (error) {
        reviewStatus.textContent = error instanceof Error ? error.message : 'No se pudo guardar la rese\xF1a.';
      }
    });

    renderReviews();
  <\/script> `], [" ", `<section class="box"> <h2>Dejar rese\xF1a</h2> <form id="review-form"> <label>
Evento ID
<input name="eventId" value="event-demo-1" required> </label> <label>
Usuario ID
<input name="userId" value="local-user" required> </label> <label>
Calificaci\xF3n
<select name="rating"> <option value="5">5 - Excelente</option> <option value="4">4 - Muy bueno</option> <option value="3">3 - Bueno</option> <option value="2">2 - Regular</option> <option value="1">1 - Malo</option> </select> </label> <label>
Comentario
<textarea name="comment" rows="4" placeholder="Contanos c\xF3mo fue tu experiencia..."></textarea> </label> <button class="btn" type="submit">Publicar rese\xF1a</button> </form> <p id="review-status" aria-live="polite"></p> </section> <section class="box"> <h2>Rese\xF1as recientes</h2> <div id="review-list"></div> </section> <script type="module">
    import { api } from '@/lib/api';

    const reviewForm = document.getElementById('review-form');
    const reviewStatus = document.getElementById('review-status');
    const reviewList = document.getElementById('review-list');

    const renderReviews = async () => {
      try {
        const reviews = await api.getReviews('event-demo-1');
        if (!reviews.length) {
          reviewList.innerHTML = '<p>A\xFAn no hay rese\xF1as para este evento.</p>';
          return;
        }

        reviewList.innerHTML = reviews.map((review) => \\\`
          <article class="review-item">
            <strong>\\\${'\u2605'.repeat(Number(review.rating))}\\\${'\u2606'.repeat(5 - Number(review.rating))}</strong>
            <p>\\\${review.comment || 'Sin comentario.'}</p>
            <small>Usuario: \\\${review.userId}</small>
          </article>
        \\\`).join('');
      } catch (error) {
        reviewList.innerHTML = '<p>No se pudieron cargar las rese\xF1as.</p>';
      }
    };

    reviewForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(reviewForm);
      const payload = {
        eventId: String(formData.get('eventId') ?? 'event-demo-1'),
        userId: String(formData.get('userId') ?? 'local-user'),
        rating: Number(formData.get('rating') ?? 5),
        comment: String(formData.get('comment') ?? '').trim(),
      };

      try {
        await api.createReview(payload);
        reviewStatus.textContent = 'Rese\xF1a guardada correctamente.';
        reviewForm.reset();
        await renderReviews();
      } catch (error) {
        reviewStatus.textContent = error instanceof Error ? error.message : 'No se pudo guardar la rese\xF1a.';
      }
    });

    renderReviews();
  <\/script> `])), maybeRenderHead()) })}`;
}, "/home/ray/Desktop/nmeetia/frontV2/src/pages/reviews.astro", void 0);

const $$file = "/home/ray/Desktop/nmeetia/frontV2/src/pages/reviews.astro";
const $$url = "/reviews";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reviews,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

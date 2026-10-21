import '../styles/tasks.css';

// Valores que usa el backend (enums de Prisma) y su etiqueta en español.
export const TASK_STATUS: Record<string, string> = {
  TODO: 'Por hacer',
  IN_PROGRESS: 'En progreso',
  IN_REVIEW: 'En revisión',
  DONE: 'Hecha',
  BLOCKED: 'Bloqueada',
  CANCELLED: 'Cancelada',
};

export const TASK_PRIORITY: Record<string, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

const CLOSED_STATUSES = ['DONE', 'CANCELLED'];

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (char) => ESCAPES[char]);

export const getStoredToken = () =>
  localStorage.getItem('meetia-access-token') ??
  localStorage.getItem('accessToken') ??
  localStorage.getItem('access_token') ??
  '';

// Cliente mínimo con el token del usuario. Lanza Error con el mensaje del backend.
export const createApi = (apiBase: string) => {
  const base = String(apiBase || '').replace(/\/+$/, '');

  return async (path: string, options: RequestInit = {}): Promise<any> => {
    const token = getStoredToken();
    if (!token) {
      window.location.href = '/login';
      throw new Error('Necesitás iniciar sesión.');
    }

    const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
    if (options.body) headers['Content-Type'] = 'application/json';

    const response = await fetch(`${base}${path}`, { ...options, headers });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = Array.isArray(payload?.message) ? payload.message.join(', ') : payload?.message;
      throw new Error(message || payload?.error || 'La solicitud falló.');
    }
    return payload;
  };
};

export type TaskApi = ReturnType<typeof createApi>;

export const personName = (user: any) =>
  [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.name || user?.email || 'Sin nombre';

const formatDue = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const isOverdue = (task: any) =>
  Boolean(task.dueDate) &&
  !CLOSED_STATUSES.includes(task.status) &&
  new Date(task.dueDate).getTime() < Date.now();

// Abiertas primero, luego por fecha límite (las sin fecha al final), luego las más nuevas.
export const sortTasks = (tasks: any[]) =>
  [...tasks].sort((a, b) => {
    const aClosed = CLOSED_STATUSES.includes(a.status) ? 1 : 0;
    const bClosed = CLOSED_STATUSES.includes(b.status) ? 1 : 0;
    if (aClosed !== bClosed) return aClosed - bClosed;

    const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
    if (aDue !== bDue) return aDue - bDue;

    return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
  });

export const renderTaskCard = (task: any, options: { showEvent?: boolean } = {}) => {
  const status = String(task.status ?? 'TODO');
  const priority = String(task.priority ?? 'MEDIUM');
  const overdue = isOverdue(task);
  const tags: string[] = Array.isArray(task.tags) ? task.tags : [];

  const statusOptions = Object.entries(TASK_STATUS)
    .map(([value, label]) => `<option value="${value}" ${value === status ? 'selected' : ''}>${label}</option>`)
    .join('');

  const meta: string[] = [];
  if (task.assignee) meta.push(`<span>Responsable: <strong>${esc(personName(task.assignee))}</strong></span>`);
  if (task.creator) meta.push(`<span>Creada por ${esc(personName(task.creator))}</span>`);
  if (task.dueDate) {
    meta.push(
      `<span class="${overdue ? 'task-overdue' : ''}">Vence: ${esc(formatDue(task.dueDate))}${overdue ? ' · Vencida' : ''}</span>`,
    );
  }
  if (task.estimatedHours != null) meta.push(`<span>Estimado: ${esc(task.estimatedHours)} h</span>`);
  if (options.showEvent && task.event?.title) {
    meta.push(`<a href="/events/${esc(task.eventId ?? task.event.id)}">Evento: ${esc(task.event.title)}</a>`);
  }

  return `
    <article class="task-card task-priority-${esc(priority)} ${CLOSED_STATUSES.includes(status) ? 'task-card--closed' : ''}">
      <div class="task-card__head">
        <strong class="task-card__title">${esc(task.title)}</strong>
        <span class="tag">${esc(TASK_PRIORITY[priority] ?? priority)}</span>
      </div>
      ${task.description ? `<p class="task-card__desc">${esc(task.description)}</p>` : ''}
      <div class="task-card__meta">${meta.join('')}</div>
      ${tags.length ? `<div class="task-card__tags">${tags.map((tag) => `<span class="tag secondary">${esc(tag)}</span>`).join('')}</div>` : ''}
      <div class="task-card__actions">
        <select data-task-status="${esc(task.id)}" aria-label="Estado de la tarea">${statusOptions}</select>
        <button class="btn out" type="button" data-task-delete="${esc(task.id)}">Eliminar</button>
      </div>
    </article>`;
};

// Cambio de estado y borrado por delegación de eventos sobre el contenedor de la lista.
export const bindTaskActions = (
  container: HTMLElement,
  options: {
    api: TaskApi;
    onChange: () => Promise<void> | void;
    setStatus: (message: string, isError?: boolean) => void;
  },
) => {
  const { api, onChange, setStatus } = options;

  container.addEventListener('change', async (event) => {
    const select = (event.target as HTMLElement).closest('[data-task-status]') as HTMLSelectElement | null;
    if (!select) return;

    try {
      setStatus('Actualizando tarea...');
      await api(`/tasks/${select.dataset.taskStatus}`, {
        method: 'PUT',
        body: JSON.stringify({ status: select.value }),
      });
      setStatus('Tarea actualizada.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo actualizar la tarea.', true);
    }
    await onChange();
  });

  container.addEventListener('click', async (event) => {
    const button = (event.target as HTMLElement).closest('[data-task-delete]') as HTMLElement | null;
    if (!button) return;
    if (!window.confirm('¿Eliminar esta tarea?')) return;

    try {
      await api(`/tasks/${button.dataset.taskDelete}`, { method: 'DELETE' });
      setStatus('Tarea eliminada.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo eliminar la tarea.', true);
    }
    await onChange();
  });
};

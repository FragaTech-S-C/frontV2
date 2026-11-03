/**
 * Format an ISO date string as DD-MM-YYYY (Argentina style).
 */
export function formatDate(value?: string | null): string {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Format an ISO date-time string as DD/MM/YYYY HH:MM.
 */
export function formatDateTime(value?: string | null): string {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Build a human-readable location string from event fields.
 */
export function formatLocation(event: {
  location?: string | null;
  venueName?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
}): string {
  const parts = [
    event.venueName,
    event.location,
    event.address,
    event.city,
    event.country,
  ].filter(Boolean) as string[];
  return parts.length ? parts.join(' · ') : 'Sin ubicación';
}

/**
 * Normalise an event object coming from the backend or from a search payload wrapper.
 */
export function normalizeEvent(raw: Record<string, unknown>): Record<string, unknown> {
  const e = (raw?.event ?? raw) as Record<string, unknown>;
  return {
    ...e,
    id: e.id ?? e._id,
    title: (e.title ?? e.name ?? 'Evento sin título') as string,
    category: (e.category ?? e.type ?? 'Evento') as string,
    startDate: (e.startDate ?? e.start_date ?? e.date ?? null) as string | null,
    endDate: (e.endDate ?? e.end_date ?? null) as string | null,
    coverImage: (e.coverImage ?? e.cover_image ?? e.bannerImage ?? e.banner_image ?? null) as string | null,
    location: (e.location ?? e.venue ?? null) as string | null,
    venueName: (e.venueName ?? null) as string | null,
    city: (e.city ?? null) as string | null,
    country: (e.country ?? null) as string | null,
    address: (e.address ?? e.street ?? null) as string | null,
  };
}

export function normalizeEvents(payload: unknown): Array<Record<string, unknown>> {
  const items = Array.isArray(payload)
    ? payload
    : ((payload as Record<string, unknown>)?.events ??
       (payload as Record<string, unknown>)?.data ??
       []) as unknown[];
  return (items as Array<Record<string, unknown>>).map(normalizeEvent).filter(Boolean);
}

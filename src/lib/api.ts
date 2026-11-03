// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type AuthPayload = {
  accessToken?: string;
  refreshToken?: string;
  user?: Record<string, unknown>;
  [key: string]: unknown;
};

// ─────────────────────────────────────────────────────────────────────────────
// Base URL
// ─────────────────────────────────────────────────────────────────────────────

export function getApiBaseUrl(): string {
  const runtimeApiBaseUrl =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.PUBLIC_API_URL ?? import.meta.env.BACKEND_URL)
      : typeof process !== 'undefined'
        ? (process.env.PUBLIC_API_URL ?? process.env.BACKEND_URL)
        : undefined;

  if (!runtimeApiBaseUrl) {
    throw new Error('Missing PUBLIC_API_URL or BACKEND_URL environment variable.');
  }

  return String(runtimeApiBaseUrl).replace(/\/+$/, '');
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth storage helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getStoredAuth(): AuthPayload | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('meetia-auth');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthPayload;
  } catch {
    return null;
  }
}

export function setStoredAuth(auth: AuthPayload | null): void {
  if (typeof window === 'undefined') return;
  if (!auth) { clearStoredAuth(); return; }

  localStorage.setItem('meetia-auth', JSON.stringify(auth));

  const accessToken = auth.accessToken ?? auth.access_token ?? auth.token ?? auth.jwt;
  const refreshToken = auth.refreshToken ?? auth.refresh_token ?? auth.refresh;

  if (accessToken) localStorage.setItem('meetia-access-token', String(accessToken));
  if (refreshToken) localStorage.setItem('meetia-refresh-token', String(refreshToken));
}

export function clearStoredAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('meetia-auth');
  localStorage.removeItem('meetia-access-token');
  localStorage.removeItem('meetia-refresh-token');
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  const stored = getStoredAuth();
  const fromStore = stored
    ? (stored.accessToken ?? stored.access_token ?? stored.token ?? stored.jwt ?? null)
    : null;
  return (
    (fromStore as string | null) ??
    localStorage.getItem('meetia-access-token') ??
    localStorage.getItem('accessToken') ??
    localStorage.getItem('access_token') ??
    null
  );
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  const stored = getStoredAuth();
  const fromStore = stored
    ? (stored.refreshToken ?? stored.refresh_token ?? stored.refresh ?? null)
    : null;
  return (
    (fromStore as string | null) ??
    localStorage.getItem('meetia-refresh-token') ??
    localStorage.getItem('refreshToken') ??
    localStorage.getItem('refresh_token') ??
    null
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal fetch helpers
// ─────────────────────────────────────────────────────────────────────────────

async function jsonOrText(response: Response): Promise<unknown> {
  const ct = response.headers.get('content-type') ?? '';
  return ct.includes('application/json') ? response.json() : response.text();
}

function authHeaders(extra?: Record<string, string>): Record<string, string> {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

function bearerHeaders(extra?: Record<string, string>): Record<string, string> {
  const token = getAccessToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

function extractError(data: unknown, fallback: string): string {
  if (typeof data === 'string') return data;
  const d = data as Record<string, unknown>;
  return String(d?.message ?? d?.error ?? fallback);
}

async function apiFetch(url: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(url, init);
  const data = await jsonOrText(response);
  if (!response.ok) throw new Error(extractError(data, 'Error en la solicitud.'));
  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────────────────────

export const api = {
  // ── Auth ────────────────────────────────────────────────────────────────────

  login: async (credentials: { email: string; password: string; twoFactorCode?: string }) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const payload = await jsonOrText(response);
    if (!response.ok) throw new Error(extractError(payload, 'No se pudo iniciar sesión.'));
    setStoredAuth(payload as AuthPayload);
    return payload;
  },

  register: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await jsonOrText(response);
    if (!response.ok) throw new Error(extractError(data, 'No se pudo registrar al usuario.'));
    setStoredAuth(data as AuthPayload);
    return data;
  },

  authMe: async () => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/auth/me`, { headers: bearerHeaders() });
  },

  refresh: async (refreshToken: string) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${refreshToken}` },
    });
    const data = await jsonOrText(response);
    if (!response.ok) throw new Error(extractError(data, 'No se pudo refrescar la sesión.'));
    setStoredAuth(data as AuthPayload);
    return data;
  },

  logout: async () => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
    const data = await jsonOrText(response);
    if (!response.ok) throw new Error(extractError(data, 'No se pudo cerrar sesión.'));
    clearStoredAuth();
    return data;
  },

  resetPassword: async (payload: { currentPassword: string; newPassword: string }) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  // ── Users ────────────────────────────────────────────────────────────────────

  me: async () => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/users/me`, { headers: bearerHeaders() });
  },

  updateProfile: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/users/me`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  searchUsers: async (email: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/users/search?email=${encodeURIComponent(email)}`, {
      headers: bearerHeaders(),
    });
  },

  // ── Events ───────────────────────────────────────────────────────────────────

  getEvents: async (params: Record<string, string | number | undefined> = {}) => {
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== '') search.append(k, String(v));
    }
    const baseUrl = getApiBaseUrl();
    const query = search.toString();
    return apiFetch(`${baseUrl}/events/find${query ? `?${query}` : ''}`, {
      headers: bearerHeaders(),
    });
  },

  getUpcomingEvents: async (limit = 12) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/events/upcoming?limit=${limit}`, {
      headers: bearerHeaders(),
    });
  },

  getEventById: async (id: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/events/${id}`, { headers: bearerHeaders() });
  },

  createEvent: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/events/create`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  updateEvent: async (id: string, payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/events/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  deleteEvent: async (id: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/events/${id}`, {
      method: 'DELETE',
      headers: bearerHeaders(),
    });
  },

  attendEvent: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/events/${eventId}/attend`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  confirmAssistance: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/events/${eventId}/confirm-assistance`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  leaveEvent: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/events/${eventId}/leave`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  inviteToEvent: async (eventId: string, targetUserId?: string) => {
    const baseUrl = getApiBaseUrl();
    const body = targetUserId ? JSON.stringify({ userId: targetUserId }) : undefined;
    const headers = targetUserId ? authHeaders() : bearerHeaders();
    const response = await fetch(`${baseUrl}/events/${eventId}/invite`, {
      method: 'POST',
      headers,
      body,
    });

    if (response.status === 404 || response.status === 405) {
      // Fallback: copy link to clipboard
      const inviteUrl = `${window.location.origin}/events/${eventId}`;
      try {
        await navigator.clipboard.writeText(inviteUrl);
      } catch {
        window.prompt('Copia este enlace:', inviteUrl);
      }
      return { message: 'Enlace copiado al portapapeles.', url: inviteUrl };
    }

    const data = await jsonOrText(response);
    if (!response.ok) throw new Error(extractError(data, 'No se pudo enviar la invitación.'));
    return data;
  },

  // ── Groups ───────────────────────────────────────────────────────────────────

  getGroups: async () => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/groups`, { headers: bearerHeaders() });
  },

  getGroupById: async (id: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/groups/${id}`, { headers: bearerHeaders() });
  },

  createGroup: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/groups`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  updateGroup: async (id: string, payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/groups/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  deleteGroup: async (id: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/groups/${id}`, {
      method: 'DELETE',
      headers: bearerHeaders(),
    });
  },

  joinGroup: async (id: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/groups/${id}/join`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  leaveGroup: async (id: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/groups/${id}/leave`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  // ── Friends ──────────────────────────────────────────────────────────────────

  getFriends: async (userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/friends${q}`, { headers: bearerHeaders() });
  },

  getFriendRequests: async (userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/friends/requests${q}`, { headers: bearerHeaders() });
  },

  sendFriendRequest: async (payload: { userId?: string; friendEmail: string }) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/friends/request`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  acceptFriendRequest: async (id: string, userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/friends/${id}/accept${q}`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  rejectFriendRequest: async (id: string, userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/friends/${id}/reject${q}`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  removeFriend: async (id: string, userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/friends/${id}${q}`, {
      method: 'DELETE',
      headers: bearerHeaders(),
    });
  },

  // ── Invitations ──────────────────────────────────────────────────────────────

  getInvitations: async (userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/invitations${q}`, { headers: bearerHeaders() });
  },

  acceptInvitation: async (id: string, userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/invitations/${id}/accept${q}`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  rejectInvitation: async (id: string, userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/invitations/${id}/reject${q}`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  // ── Notifications ────────────────────────────────────────────────────────────

  getNotifications: async (userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/notifications${q}`, { headers: bearerHeaders() });
  },

  markNotificationRead: async (id: string, userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const q = userId ? `?userId=${userId}` : '';
    return apiFetch(`${baseUrl}/notifications/${id}/read${q}`, {
      method: 'POST',
      headers: bearerHeaders(),
    });
  },

  // ── Recommendations ──────────────────────────────────────────────────────────

  getRecommendations: async (limit = 12) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/recommendations?limit=${limit}`, { headers: bearerHeaders() });
  },

  // ── Search ───────────────────────────────────────────────────────────────────

  search: async (q: string, types?: string, limit = 12) => {
    const baseUrl = getApiBaseUrl();
    const params = new URLSearchParams({ q, limit: String(limit) });
    if (types) params.append('types', types);
    return apiFetch(`${baseUrl}/search?${params}`, { headers: bearerHeaders() });
  },

  // ── Reviews ──────────────────────────────────────────────────────────────────

  getReviews: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/reviews?eventId=${eventId}`, { headers: bearerHeaders() });
  },

  createReview: async (payload: { eventId: string; rating: number; comment?: string }) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/reviews`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  // ── Reports ──────────────────────────────────────────────────────────────────

  createReport: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/reports`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  },

  // ── Maps ─────────────────────────────────────────────────────────────────────

  getEventDirections: async (eventId: string, lat: number, lng: number) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(
      `${baseUrl}/maps/event-directions/${eventId}?lat=${lat}&lng=${lng}`,
      { headers: bearerHeaders() },
    );
  },

  getNearbyEvents: async (lat: number, lng: number, radius = 10, limit = 12) => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(
      `${baseUrl}/maps/nearby-events?lat=${lat}&lng=${lng}&radius=${radius}&limit=${limit}`,
      { headers: bearerHeaders() },
    );
  },

  // ── Institutions ─────────────────────────────────────────────────────────────

  getInstitutions: async () => {
    const baseUrl = getApiBaseUrl();
    return apiFetch(`${baseUrl}/institutions`, { headers: bearerHeaders() });
  },
};

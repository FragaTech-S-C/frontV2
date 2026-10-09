type AuthPayload = {
  accessToken?: string;
  refreshToken?: string;
  user?: Record<string, unknown>;
  [key: string]: unknown;
};

export function getApiBaseUrl() {
  const runtimeApiBaseUrl =
    (typeof import.meta !== 'undefined' && import.meta.env)
      ? (import.meta.env.PUBLIC_API_URL ?? import.meta.env.BACKEND_URL)
      : (typeof process !== 'undefined' ? (process.env.PUBLIC_API_URL ?? process.env.BACKEND_URL) : undefined);

  if (!runtimeApiBaseUrl) {
    throw new Error('Missing PUBLIC_API_URL or BACKEND_URL environment variable.');
  }

  return String(runtimeApiBaseUrl).replace(/\/+$/, '');
}

export function getStoredAuth() {
  if (typeof window === 'undefined') return null;

  const rawAuth = localStorage.getItem('meetia-auth');
  if (!rawAuth) return null;

  try {
    return JSON.parse(rawAuth) as AuthPayload;
  } catch {
    return null;
  }
}

export function setStoredAuth(auth: AuthPayload | null) {
  if (typeof window === 'undefined') return;

  if (!auth) {
    clearStoredAuth();
    return;
  }

  localStorage.setItem('meetia-auth', JSON.stringify(auth));

  if (auth.accessToken) {
    localStorage.setItem('meetia-access-token', auth.accessToken);
  }

  if (auth.refreshToken) {
    localStorage.setItem('meetia-refresh-token', auth.refreshToken);
  }
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('meetia-auth');
  localStorage.removeItem('meetia-access-token');
  localStorage.removeItem('meetia-refresh-token');
}

export function getAccessToken() {
  if (typeof window === 'undefined') return null;

  return getStoredAuth()?.accessToken ?? localStorage.getItem('meetia-access-token');
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = new Headers(options.headers ?? {});

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAccessToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload?.message || payload?.error || 'Request failed';
    throw new Error(message);
  }

  return payload;
}

export const api = {
  login: async (credentials: { email: string; password: string; twoFactorCode?: string }) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: async (payload: Record<string, unknown>) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  authMe: async () => apiFetch('/auth/me'),

  me: async () => apiFetch('/users/me'),

  updateProfile: async (payload: Record<string, unknown>) =>
    apiFetch('/users/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  refresh: async (refreshToken: string) =>
    apiFetch('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),

  logout: async () =>
    apiFetch('/auth/logout', {
      method: 'POST',
    }),

  getEvents: async (params: Record<string, string | number | undefined> = {}) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        search.append(key, String(value));
      }
    });

    const query = search.toString();
    return apiFetch(`/events${query ? `?${query}` : ''}`);
  },

  createEvent: async (payload: Record<string, unknown>) =>
    apiFetch('/events', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

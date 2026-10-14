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

  const accessToken = auth.accessToken ?? auth.access_token ?? auth.token ?? auth.jwt;
  const refreshToken = auth.refreshToken ?? auth.refresh_token ?? auth.refresh;

  if (accessToken) {
    localStorage.setItem('meetia-access-token', String(accessToken));
  }

  if (refreshToken) {
    localStorage.setItem('meetia-refresh-token', String(refreshToken));
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

  const storedAuth = getStoredAuth();
  const tokenFromStorage = storedAuth
    ? (storedAuth.accessToken ?? storedAuth.access_token ?? storedAuth.token ?? storedAuth.jwt ?? null)
    : null;

  return tokenFromStorage ?? localStorage.getItem('meetia-access-token') ?? localStorage.getItem('accessToken') ?? localStorage.getItem('access_token') ?? null;
}

export function getRefreshToken() {
  if (typeof window === 'undefined') return null;

  const storedAuth = getStoredAuth();
  const tokenFromStorage = storedAuth
    ? (storedAuth.refreshToken ?? storedAuth.refresh_token ?? storedAuth.refresh ?? null)
    : null;

  return tokenFromStorage ?? localStorage.getItem('meetia-refresh-token') ?? localStorage.getItem('refreshToken') ?? localStorage.getItem('refresh_token') ?? null;
}

async function jsonOrText(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? response.json() : response.text();
}

export const api = {
  login: async (credentials: { email: string; password: string; twoFactorCode?: string }) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const payload = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof payload === 'string' ? payload : payload?.message || payload?.error || 'No se pudo iniciar sesión.');
    }
    setStoredAuth(payload);
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
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo registrar al usuario.');
    }

    setStoredAuth(data);
    return data;
  },

  authMe: async () => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/auth/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo cargar tu sesión.');
    }
    return data;
  },

  me: async () => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/users/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo cargar el usuario.');
    }
    return data;
  },

  updateProfile: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo actualizar el perfil.');
    }
    return data;
  },

  refresh: async (refreshToken: string) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo refrescar la sesión.');
    }
    setStoredAuth(data);
    return data;
  },

  logout: async () => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo cerrar sesión.');
    }
    clearStoredAuth();
    return data;
  },

  attendEvent: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/events/${eventId}/attend`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo confirmar tu asistencia.');
    }
    return data;
  },

  confirmAssistance: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/events/${eventId}/confirm-assistance`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo confirmar la asistencia.');
    }
    return data;
  },

  leaveEvent: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/events/${eventId}/leave`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo abandonar el evento.');
    }
    return data;
  },

  inviteToEvent: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const inviteUrl = `${window.location.origin}/events/${eventId}`;

    try {
      const response = await fetch(`${baseUrl}/events/${eventId}/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (response.status === 404 || response.status === 405) {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(inviteUrl);
        } else {
          window.prompt('Copia este enlace del evento:', inviteUrl);
        }

        return { message: 'Enlace del evento copiado al portapapeles.', url: inviteUrl };
      }

      const data = await jsonOrText(response);
      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo enviar la invitación.');
      }

      return data;
    } catch (error) {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(inviteUrl);
        return { message: 'Enlace del evento copiado al portapapeles.', url: inviteUrl };
      }

      window.prompt('Copia este enlace del evento:', inviteUrl);
      return { message: 'Enlace del evento listo para compartir.', url: inviteUrl };
    }
  },

  getEvents: async (params: Record<string, string | number | undefined> = {}) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        search.append(key, String(value));
      }
    });

    const query = search.toString();
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/events${query ? `?${query}` : ''}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudieron cargar los eventos.');
    }
    return data;
  },

  createEvent: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/events/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo crear el evento.');
    }
    return data;
  },
};

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

  loginWithGoogle: async (profile: { email: string; firstName?: string; lastName?: string; nickname?: string; avatar?: string }) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo iniciar sesión con Google.');
    }
    setStoredAuth(data);
    return data;
  },

  requestPasswordReset: async (email: string) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/password/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo solicitar el restablecimiento.');
    }
    return data;
  },

  confirmPasswordReset: async (token: string, newPassword: string) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/password/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo confirmar el restablecimiento.');
    }
    return data;
  },

  resetPasswordByEmail: async (email: string, newPassword: string, token?: string) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/password/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword, token }),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo restablecer la contraseña.');
    }
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

  resetPassword: async (currentPassword: string, newPassword: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo restablecer la contraseña.');
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

  adminLogin: async (credentials: { email: string; password: string }) => {
    const result = await api.login(credentials);
    const role = String(result?.user?.role ?? result?.role ?? '').toUpperCase();
    if (role !== 'ADMIN') {
      clearStoredAuth();
      throw new Error('Esta cuenta no tiene permisos de administrador.');
    }
    return result;
  },

  getNotifications: async (userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const query = new URLSearchParams();
    if (userId) query.set('userId', userId);
    const response = await fetch(`${baseUrl}/notifications${query.toString() ? `?${query.toString()}` : ''}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudieron cargar las notificaciones.');
    }
    return data;
  },

  markNotificationRead: async (id: string, userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const search = new URLSearchParams();
    if (userId) search.set('userId', userId);
    const response = await fetch(`${baseUrl}/notifications/${id}/read${search.toString() ? `?${search.toString()}` : ''}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo marcar la notificación como leída.');
    }
    return data;
  },

  getFriends: async (userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const resolvedUserId = String(userId ?? getStoredAuth()?.user?.id ?? 'local-user');
    const response = await fetch(`${baseUrl}/friends?userId=${encodeURIComponent(resolvedUserId)}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudieron cargar tus amigos.');
    }
    return data;
  },

  getInstitutions: async () => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/institutions`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudieron cargar las instituciones.');
    }
    return data;
  },

  createInstitution: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/institutions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo crear la institución.');
    }
    return data;
  },

  getGroups: async () => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/groups`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudieron cargar tus grupos.');
    }
    return data;
  },

  createGroup: async (payload: Record<string, unknown>) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo crear el grupo.');
    }
    return data;
  },

  getPendingFriendRequests: async (userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const resolvedUserId = String(userId ?? getStoredAuth()?.user?.id ?? 'local-user');
    const response = await fetch(`${baseUrl}/friends/requests?userId=${encodeURIComponent(resolvedUserId)}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudieron cargar las solicitudes de amistad.');
    }
    return data;
  },

  respondToFriendRequest: async (id: string, status: 'accepted' | 'rejected', userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const resolvedUserId = String(userId ?? getStoredAuth()?.user?.id ?? 'local-user');
    const endpoint = status === 'accepted' ? `${id}/accept` : `${id}/reject`;
    const response = await fetch(`${baseUrl}/friends/${endpoint}?userId=${encodeURIComponent(resolvedUserId)}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo responder la solicitud de amistad.');
    }
    return data;
  },

  searchUsersByEmail: async (email: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/users/search?email=${encodeURIComponent(email.trim())}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo buscar usuarios.');
    }
    return data;
  },

  addFriend: async (userId: string, friendEmail: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/friends/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ userId, friendEmail }),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo enviar la solicitud.');
    }
    return data;
  },

  removeFriend: async (friendshipId: string, userId: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/friends/${encodeURIComponent(friendshipId)}?userId=${encodeURIComponent(userId)}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo eliminar la amistad.');
    }
    return data;
  },

  addMemberToGroup: async (groupId: string, userId: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/groups/${encodeURIComponent(groupId)}/members/${encodeURIComponent(userId)}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo agregar a la persona al grupo.');
    }
    return data;
  },

  getInvitations: async (userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const resolvedUserId = String(userId ?? getStoredAuth()?.user?.id ?? 'local-user');
    const response = await fetch(`${baseUrl}/invitations?userId=${encodeURIComponent(resolvedUserId)}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudieron cargar las invitaciones.');
    }
    return data;
  },

  respondToInvitation: async (id: string, status: 'accepted' | 'rejected', userId?: string) => {
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const resolvedUserId = String(userId ?? getStoredAuth()?.user?.id ?? 'local-user');
    const response = await fetch(`${baseUrl}/invitations/${id}/${status}?userId=${encodeURIComponent(resolvedUserId)}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo responder la invitación.');
    }
    return data;
  },

  createReview: async (payload: { eventId: string; userId: string; rating: number; comment: string }) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo guardar la reseña.');
    }
    return data;
  },

  getReviews: async (eventId: string) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/reviews?eventId=${encodeURIComponent(eventId)}`);
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudieron cargar las reseñas.');
    }
    return data;
  },

  createReport: async (payload: { reporterId: string; targetType: 'event' | 'group' | 'user' | 'comment'; targetId: string; subject: string; message: string }) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo enviar el reporte.');
    }
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

  inviteToEvent: async (eventId: string, userId?: string, groupId?: string) => {
    if (!userId && !groupId) {
      throw new Error('Seleccioná una persona o un grupo para invitar al evento.');
    }

    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/events/${eventId}/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ userId, groupId }),
    });

    const data = await jsonOrText(response);
    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo enviar la invitación.');
    }

    return data;
  },
  getEventsById: async (eventId: string | undefined) => {
    if (!eventId) {
      throw new Error('No se recibió el identificador del evento.');
    }
    const baseUrl = getApiBaseUrl();
    const token = getAccessToken();
    console.log(`${baseUrl}/events/${encodeURIComponent(eventId)}`,  {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const response = await fetch(`${baseUrl}/events/${encodeURIComponent(eventId)}`, {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await jsonOrText(response);

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data?.message || data?.error || 'No se pudo cargar el evento.');
    }

    return data;
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

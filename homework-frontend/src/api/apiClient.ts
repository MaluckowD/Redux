import { logout } from '../features/auth';
import { store } from '../app/store';
import { Logger } from '../utils/logger';

export async function apiFetch(url: string, options: RequestInit = {}) {
  Logger.logRequest(url, options);
  const state = store.getState();
  const token = state.auth.user?.token;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...(options.headers || {}),
    },
  });

  if (response.status === 401 || response.status === 403) {
    Logger.logError(url, response);
    store.dispatch(logout());
    throw { status: response.status };
  }

  if (!response.ok) {
    throw { status: response.status };
  }

  const data = await response.json();
  Logger.logResponse(url, data);

  return data;
}
